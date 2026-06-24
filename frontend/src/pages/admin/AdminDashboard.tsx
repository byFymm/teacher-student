import {
  Activity,
  Building2,
  CheckCircle2,
  Database,
  KeyRound,
  ServerCog,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

import { adminStats, auditTrail, providerStatus, systemModules } from "../../data/platform";

const statIcons = [Building2, Users, KeyRound, Workflow];

export function AdminDashboard() {
  return (
    <section className="page-stack admin-dashboard" aria-labelledby="admin-title">
      <header className="page-header hero-header admin-hero">
        <div>
          <h1 id="admin-title">机构管理中枢</h1>
          <p>管理多租户学校、角色权限、模型供应商和 Bisheng 工作流绑定，保证教学智能体平台稳定运行。</p>
        </div>
        <button className="command-button" type="button">
          <ServerCog aria-hidden="true" size={18} />
          新增系统配置
        </button>
      </header>

      <div className="metric-grid four-columns">
        {adminStats.map((stat, index) => {
          const Icon = statIcons[index];
          return (
            <article key={stat.label} className="metric-card tone-blue">
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

      <div className="dashboard-grid admin-grid">
        <section className="work-panel wide-panel">
          <div className="panel-title-row">
            <div>
              <h2>模型与基础设施</h2>
              <p>供应商、对象存储和工作流服务的运行状态。</p>
            </div>
            <Database aria-hidden="true" size={20} />
          </div>
          <div className="provider-list">
            {providerStatus.map((provider) => (
              <article key={provider.name} className="provider-row">
                <div>
                  <strong>{provider.name}</strong>
                  <small>{provider.status} · 延迟 {provider.latency}</small>
                </div>
                <div className="progress-block">
                  <span>{provider.usage}%</span>
                  <div className="progress-track">
                    <i style={{ width: `${provider.usage}%` }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="work-panel">
          <div className="panel-title-row">
            <div>
              <h2>安全策略</h2>
              <p>角色权限和租户隔离会在下一阶段接入。</p>
            </div>
            <ShieldCheck aria-hidden="true" size={20} />
          </div>
          <div className="policy-card">
            <CheckCircle2 aria-hidden="true" size={20} />
            <div>
              <strong>所有业务表将携带 tenant_id</strong>
              <p>课程、班级、资源、题库、学习记录和报告都需要经过租户与角色校验。</p>
            </div>
          </div>
        </section>

        <section className="work-panel wide-panel">
          <div className="panel-title-row">
            <div>
              <h2>系统模块</h2>
              <p>按平台管理职责拆分，方便后续逐个落库与接 API。</p>
            </div>
            <ServerCog aria-hidden="true" size={20} />
          </div>
          <div className="module-table" role="table" aria-label="系统模块状态">
            <div className="module-head" role="row">
              <span>模块</span>
              <span>负责人</span>
              <span>状态</span>
            </div>
            {systemModules.map((module) => (
              <article key={module.name} className="module-row" role="row">
                <strong>{module.name}</strong>
                <span>{module.owner}</span>
                <em>{module.state}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="work-panel">
          <div className="panel-title-row">
            <div>
              <h2>审计日志</h2>
              <p>关键配置、资料导入和工作流绑定均会记录。</p>
            </div>
            <Activity aria-hidden="true" size={20} />
          </div>
          <div className="audit-list">
            {auditTrail.map((item) => (
              <article key={`${item.actor}-${item.time}`} className="audit-row">
                <span>{item.actor}</span>
                <strong>{item.action}</strong>
                <small>{item.time}</small>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
