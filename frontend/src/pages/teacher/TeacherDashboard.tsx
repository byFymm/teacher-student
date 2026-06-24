import { FileUp, LibraryBig, LineChart, WandSparkles } from "lucide-react";

const modules = [
  { title: "课程管理", detail: "课程、班级、学生范围", icon: LibraryBig },
  { title: "资料上传", detail: "文档解析和入库任务", icon: FileUp },
  { title: "练习生成", detail: "题库、组卷、发布", icon: WandSparkles },
  { title: "学情看板", detail: "错题、掌握度、报告", icon: LineChart },
];

export function TeacherDashboard() {
  return (
    <section className="page-stack" aria-labelledby="teacher-title">
      <header className="page-header">
        <div>
          <p className="page-kicker">老师工作台</p>
          <h1 id="teacher-title">教学运营</h1>
        </div>
        <span className="status-pill">Fake Bisheng</span>
      </header>

      <div className="module-grid">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <article key={module.title} className="module-card">
              <Icon aria-hidden="true" size={24} />
              <h2>{module.title}</h2>
              <p>{module.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}