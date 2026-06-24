from fastapi.testclient import TestClient

from app.main import create_app


def test_overview_endpoint() -> None:
    client = TestClient(create_app())

    response = client.get("/api/v1/overview")

    assert response.status_code == 200
    payload = response.json()
    assert payload["metrics"][0]["label"] == "活跃课程"
    assert payload["workflow_runs"][0]["progress"] == 68
    assert payload["course_operations"][0]["class_name"] == "高一 3 班"
