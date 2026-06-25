from __future__ import annotations

from uuid import uuid4

from app.schemas.platform import (
    AdminWorkspace,
    AuditEvent,
    ChatMessage,
    ChatResponse,
    CourseOperation,
    ExerciseCreateResponse,
    InsightCard,
    MasteryPoint,
    Metric,
    ProviderStatus,
    ResourceCreateResponse,
    ResourceJob,
    StudentCourse,
    StudentTask,
    StudentWorkspace,
    SystemModule,
    TeacherWorkspace,
    WorkflowRunItem,
)


def _id(prefix: str) -> str:
    return f"{prefix}-{uuid4().hex[:10]}"


class PlatformStore:
    """In-memory demo store for the first product loop."""

    def __init__(self) -> None:
        self._course_operations = [
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
        ]
        self._workflow_runs = [
            WorkflowRunItem(
                id="run-resource-seed",
                name="资料解析入库",
                target="函数专题讲义.pdf",
                status="运行中",
                progress=68,
                updated_at="12 分钟前",
            ),
            WorkflowRunItem(
                id="run-exercise-seed",
                name="练习自动组卷",
                target="英语阅读 Week 7",
                status="待审核",
                progress=100,
                updated_at="35 分钟前",
            ),
            WorkflowRunItem(
                id="run-grading-seed",
                name="主观题批改讲解",
                target="物理综合测验",
                status="排队中",
                progress=24,
                updated_at="1 小时前",
            ),
        ]
        self._resources = [
            ResourceJob(
                id="res-function-pdf",
                name="函数专题讲义.pdf",
                resource_type="PDF",
                state="切片与向量化",
                time="12 分钟前",
            ),
            ResourceJob(
                id="res-english-csv",
                name="英语阅读题库.csv",
                resource_type="CSV",
                state="结构校验完成",
                time="35 分钟前",
            ),
            ResourceJob(
                id="res-physics-docx",
                name="力学错题汇总.docx",
                resource_type="DOCX",
                state="等待知识点映射",
                time="1 小时前",
            ),
        ]
        self._insights = [
            InsightCard(label="薄弱知识点", value="受力分析", note="高一 6 班错题率 48%"),
            InsightCard(label="推荐动作", value="生成 20 题分层练习", note="覆盖基础、提升、压轴"),
            InsightCard(label="报告状态", value="3 份可发布", note="含班级与个人报告"),
        ]
        self._student_courses = [
            StudentCourse(
                id="course-math-function",
                name="高一数学函数专题",
                teacher="林老师",
                progress=72,
                next_action="完成指数函数章节练习",
                mastery="稳定提升",
            ),
            StudentCourse(
                id="course-english-reading",
                name="英语阅读理解强化",
                teacher="周老师",
                progress=58,
                next_action="进入 AI 精读问答",
                mastery="词义推断偏弱",
            ),
            StudentCourse(
                id="course-physics-force",
                name="物理力学错题复盘",
                teacher="陈老师",
                progress=41,
                next_action="复习受力分析错题",
                mastery="需要巩固",
            ),
        ]
        self._student_tasks = [
            StudentTask(
                id="task-function-monotonicity",
                title="函数单调性 15 题",
                task_type="章节练习",
                due="今天 20:00",
                status="进行中",
            ),
            StudentTask(
                id="task-reading-week-7",
                title="英语阅读 Week 7",
                task_type="AI 问答",
                due="明天 09:30",
                status="未开始",
            ),
            StudentTask(
                id="task-force-review",
                title="力学错题 6 道",
                task_type="错题本",
                due="周五前",
                status="待复习",
            ),
        ]
        self._mastery_points = [
            MasteryPoint(label="函数图像", value=84),
            MasteryPoint(label="阅读主旨", value=76),
            MasteryPoint(label="受力分析", value=52),
            MasteryPoint(label="实验推理", value=68),
            MasteryPoint(label="几何证明", value=61),
        ]
        self._chat_messages = [
            ChatMessage(
                id="msg-user-seed",
                role="user",
                content="指数函数和幂函数怎么区分？",
                time="刚刚",
            ),
            ChatMessage(
                id="msg-assistant-seed",
                role="assistant",
                content=(
                    "先看自变量的位置：指数函数的变量在指数上，幂函数的变量在底数上。"
                    "再结合图像增长速度判断，会更稳。"
                ),
                time="刚刚",
            ),
        ]
        self._providers = [
            ProviderStatus(
                id="provider-bisheng",
                name="Bisheng Workflow",
                provider_type="工作流编排",
                status="在线",
                latency="218 ms",
                usage=78,
                enabled=True,
            ),
            ProviderStatus(
                id="provider-llm-gateway",
                name="国产大模型网关",
                provider_type="模型服务",
                status="在线",
                latency="342 ms",
                usage=64,
                enabled=True,
            ),
            ProviderStatus(
                id="provider-minio",
                name="对象存储 MinIO",
                provider_type="文件存储",
                status="本地",
                latency="32 ms",
                usage=41,
                enabled=True,
            ),
        ]
        self._system_modules = [
            SystemModule(name="租户与学校", owner="平台管理员", state="已接入骨架"),
            SystemModule(name="用户与角色", owner="机构管理员", state="待接入鉴权"),
            SystemModule(name="模型供应商", owner="技术管理员", state="配置设计完成"),
            SystemModule(name="Bisheng 绑定", owner="工作流管理员", state="适配器已占位"),
        ]
        self._audit_trail = [
            AuditEvent(actor="系统", action="完成健康检查", time="刚刚"),
            AuditEvent(actor="林老师", action="创建函数专题练习", time="14 分钟前"),
            AuditEvent(actor="管理员", action="更新 Bisheng 工作流映射", time="48 分钟前"),
            AuditEvent(actor="周老师", action="导入英语阅读题库", time="1 小时前"),
        ]

    def teacher_workspace(self) -> TeacherWorkspace:
        return TeacherWorkspace(
            stats=self._teacher_stats(),
            course_operations=self._copy_list(self._course_operations),
            workflow_runs=self._copy_list(self._workflow_runs),
            resources=self._copy_list(self._resources),
            insights=self._copy_list(self._insights),
        )

    def create_resource(self, name: str, resource_type: str) -> ResourceCreateResponse:
        resource = ResourceJob(
            id=_id("res"),
            name=name,
            resource_type=resource_type.upper(),
            state="已触发解析",
            time="刚刚",
        )
        workflow_run = WorkflowRunItem(
            id=_id("run"),
            name="资料解析入库",
            target=name,
            status="运行中",
            progress=16,
            updated_at="刚刚",
        )
        self._resources.insert(0, resource)
        self._workflow_runs.insert(0, workflow_run)
        self._audit_trail.insert(
            0, AuditEvent(actor="林老师", action=f"上传资料 {name}", time="刚刚")
        )
        return ResourceCreateResponse(resource=resource, workflow_run=workflow_run)

    def create_exercise(
        self,
        knowledge_points: str,
        difficulty: str,
        count: int,
    ) -> ExerciseCreateResponse:
        difficulty_label = {
            "basic": "基础巩固",
            "balanced": "均衡训练",
            "advanced": "提升冲刺",
        }.get(difficulty, difficulty)
        title = f"{knowledge_points} {count} 题{difficulty_label}"
        task = StudentTask(
            id=_id("task"),
            title=title,
            task_type="章节练习",
            due="今天 20:00",
            status="未开始",
        )
        workflow_run = WorkflowRunItem(
            id=_id("run"),
            name="练习自动组卷",
            target=title,
            status="待审核",
            progress=100,
            updated_at="刚刚",
        )
        self._student_tasks.insert(0, task)
        self._workflow_runs.insert(0, workflow_run)
        self._audit_trail.insert(
            0, AuditEvent(actor="林老师", action=f"生成练习 {title}", time="刚刚")
        )
        return ExerciseCreateResponse(task_id=task.id, workflow_run=workflow_run, title=title)

    def student_workspace(self) -> StudentWorkspace:
        return StudentWorkspace(
            stats=self._student_stats(),
            courses=self._copy_list(self._student_courses),
            tasks=self._copy_list(self._student_tasks),
            mastery_points=self._copy_list(self._mastery_points),
            chat_messages=self._copy_list(self._chat_messages),
            recommendation="优先复习受力分析与函数图像，先做基础题，再进入 AI 讲解模式。",
        )

    def answer_question(self, question: str) -> ChatResponse:
        user_message = ChatMessage(id=_id("msg"), role="user", content=question, time="刚刚")
        answer = self._build_answer(question)
        assistant_message = ChatMessage(
            id=_id("msg"), role="assistant", content=answer, time="刚刚"
        )
        self._chat_messages.extend([user_message, assistant_message])
        self._audit_trail.insert(
            0, AuditEvent(actor="学生", action="完成一次课程 AI 问答", time="刚刚")
        )
        return ChatResponse(answer=answer, messages=self._copy_list(self._chat_messages))

    def update_task(self, task_id: str, status: str) -> StudentTask | None:
        for index, task in enumerate(self._student_tasks):
            if task.id == task_id:
                updated = task.model_copy(update={"status": status})
                self._student_tasks[index] = updated
                self._audit_trail.insert(
                    0,
                    AuditEvent(
                        actor="学生", action=f"更新任务 {task.title} 为 {status}", time="刚刚"
                    ),
                )
                return updated
        return None

    def admin_workspace(self) -> AdminWorkspace:
        return AdminWorkspace(
            stats=self._admin_stats(),
            providers=self._copy_list(self._providers),
            system_modules=self._copy_list(self._system_modules),
            audit_trail=self._copy_list(self._audit_trail),
        )

    def create_provider(self, name: str, provider_type: str, latency: str) -> ProviderStatus:
        provider = ProviderStatus(
            id=_id("provider"),
            name=name,
            provider_type=provider_type,
            status="在线",
            latency=latency,
            usage=12,
            enabled=True,
        )
        self._providers.insert(0, provider)
        self._audit_trail.insert(
            0, AuditEvent(actor="管理员", action=f"新增供应商 {name}", time="刚刚")
        )
        return provider

    def toggle_provider(self, provider_id: str) -> ProviderStatus | None:
        for index, provider in enumerate(self._providers):
            if provider.id == provider_id:
                enabled = not provider.enabled
                status = "在线" if enabled else "暂停"
                usage = provider.usage if enabled else 0
                updated = provider.model_copy(
                    update={"enabled": enabled, "status": status, "usage": usage},
                )
                self._providers[index] = updated
                action = "启用" if enabled else "暂停"
                self._audit_trail.insert(
                    0,
                    AuditEvent(
                        actor="管理员", action=f"{action}供应商 {provider.name}", time="刚刚"
                    ),
                )
                return updated
        return None

    def _teacher_stats(self) -> list[Metric]:
        pending_resources = sum(
            1 for resource in self._resources if resource.state != "结构校验完成"
        )
        return [
            Metric(label="活跃课程", value="12", hint="覆盖 8 个班级", tone="green"),
            Metric(
                label="资料解析",
                value=str(len(self._resources)),
                hint=f"{pending_resources} 个处理中",
                tone="blue",
            ),
            Metric(label="待批改主观题", value="143", hint="Bisheng 辅助中", tone="amber"),
            Metric(label="学情预警", value="16", hint="较昨日 -3", tone="red"),
        ]

    def _student_stats(self) -> list[Metric]:
        pending_tasks = sum(1 for task in self._student_tasks if task.status != "已完成")
        user_questions = sum(1 for message in self._chat_messages if message.role == "user")
        mistakes = 17 if pending_tasks else 12
        return [
            Metric(label="已加入课程", value=str(len(self._student_courses)), tone="green"),
            Metric(label="待完成任务", value=str(pending_tasks), tone="amber"),
            Metric(label="本周 AI 问答", value=str(32 + user_questions), tone="blue"),
            Metric(label="错题待复习", value=str(mistakes), tone="red"),
        ]

    def _admin_stats(self) -> list[Metric]:
        enabled_providers = sum(1 for provider in self._providers if provider.enabled)
        return [
            Metric(label="机构租户", value="4", hint="1 个试点校区", tone="blue"),
            Metric(label="平台用户", value="2,438", hint="教师 126 / 学生 2,312", tone="blue"),
            Metric(
                label="模型供应商",
                value=str(len(self._providers)),
                hint=f"{enabled_providers} 个启用",
                tone="blue",
            ),
            Metric(label="工作流绑定", value="11", hint="Bisheng 运行稳定", tone="blue"),
        ]

    def _build_answer(self, question: str) -> str:
        if "指数" in question or "幂" in question:
            return (
                "根据课程知识库，先判断变量出现的位置：指数函数的变量在指数上，"
                "幂函数的变量在底数上。做题时再结合定义域、单调性和图像增长速度交叉验证。"
            )
        if "受力" in question or "物理" in question:
            return "先隔离研究对象，再按重力、弹力、摩擦力和外力顺序画图，最后检查是否遗漏接触面。"
        return (
            "我已经把问题放入课程知识库模拟工作流。"
            "建议先定位关键词，再让老师端生成一组同知识点练习。"
        )

    @staticmethod
    def _copy_list[T](items: list[T]) -> list[T]:
        copied: list[T] = []
        for item in items:
            if hasattr(item, "model_copy"):
                copied.append(item.model_copy(deep=True))
            else:
                copied.append(item)
        return copied
