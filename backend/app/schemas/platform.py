from pydantic import BaseModel, Field


class Metric(BaseModel):
    label: str
    value: str
    hint: str = ""
    tone: str = "blue"


class WorkflowRunItem(BaseModel):
    id: str
    name: str
    target: str
    status: str
    progress: int
    updated_at: str


class CourseOperation(BaseModel):
    course: str
    class_name: str
    students: int
    completion: int
    alert: str


class ResourceJob(BaseModel):
    id: str
    name: str
    resource_type: str
    state: str
    time: str


class InsightCard(BaseModel):
    label: str
    value: str
    note: str


class TeacherWorkspace(BaseModel):
    stats: list[Metric]
    course_operations: list[CourseOperation]
    workflow_runs: list[WorkflowRunItem]
    resources: list[ResourceJob]
    insights: list[InsightCard]


class ResourceCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    resource_type: str = Field(default="PDF", min_length=2, max_length=16)


class ResourceCreateResponse(BaseModel):
    resource: ResourceJob
    workflow_run: WorkflowRunItem


class ExerciseCreateRequest(BaseModel):
    knowledge_points: str = Field(min_length=1, max_length=120)
    difficulty: str = Field(default="balanced", min_length=1, max_length=32)
    count: int = Field(default=20, ge=1, le=100)


class ExerciseCreateResponse(BaseModel):
    task_id: str
    workflow_run: WorkflowRunItem
    title: str


class StudentCourse(BaseModel):
    id: str
    name: str
    teacher: str
    progress: int
    next_action: str
    mastery: str


class StudentTask(BaseModel):
    id: str
    title: str
    task_type: str
    due: str
    status: str


class MasteryPoint(BaseModel):
    label: str
    value: int


class ChatMessage(BaseModel):
    id: str
    role: str
    content: str
    time: str


class StudentWorkspace(BaseModel):
    stats: list[Metric]
    courses: list[StudentCourse]
    tasks: list[StudentTask]
    mastery_points: list[MasteryPoint]
    chat_messages: list[ChatMessage]
    recommendation: str


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=500)
    course_id: str | None = None


class ChatResponse(BaseModel):
    answer: str
    messages: list[ChatMessage]


class TaskUpdateRequest(BaseModel):
    status: str = Field(min_length=1, max_length=20)


class ProviderStatus(BaseModel):
    id: str
    name: str
    provider_type: str
    status: str
    latency: str
    usage: int
    enabled: bool


class SystemModule(BaseModel):
    name: str
    owner: str
    state: str


class AuditEvent(BaseModel):
    actor: str
    action: str
    time: str


class AdminWorkspace(BaseModel):
    stats: list[Metric]
    providers: list[ProviderStatus]
    system_modules: list[SystemModule]
    audit_trail: list[AuditEvent]


class ProviderCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    provider_type: str = Field(default="模型服务", min_length=1, max_length=40)
    latency: str = Field(default="260 ms", min_length=1, max_length=20)


class ProviderToggleResponse(BaseModel):
    provider: ProviderStatus
