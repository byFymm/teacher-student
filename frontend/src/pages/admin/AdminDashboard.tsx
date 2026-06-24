import { Activity, Database, KeyRound, Workflow } from "lucide-react";

const settings = [
  { title: "租户配置", icon: Database },
  { title: "模型供应商", icon: KeyRound },
  { title: "毕昇绑定", icon: Workflow },
  { title: "运行日志", icon: Activity },
];

export function AdminDashboard() {
  return (
    <section className="page-stack" aria-labelledby="admin-title">
      <header className="page-header">
        <div>
          <p className="page-kicker">管理工作台</p>
          <h1 id="admin-title">平台配置</h1>
        </div>
        <span className="status-pill">SaaS</span>
      </header>

      <section className="work-panel">
        <h2>配置项</h2>
        <div className="settings-list">
          {settings.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.title} className="settings-row" type="button">
                <Icon aria-hidden="true" size={20} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </section>
    </section>
  );
}