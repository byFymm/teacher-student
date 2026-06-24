# 教育智能体平台实施计划

日期：2026-06-24

关联设计规格：`docs/superpowers/specs/2026-06-24-education-agent-platform-design.md`

## 1. 技术选型

第一期采用以下默认技术路线：

- 后端：Python 3.12、FastAPI、Pydantic v2、SQLAlchemy 2、Alembic。
- 前端：React、TypeScript、Vite、React Router、TanStack Query。
- 数据库：PostgreSQL。
- 异步任务：Redis + Celery。
- 文件存储：开发环境使用本地 MinIO，接口按对象存储抽象。
- 工作流：毕昇作为核心编排引擎；开发初期提供 FakeBishengAdapter 先跑通业务闭环。
- 部署：Docker Compose 起步，后续可迁移到云服务器或内网服务器。

选择 React 的原因是第一期需要多个工作台、复杂表单、任务状态刷新和学习交互，React + TypeScript 的组件生态更方便快速搭建。如果后续明确要 Vue，可以在前端初始化前切换，后端计划不受影响。

## 2. 仓库结构

建议使用单仓库结构：

```text
TEACHER/
  backend/
    app/
      api/
      core/
      db/
      models/
      schemas/
      services/
      workers/
      integrations/
        bisheng/
    tests/
    alembic/
  frontend/
    src/
      app/
      pages/
      features/
      components/
      services/
      routes/
  infra/
    docker-compose.yml
    postgres/
    minio/
    redis/
  docs/
```

后端按业务模块拆分，前端按功能域拆分。毕昇集成集中放在 `backend/app/integrations/bisheng`，业务服务只依赖适配层接口。

## 3. 里程碑 0：项目底座

目标：建立可运行、可测试、可迁移的工程骨架。

任务：

1. 创建 `backend` FastAPI 项目。
2. 配置 `pyproject.toml` 或 `requirements.txt`。
3. 创建 `frontend` React + Vite 项目。
4. 创建 `infra/docker-compose.yml`，包含 PostgreSQL、Redis、MinIO。
5. 配置 `.env.example`。
6. 建立 Alembic 迁移目录。
7. 建立基本 CI 脚本或本地检查脚本。

验收：

- 后端 `/health` 返回正常。
- 前端能启动并访问登录页面骨架。
- Docker Compose 能启动数据库、Redis、MinIO。
- 后端测试命令能运行。

## 4. 里程碑 1：认证、多租户和权限

目标：先把多租户安全边界打牢。

后端任务：

1. 设计并迁移 `tenants`、`schools`、`users`、`roles`、`user_roles`。
2. 实现登录、JWT、密码哈希、当前用户上下文。
3. 实现租户上下文注入和查询过滤基础工具。
4. 实现角色权限枚举：学生、老师、机构管理员、系统管理员。
5. 提供用户管理和角色分配 API。

前端任务：

1. 登录页。
2. 角色识别和路由守卫。
3. 三个工作台的基础布局。

测试：

- 用户只能访问所属租户数据。
- 学生不能访问老师接口。
- 机构管理员不能访问其他机构配置。

## 5. 里程碑 2：课程、班级、资料和题库

目标：老师端能准备课程内容。

后端任务：

1. 迁移 `classes`、`courses`、`enrollments`。
2. 实现课程和班级 CRUD。
3. 迁移 `teaching_resources`、`resource_parse_jobs`。
4. 实现文档上传接口，第一期限制 PDF、Word、PPT、TXT。
5. 迁移 `question_banks`、`questions`、`question_options`。
6. 实现 Excel、CSV、JSON 题库导入。
7. 建立导入模板和校验错误返回格式。

前端任务：

1. 教师课程列表和课程详情。
2. 班级成员管理。
3. 资料上传页面和解析状态列表。
4. 题库导入页面和题目列表。

测试：

- 上传文件必须归属租户和课程。
- 题库导入错误能定位到行号和字段。
- 学生无法读取题库答案。

## 6. 里程碑 3：毕昇部署与适配层

目标：业务层通过稳定接口调用毕昇，先用假适配器跑通，再接真实毕昇。

任务：

1. 部署毕昇开发实例。
2. 验证毕昇模型配置、知识库能力、工作流调用方式和回调方式。
3. 定义 `BishengAdapter` 接口：
   - `start_workflow`
   - `get_run_status`
   - `stream_chat`
   - `handle_callback`
4. 实现 `FakeBishengAdapter`。
5. 实现 `HttpBishengAdapter`。
6. 迁移 `agent_templates`、`bisheng_workflow_bindings`、`workflow_runs`、`callback_events`。
7. 实现工作流运行日志和重试机制。

测试：

- Fake adapter 能模拟成功、失败、超时和重复回调。
- 回调处理幂等。
- 业务层不直接依赖毕昇 HTTP 细节。

## 7. 里程碑 4：资料入库与课程问答

目标：跑通第一条学生学习闭环。

后端任务：

1. 上传资料后创建解析任务。
2. 异步调用资料入库工作流。
3. 保存知识库引用和解析状态。
4. 实现课程问答 API。
5. 保存 `conversations` 和 `messages`。
6. 支持流式回答或准实时轮询。

前端任务：

1. 学生课程列表。
2. 课程问答页面。
3. 问答引用、加载、失败和重试状态。
4. 教师查看资料解析进度。

测试：

- 未完成解析的资料不进入课程问答范围。
- 学生只能对授权课程提问。
- 毕昇问答失败时前端可重试。

## 8. 里程碑 5：练习、考试、批改和错题

目标：跑通刷题和考试训练闭环。

后端任务：

1. 迁移 `exam_papers`、`exam_sessions`、`answer_records`、`mistakes`。
2. 实现老师创建练习/考试任务。
3. 实现出题组卷工作流调用。
4. 实现学生作答和提交。
5. 客观题本地判分。
6. 主观题调用毕昇批改讲解。
7. 自动生成错题记录。

前端任务：

1. 教师生成试卷和发布任务。
2. 学生练习/考试页面。
3. 提交后展示得分、解析和错题。
4. 错题本页面。

测试：

- 客观题判分稳定。
- 学生不能提前看到答案。
- 重复提交规则明确并可测试。

## 9. 里程碑 6：学情报告与管理端配置

目标：形成老师可用的反馈闭环。

后端任务：

1. 迁移 `knowledge_point_mastery`、`student_reports`、`class_analytics`。
2. 汇总学生答题、错题、问答和练习数据。
3. 调用毕昇生成报告摘要。
4. 实现班级学情 API。
5. 实现模型供应商配置和工作流绑定管理。

前端任务：

1. 教师班级学情看板。
2. 学生学习报告。
3. 管理端模型配置。
4. 管理端毕昇工作流绑定。

测试：

- 报告只统计本租户、本课程、本班级数据。
- 老师能查看自己课程范围内的学生数据。
- 管理员配置变更不会影响其他租户。

## 10. 里程碑 7：联调、验收和部署文档

目标：让第一期具备可演示、可部署、可回归的质量。

任务：

1. 完成真实毕昇联调。
2. 补齐后端集成测试。
3. 补齐前端 E2E 测试。
4. 编写部署文档。
5. 编写初始化机构、管理员和示例课程数据脚本。
6. 完成一条端到端演示链路。

验收演示：

1. 管理员创建机构和账号。
2. 老师创建课程、上传资料、导入题库。
3. 学生问答、练习、考试。
4. 系统生成错题和讲解。
5. 老师查看学情报告。
6. 毕昇工作流失败后可见状态并可重试。

## 11. 首批开发任务建议

真正开始写代码时，建议先做这些任务：

1. 初始化仓库结构和基础工具链。
2. 搭建 FastAPI `/health`。
3. 搭建 React 三角色布局壳。
4. 配置 Docker Compose 的 PostgreSQL、Redis、MinIO。
5. 创建 Alembic 第一批迁移：租户、用户、角色。
6. 实现登录和租户上下文。
7. 写多租户权限测试。

这批任务完成后，平台会有一个干净的工程底座，后续课程、题库和毕昇集成可以稳定往上叠。