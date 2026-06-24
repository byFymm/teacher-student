from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/overview", tags=["overview"])


class Metric(BaseModel):
    label: str
    value: str
    hint: str


class WorkflowRun(BaseModel):
    name: str
    target: str
    status: str
    progress: int


class CourseOperation(BaseModel):
    course: str
    class_name: str
    students: int
    completion: int
    alert: str


class PlatformOverview(BaseModel):
    metrics: list[Metric]
    workflow_runs: list[WorkflowRun]
    course_operations: list[CourseOperation]


@router.get("", response_model=PlatformOverview)
def get_platform_overview() -> PlatformOverview:
    return PlatformOverview(
        metrics=[
            Metric(label="活跃课程", value="12", hint="覆盖 8 个班级"),
            Metric(label="资料解析", value="28", hint="5 个等待确认"),
            Metric(label="待批改主观题", value="143", hint="Bisheng 辅助中"),
            Metric(label="学情预警", value="16", hint="较昨日 -3"),
        ],
        workflow_runs=[
            WorkflowRun(
                name="资料解析入库",
                target="函数专题讲义.pdf",
                status="运行中",
                progress=68,
            ),
            WorkflowRun(
                name="练习自动组卷",
                target="英语阅读 Week 7",
                status="待审核",
                progress=100,
            ),
            WorkflowRun(
                name="主观题批改讲解",
                target="物理综合测验",
                status="排队中",
                progress=24,
            ),
        ],
        course_operations=[
            CourseOperation(
                course="高一数学函数专题",
                class_name="高一 3 班",
                students=46,
                completion=82,
                alert="7 人指数函数掌握度低",
            ),
            CourseOperation(
                course="英语阅读理解强化",
                class_name="高二 1 班",
                students=39,
                completion=74,
                alert="主旨题错因集中",
            ),
            CourseOperation(
                course="物理力学综合训练",
                class_name="高一 6 班",
                students=42,
                completion=67,
                alert="受力分析需补课",
            ),
        ],
    )
