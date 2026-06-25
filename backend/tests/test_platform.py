from fastapi.testclient import TestClient

from app.main import create_app


def test_resource_creation_adds_resource_and_workflow() -> None:
    client = TestClient(create_app())

    response = client.post(
        "/api/v1/resources",
        json={"name": "三角函数专题.pdf", "resource_type": "pdf"},
    )

    assert response.status_code == 201
    payload = response.json()
    assert payload["resource"]["name"] == "三角函数专题.pdf"
    assert payload["resource"]["resource_type"] == "PDF"
    assert payload["workflow_run"]["name"] == "资料解析入库"

    workspace = client.get("/api/v1/teacher/workspace").json()
    assert workspace["resources"][0]["name"] == "三角函数专题.pdf"
    assert workspace["workflow_runs"][0]["target"] == "三角函数专题.pdf"


def test_exercise_creation_adds_workflow_and_student_task() -> None:
    client = TestClient(create_app())

    response = client.post(
        "/api/v1/exercises",
        json={"knowledge_points": "指数函数", "difficulty": "balanced", "count": 12},
    )

    assert response.status_code == 201
    payload = response.json()
    assert payload["title"] == "指数函数 12 题均衡训练"
    assert payload["workflow_run"]["status"] == "待审核"

    student_workspace = client.get("/api/v1/student/workspace").json()
    assert student_workspace["tasks"][0]["title"] == "指数函数 12 题均衡训练"


def test_chat_returns_answer_and_accumulates_messages() -> None:
    client = TestClient(create_app())

    response = client.post("/api/v1/chat", json={"question": "指数函数怎么判断？"})

    assert response.status_code == 200
    payload = response.json()
    assert "变量" in payload["answer"]
    assert payload["messages"][-2]["role"] == "user"
    assert payload["messages"][-1]["role"] == "assistant"


def test_student_task_status_can_be_updated() -> None:
    client = TestClient(create_app())
    workspace = client.get("/api/v1/student/workspace").json()
    task_id = workspace["tasks"][0]["id"]

    response = client.patch(f"/api/v1/student/tasks/{task_id}", json={"status": "已完成"})

    assert response.status_code == 200
    assert response.json()["status"] == "已完成"


def test_provider_can_be_created_and_toggled() -> None:
    client = TestClient(create_app())

    create_response = client.post(
        "/api/v1/admin/providers",
        json={"name": "校内模型代理", "provider_type": "模型服务", "latency": "188 ms"},
    )

    assert create_response.status_code == 201
    provider = create_response.json()
    assert provider["enabled"] is True

    toggle_response = client.patch(f"/api/v1/admin/providers/{provider['id']}/toggle")

    assert toggle_response.status_code == 200
    assert toggle_response.json()["provider"]["enabled"] is False
