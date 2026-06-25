import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { FormEvent, useRef, useState } from "react";

import { adminStats, auditTrail, providerStatus, systemModules } from "../../data/platform";
import {
  createProvider,
  getAdminWorkspace,
  toggleProvider,
  type AdminWorkspace,
} from "../../services/api/platform";

const statIcons = [Building2, Users, KeyRound, Workflow];

const fallbackAdminWorkspace: AdminWorkspace = {
  stats: adminStats.map((stat) => ({ ...stat, tone: "blue" })),
  providers: providerStatus.map((provider, index) => ({
    id: `fallback-provider-${index}`,
    name: provider.name,
    provider_type: index === 0 ? "工作流编排" : index === 1 ? "模型服务" : "文件存储",
    status: provider.status,
    latency: provider.latency,
    usage: provider.usage,
    enabled: provider.status !== "暂停",
  })),
  system_modules: systemModules,
  audit_trail: auditTrail,
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "操作失败，请稍后重试";
}

export function AdminDashboard() {
  const queryClient = useQueryClient();
  const providerNameRef = useRef<HTMLInputElement>(null);
  const [providerName, setProviderName] = useState("校内模型代理");
  const [providerType, setProviderType] = useState("模型服务");
  const [latency, setLatency] = useState("188 ms");
  const [notice, setNotice] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["admin-workspace"],
    queryFn: getAdminWorkspace,
  });

  const workspace = data ?? fallbackAdminWorkspace;

  const providerMutation = useMutation({
    mutationFn: createProvider,
    onSuccess: () => {
      setProviderName("");
      setNotice("供应商配置已创建");
      void queryClient.invalidateQueries({ queryKey: ["admin-workspace"] });
    },
    onError: (error) => setNotice(getErrorMessage(error)),
  });

  const toggleMutation = useMutation({
    mutationFn: toggleProvider,
    onSuccess: () => {
      setNotice("供应商状态已更新");
      void queryClient.invalidateQueries({ queryKey: ["admin-workspace"] });
    },
    onError: (error) => setNotice(getErrorMessage(error)),
  });

  function handleProviderSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = providerName.trim();
    if (!name) {
      setNotice("请先填写供应商名称");
      providerNameRef.current?.focus();
      return;
    }
    providerMutation.mutate({ name, provider_type: providerType, latency: latency.trim() || "260 ms" });
  }

  return (
    <section className="page-stack admin-dashboard" aria-labelledby="admin-title">
      <header className="page-header hero-header admin-hero">
        <div>
          <h1 id="admin-title">机构管理中枢</h1>
          <p>管理多租户学校、角色权限、模型供应商和 Bisheng 工作流绑定，保证教学智能体平台稳定运行。</p>
        </div>
        <button className="command-button" type="button" onClick={() => providerNameRef.current?.focus()}>
          <ServerCog aria-hidden="true" size={18} />
          新增系统配置
        </button>
      </header>

      {isError ? <p className="form-status warning">后端暂时不可用，当前展示本地演示数据。</p> : null}
      {isLoading ? <p className="form-status">正在同步管理配置...</p> : null}

      <div className="metric-grid four-columns">
        {workspace.stats.map((stat, index) => {
          const Icon = statIcons[index] ?? Building2;
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
          <form className="panel-form provider-form" onSubmit={handleProviderSubmit}>
            <label>
              <span>供应商名称</span>
              <input
                ref={providerNameRef}
                value={providerName}
                onChange={(event) => setProviderName(event.target.value)}
                placeholder="校内模型代理"
              />
            </label>
            <label>
              <span>类型</span>
              <select value={providerType} onChange={(event) => setProviderType(event.target.value)}>
                <option value="模型服务">模型服务</option>
                <option value="工作流编排">工作流编排</option>
                <option value="文件存储">文件存储</option>
              </select>
            </label>
            <label>
              <span>延迟</span>
              <input value={latency} onChange={(event) => setLatency(event.target.value)} placeholder="188 ms" />
            </label>
            <button className="command-button full-width" type="submit" disabled={providerMutation.isPending}>
              <ServerCog aria-hidden="true" size={18} />
              {providerMutation.isPending ? "保存中" : "新增供应商"}
            </button>
          </form>
          {notice ? <p className="form-status success">{notice}</p> : null}
          <div className="provider-list with-divider">
            {workspace.providers.map((provider) => (
              <article key={provider.id} className="provider-row">
                <div>
                  <strong>{provider.name}</strong>
                  <small>{provider.provider_type} · {provider.status} · 延迟 {provider.latency}</small>
                </div>
                <div className="progress-block">
                  <span>{provider.usage}%</span>
                  <div className="progress-track">
                    <i style={{ width: `${provider.usage}%` }} />
                  </div>
                </div>
                <button
                  className="task-action"
                  type="button"
                  disabled={toggleMutation.isPending}
                  onClick={() => toggleMutation.mutate(provider.id)}
                >
                  {provider.enabled ? "暂停" : "启用"}
                </button>
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
            {workspace.system_modules.map((module) => (
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
            {workspace.audit_trail.map((item) => (
              <article key={`${item.actor}-${item.action}-${item.time}`} className="audit-row">
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