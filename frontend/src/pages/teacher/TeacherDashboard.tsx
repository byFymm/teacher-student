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

import {
  courseOperations,
  insightCards,
  resourceJobs,
  teacherStats,
  workflowRuns,
} from "../../data/platform";

const statIcons = [LibraryBig, FileUp, WandSparkles, AlertTriangle];

export function TeacherDashboard() {
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
          <button className="command-button" type="button">
            <FileUp aria-hidden="true" size={18} />
            上传资料
          </button>
          <button className="command-button secondary" type="button">
            <Sparkles aria-hidden="true" size={18} />
            生成练习
          </button>
        </div>
      </header>

      <div className="metric-grid four-columns">
        {teacherStats.map((stat, index) => {
          const Icon = statIcons[index];
          return (
            <article key={stat.label} className={`metric-card tone-${stat.tone}`}>
              <span className="metric-icon">
                <Icon aria-hidden="true" size={20} />
              </span>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.hint}</small>
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
            {courseOperations.map((course) => (
              <article key={course.course} className="operation-row" role="row">
                <strong>{course.course}</strong>
                <span>{course.className}</span>
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
            {workflowRuns.map((run) => (
              <article key={run.name} className="workflow-row">
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
          <div className="resource-list">
            {resourceJobs.map((job) => (
              <article key={job.name} className="resource-row">
                <span className="file-type">{job.type}</span>
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
          <div className="generator-box">
            <label>
              <span>知识点</span>
              <input placeholder="函数图像、受力分析、阅读主旨" />
            </label>
            <label>
              <span>难度配比</span>
              <select defaultValue="balanced">
                <option value="basic">基础巩固 70%</option>
                <option value="balanced">均衡训练 50/30/20</option>
                <option value="advanced">提升冲刺 60%</option>
              </select>
            </label>
            <button className="command-button full-width" type="button">
              <Send aria-hidden="true" size={18} />
              生成并进入审核
            </button>
          </div>
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
            {insightCards.map((card) => (
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
            <button type="button">发布函数专题补偿练习</button>
            <button type="button">审核英语阅读 Week 7 试卷</button>
            <button type="button">查看高一 6 班个人报告</button>
          </div>
        </section>
      </div>
    </section>
  );
}
