from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_platform_store
from app.schemas.platform import (
    AdminWorkspace,
    ChatRequest,
    ChatResponse,
    ExerciseCreateRequest,
    ExerciseCreateResponse,
    ProviderCreateRequest,
    ProviderStatus,
    ProviderToggleResponse,
    ResourceCreateRequest,
    ResourceCreateResponse,
    StudentTask,
    StudentWorkspace,
    TaskUpdateRequest,
    TeacherWorkspace,
)
from app.services.platform_store import PlatformStore

router = APIRouter(tags=["platform"])
StoreDep = Annotated[PlatformStore, Depends(get_platform_store)]


@router.get("/teacher/workspace", response_model=TeacherWorkspace)
def get_teacher_workspace(store: StoreDep) -> TeacherWorkspace:
    return store.teacher_workspace()


@router.post(
    "/resources", response_model=ResourceCreateResponse, status_code=status.HTTP_201_CREATED
)
def create_resource(payload: ResourceCreateRequest, store: StoreDep) -> ResourceCreateResponse:
    name = payload.name.strip()
    resource_type = payload.resource_type.strip()
    if not name:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="资料名称不能为空")
    if not resource_type:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="资料类型不能为空")
    return store.create_resource(name=name, resource_type=resource_type)


@router.post(
    "/exercises", response_model=ExerciseCreateResponse, status_code=status.HTTP_201_CREATED
)
def create_exercise(payload: ExerciseCreateRequest, store: StoreDep) -> ExerciseCreateResponse:
    knowledge_points = payload.knowledge_points.strip()
    difficulty = payload.difficulty.strip()
    if not knowledge_points:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="知识点不能为空")
    return store.create_exercise(
        knowledge_points=knowledge_points,
        difficulty=difficulty,
        count=payload.count,
    )


@router.get("/student/workspace", response_model=StudentWorkspace)
def get_student_workspace(store: StoreDep) -> StudentWorkspace:
    return store.student_workspace()


@router.post("/chat", response_model=ChatResponse)
def create_chat_message(payload: ChatRequest, store: StoreDep) -> ChatResponse:
    question = payload.question.strip()
    if not question:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="问题不能为空")
    return store.answer_question(question)


@router.patch("/student/tasks/{task_id}", response_model=StudentTask)
def update_student_task(
    task_id: str,
    payload: TaskUpdateRequest,
    store: StoreDep,
) -> StudentTask:
    task_status = payload.status.strip()
    if not task_status:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="任务状态不能为空")
    task = store.update_task(task_id=task_id, status=task_status)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="任务不存在")
    return task


@router.get("/admin/workspace", response_model=AdminWorkspace)
def get_admin_workspace(store: StoreDep) -> AdminWorkspace:
    return store.admin_workspace()


@router.post("/admin/providers", response_model=ProviderStatus, status_code=status.HTTP_201_CREATED)
def create_provider(payload: ProviderCreateRequest, store: StoreDep) -> ProviderStatus:
    name = payload.name.strip()
    provider_type = payload.provider_type.strip()
    latency = payload.latency.strip()
    if not name:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="供应商名称不能为空")
    if not provider_type:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="供应商类型不能为空")
    if not latency:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="延迟不能为空")
    return store.create_provider(name=name, provider_type=provider_type, latency=latency)


@router.patch("/admin/providers/{provider_id}/toggle", response_model=ProviderToggleResponse)
def toggle_provider(provider_id: str, store: StoreDep) -> ProviderToggleResponse:
    provider = store.toggle_provider(provider_id)
    if provider is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="供应商不存在")
    return ProviderToggleResponse(provider=provider)
