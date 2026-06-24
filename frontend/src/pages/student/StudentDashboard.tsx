import {
  ArrowRight,
  BookMarked,
  BotMessageSquare,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  MessageSquareText,
  Target,
} from "lucide-react";

import { masteryPoints, studentCourses, studentStats, studentTasks } from "../../data/platform";

const statIcons = [BookMarked, ClipboardCheck, MessageSquareText, Flame];

export function StudentDashboard() {
  return (
    <section className="page-stack student-dashboard" aria-labelledby="student-title">
      <header className="page-header hero-header compact-hero">
        <div>
          <h1 id="student-title">学习中心</h1>
          <p>围绕课程资料进行问答、练习、考试训练和错题复盘，学习过程会沉淀为个人学情报告。</p>
        </div>
        <button className="command-button" type="button">
          <BotMessageSquare aria-hidden="true" size={18} />
          打开 AI 学习助手
        </button>
      </header>

      <div className="metric-grid four-columns">
        {studentStats.map((stat, index) => {
          const Icon = statIcons[index];
          return (
            <article key={stat.label} className={`metric-card tone-${stat.tone}`}>
              <span className="metric-icon">
                <Icon aria-hidden="true" size={20} />
              </span>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          );
        })}
      </div>

      <div className="dashboard-grid student-grid">
        <section className="work-panel wide-panel">
          <div className="panel-title-row">
            <div>
              <h2>我的课程</h2>
              <p>按完成度和下一步学习动作排序。</p>
            </div>
            <BookMarked aria-hidden="true" size={20} />
          </div>

          <div className="course-list">
            {studentCourses.map((course) => (
              <article key={course.name} className="course-row">
                <div>
                  <h3>{course.name}</h3>
                  <p>{course.teacher} · {course.mastery}</p>
                </div>
                <div className="progress-block" aria-label={`${course.name} 完成度 ${course.progress}%`}>
                  <span>{course.progress}%</span>
                  <div className="progress-track">
                    <i style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <button className="row-action" type="button" aria-label={`进入 ${course.name}`}>
                  <ArrowRight aria-hidden="true" size={18} />
                </button>
                <small>{course.nextAction}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="work-panel ai-panel">
          <div className="panel-title-row">
            <div>
              <h2>AI 学习助手</h2>
              <p>基于课程知识库回答问题，并给出追问建议。</p>
            </div>
            <Brain aria-hidden="true" size={20} />
          </div>
          <div className="chat-preview">
            <div className="chat-bubble user">指数函数和幂函数怎么区分？</div>
            <div className="chat-bubble assistant">
              先看自变量的位置：指数函数的变量在指数上，幂函数的变量在底数上。你可以用图像增长速度再判断一次。
            </div>
          </div>
          <button className="secondary-command" type="button">继续追问</button>
        </section>

        <section className="work-panel">
          <div className="panel-title-row">
            <div>
              <h2>今日学习任务</h2>
              <p>练习、问答和错题复习统一排期。</p>
            </div>
            <ClipboardCheck aria-hidden="true" size={20} />
          </div>
          <div className="task-list">
            {studentTasks.map((task) => (
              <article key={task.title} className="task-row">
                <span>
                  <strong>{task.title}</strong>
                  <small>{task.type} · {task.due}</small>
                </span>
                <em>{task.status}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="work-panel">
          <div className="panel-title-row">
            <div>
              <h2>知识点掌握度</h2>
              <p>由答题、错题和 AI 问答综合估算。</p>
            </div>
            <Target aria-hidden="true" size={20} />
          </div>
          <div className="mastery-list">
            {masteryPoints.map((point) => (
              <div key={point.label} className="mastery-row">
                <span>{point.label}</span>
                <div className="progress-track">
                  <i style={{ width: `${point.value}%` }} />
                </div>
                <strong>{point.value}%</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="work-panel insight-panel">
          <div className="panel-title-row">
            <div>
              <h2>错题复盘建议</h2>
              <p>系统根据最近 7 天表现生成复习动作。</p>
            </div>
            <CheckCircle2 aria-hidden="true" size={20} />
          </div>
          <div className="recommendation-card">
            <strong>优先复习受力分析与函数图像</strong>
            <p>建议先完成 12 道基础题，再进入 AI 讲解模式，对比自己的解题步骤。</p>
          </div>
        </section>
      </div>
    </section>
  );
}
