import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  BarChart3,
  FileUp,
  Layers3,
  LibraryBig,
  LineChart,
  RefreshCw,
  Send,
  Sparkles,
  WandSparkles,
  Workflow,
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";

import {
  courseOperations,
  insightCards,
  resourceJobs,
  teacherStats,
  workflowRuns,
} from "../../data/platform";
import {
  createExercise,
  createResource,
  getTeacherWorkspace,
  type TeacherWorkspace,
} from "../../services/api/platform";

const statIcons = [LibraryBig, FileUp, WandSparkles, AlertTriangle];

const fallbackTeacherWorkspace: TeacherWorkspace = {
  stats: teacherStats,
  course_operations: courseOperations.map((course) => ({
    course: course.course,
    class_name: course.className,
    students: course.students,
    completion: course.completion,
    alert: course.alert,
  })),
  workflow_runs: workflowRuns.map((run, index) => ({
    id: `fallback-run-${index}`,
    name: run.name,
    target: run.target,
    status: run.status,
    progress: run.progress,
    updated_at: "刚刚",
  })),
  resources: resourceJobs.map((job, index) => ({
    id: `fallback-resource-${index}`,
    name: job.name,
    resource_type: job.type,
    state: job.state,
    time: job.time,
  })),
  insights: insightCards,
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "操作失败，请稍后重试";
}

export function TeacherDashboard() {
  const queryClient = useQueryClient();
  const resourceNameRef = useRef<HTMLInputElement>(null);
  const exerciseInputRef = useRef<HTMLInputElement>(null);
  const [resourceName, setResourceName] = useState("函数专题讲义.pdf");
  const [resourceType, setResourceType] = useState("PDF");
  const [resourceNotice, setResourceNotice] = useState("");
  const [knowledgePoints, setKnowledgePoints] = useState("指数函数");
  const [difficulty, setDifficulty] = useState("balanced");
  const [exerciseCount, setExerciseCount] = useState(20);
  const [exerciseNotice, setExerciseNotice] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["teacher-workspace"],
    queryFn: getTeacherWorkspace,
  });

  const workspace = data ?? fallbackTeacherWorkspace;

  const resourceMutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      setResourceName("");
      setResourceNotice("资料解析工作流已触发");
      void queryClient.invalidateQueries({ queryKey: ["teacher-workspace"] });
    },
    onError: (error) => setResourceNotice(getErrorMessage(error)),
  });

  const exerciseMutation = useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      setExerciseNotice("练习已生成，并同步为学生学习任务");
      void queryClient.invalidateQueries({ queryKey: ["teacher-workspace"] });
      void queryClient.invalidateQueries({ queryKey: ["student-workspace"] });
    },
    onError: (error) => setExerciseNotice(getErrorMessage(error)),
  });

  function handleResourceSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = resourceName.trim();
    if (!name) {
      setResourceNotice("请先填写资料名称");
      resourceNameRef.current?.focus();
      return;
    }
    resourceMutation.mutate({ name, resource_type: resourceType });
  }

  function handleExerciseSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const points = knowledgePoints.trim();
    if (!points) {
      setExerciseNotice("请先填写知识点");
      exerciseInputRef.current?.focus();
      return;
    }
    exerciseMutation.mutate({ knowledge_points: points, difficulty, count: exerciseCount });
  }

  return (
    <section className="page-stack teacher-dashboard" aria-labelledby="teacher-title">
      <header className="page-header hero-header teacher-hero">
        <div>
          <h1 id="teacher-title">教学运营中枢</h1>
          <p>
            从课程资料、题库、智能组卷到学情报告，教师端负责把每一节课变成可追踪、可复盘、可自动化的教学闭环。
          </p>
        </div>
        <div className="hero-actions">
          <button
            className="command-button"
            type="button"
            onClick={() => resourceNameRef.current?.focus()}
          >
            <FileUp aria-hidden="true" size={18} />
            上传资料
          </button>
          <button
            className="command-button secondary"
            type="button"
            onClick={() => exerciseInputRef.current?.focus()}
          >
            <Sparkles aria-hidden="true" size={18} />
            生成练习
          </button>
        </div>
      </header>

      {isError ? <p className="form-status warning">后端暂时不可用，当前展示本地演示数据。</p> : null}
      {isLoading ? <p className="form-status">正在同步教师工作台数据...</p> : null}

      <div className="metric-grid four-columns">
        {workspace.stats.map((stat, index) => {
          const Icon = statIcons[index] ?? LibraryBig;
          return (
            <article key={stat.label} className={`metric-card tone-${stat.tone}`}>
              <span className="metric-icon">
                <Icon aria-hidden="true" size={20} />
              </span>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              {stat.hint ? <small>{stat.hint}</small> : null}
            </article>
          );
        })}
      </div>

      <div className="dashboard-grid teacher-grid">
        <section className="work-panel wide-panel">
          <div className="panel-title-row">
            <div>
              <h2>课程运营</h2>
              <p>班级进度、任务完成度和薄弱点集中在这里处理。</p>
            </div>
            <LineChart aria-hidden="true" size={20} />
          </div>

          <div className="operation-table" role="table" aria-label="课程运营列表">
            <div className="operation-head" role="row">
              <span>课程</span>
              <span>班级</span>
              <span>学生</span>
              <span>完成度</span>
              <span>预警</span>
            </div>
            {workspace.course_operations.map((course) => (
              <article key={`${course.course}-${course.class_name}`} className="operation-row" role="row">
                <strong>{course.course}</strong>
                <span>{course.class_name}</span>
                <span>{course.students}</span>
                <span className="inline-progress">
                  <i style={{ width: `${course.completion}%` }} />
                  {course.completion}%
                </span>
                <em>{course.alert}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="work-panel workflow-panel">
          <div className="panel-title-row">
            <div>
              <h2>Bisheng 工作流</h2>
              <p>统一展示解析、组卷、批改和报告生成状态。</p>
            </div>
            <Workflow aria-hidden="true" size={20} />
          </div>

          <div className="workflow-list">
            {workspace.workflow_runs.map((run) => (
              <article key={run.id} className="workflow-row">
                <div>
                  <strong>{run.name}</strong>
                  <span>{run.target}</span>
                </div>
                <em>{run.status}</em>
                <div className="progress-track">
                  <i style={{ width: `${run.progress}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="work-panel">
          <div className="panel-title-row">
            <div>
              <h2>资料解析</h2>
              <p>教学文件进入知识库前的处理状态。</p>
            </div>
            <Layers3 aria-hidden="true" size={20} />
          </div>
          <form className="panel-form resource-form" onSubmit={handleResourceSubmit}>
            <label>
              <span>资料名称</span>
              <input
                ref={resourceNameRef}
                value={resourceName}
                onChange={(event) => setResourceName(event.target.value)}
                placeholder="函数专题讲义.pdf"
              />
            </label>
            <label>
              <span>类型</span>
              <select value={resourceType} onChange={(event) => setResourceType(event.target.value)}>
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
                <option value="PPTX">PPTX</option>
                <option value="CSV">CSV</option>
              </select>
            </label>
            <button className="command-button full-width" type="submit" disabled={resourceMutation.isPending}>
              <FileUp aria-hidden="true" size={18} />
              {resourceMutation.isPending ? "提交中" : "触发解析工作流"}
            </button>
          </form>
          {resourceNotice ? <p className="form-status success">{resourceNotice}</p> : null}
          <div className="resource-list with-divider">
            {workspace.resources.map((job) => (
              <article key={job.id} className="resource-row">
                <span className="file-type">{job.resource_type}</span>
                <div>
                  <strong>{job.name}</strong>
                  <small>{job.state} · {job.time}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="work-panel generation-panel">
          <div className="panel-title-row">
            <div>
              <h2>练习生成器</h2>
              <p>从题库和知识点快速生成分层训练。</p>
            </div>
            <WandSparkles aria-hidden="true" size={20} />
          </div>
          <form className="generator-box" onSubmit={handleExerciseSubmit}>
            <label>
              <span>知识点</span>
              <input
                ref={exerciseInputRef}
                value={knowledgePoints}
                onChange={(event) => setKnowledgePoints(event.target.value)}
                placeholder="函数图像、受力分析、阅读主旨"
              />
            </label>
            <label>
              <span>难度配比</span>
              <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                <option value="basic">基础巩固 70%</option>
                <option value="balanced">均衡训练 50/30/20</option>
                <option value="advanced">提升冲刺 60%</option>
              </select>
            </label>
            <label>
              <span>题量</span>
              <input
                min={1}
                max={100}
                type="number"
                value={exerciseCount}
                onChange={(event) => setExerciseCount(Number(event.target.value))}
              />
            </label>
            <button className="command-button full-width" type="submit" disabled={exerciseMutation.isPending}>
              <Send aria-hidden="true" size={18} />
              {exerciseMutation.isPending ? "生成中" : "生成并进入审核"}
            </button>
          </form>
          {exerciseNotice ? <p className="form-status success">{exerciseNotice}</p> : null}
        </section>

        <section className="work-panel insight-panel wide-panel">
          <div className="panel-title-row">
            <div>
              <h2>班级学情洞察</h2>
              <p>把答题记录、错题分布和问答过程转成可执行建议。</p>
            </div>
            <BarChart3 aria-hidden="true" size={20} />
          </div>
          <div className="insight-grid">
            {workspace.insights.map((card) => (
              <article key={card.label} className="insight-card">
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <small>{card.note}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="work-panel">
          <div className="panel-title-row">
            <div>
              <h2>下一步动作</h2>
              <p>系统建议优先处理的教学运营事项。</p>
            </div>
            <RefreshCw aria-hidden="true" size={20} />
          </div>
          <div className="action-stack">
            <button type="button" onClick={() => setKnowledgePoints("函数专题补偿练习")}>
              发布函数专题补偿练习
            </button>
            <button type="button" onClick={() => setDifficulty("balanced")}>
              审核英语阅读 Week 7 试卷
            </button>
            <button type="button">查看高一 6 班个人报告</button>
          </div>
        </section>
      </div>
    </section>
  );
}