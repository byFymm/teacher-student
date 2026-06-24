import { BookMarked, ClipboardCheck, MessageSquareText } from "lucide-react";

const cards = [
  { title: "我的课程", value: "3", icon: BookMarked },
  { title: "待完成练习", value: "6", icon: ClipboardCheck },
  { title: "课程问答", value: "12", icon: MessageSquareText },
];

export function StudentDashboard() {
  return (
    <section className="page-stack" aria-labelledby="student-title">
      <header className="page-header">
        <div>
          <p className="page-kicker">学生工作台</p>
          <h1 id="student-title">学习中心</h1>
        </div>
        <span className="status-pill">本地骨架</span>
      </header>

      <div className="metric-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className="metric-card">
              <Icon aria-hidden="true" size={22} />
              <span>{card.title}</span>
              <strong>{card.value}</strong>
            </article>
          );
        })}
      </div>

      <section className="work-panel">
        <h2>今日学习</h2>
        <div className="task-list">
          <div className="task-row">
            <span>数学一轮复习</span>
            <strong>章节练习</strong>
          </div>
          <div className="task-row">
            <span>英语阅读理解</span>
            <strong>AI 问答</strong>
          </div>
          <div className="task-row">
            <span>物理错题复盘</span>
            <strong>错题本</strong>
          </div>
        </div>
      </section>
    </section>
  );
}