import {
  Bell,
  BookOpenCheck,
  GraduationCap,
  LayoutDashboard,
  Search,
  Settings2,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";

import { apiGet } from "../../services/api/client";

type HealthResponse = {
  status: string;
  service: string;
  environment: string;
};

const navItems = [
  { to: "/", label: "入口总览", helper: "Login", icon: LayoutDashboard },
  { to: "/student", label: "学生空间", helper: "Study", icon: GraduationCap },
  { to: "/teacher", label: "教师运营", helper: "Teaching", icon: UsersRound },
  { to: "/admin", label: "机构管理", helper: "Admin", icon: ShieldCheck },
];

export function AppShell() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["health"],
    queryFn: () => apiGet<HealthResponse>("/api/v1/health"),
  });

  const healthLabel = isLoading ? "连接中" : isError ? "离线" : data?.environment ?? "local";

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="主导航">
        <div className="brand">
          <span className="brand-mark">
            <BookOpenCheck aria-hidden="true" size={22} />
          </span>
          <span>
            <strong>TEACHER</strong>
            <small>教育智能体平台</small>
          </span>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              >
                <Icon aria-hidden="true" size={18} strokeWidth={2} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.helper}</small>
                </span>
              </NavLink>
            );
          })}
        </nav>

        <section className="sidebar-panel" aria-label="平台运行状态">
          <div className="sidebar-panel-header">
            <span>智能体运行</span>
            <span className={`signal-dot ${isError ? "danger" : ""}`} />
          </div>
          <strong>42 个工作流</strong>
          <p>Bisheng 适配层已接入演示队列，等待真实凭据与回调配置。</p>
        </section>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <label className="search-box">
            <Search aria-hidden="true" size={18} />
            <input placeholder="搜索课程、学生、题库或工作流" />
          </label>

          <div className="topbar-actions" aria-label="快捷操作">
            <span className="api-status">
              <span className={`signal-dot ${isError ? "danger" : ""}`} />
              API {healthLabel}
            </span>
            <button className="icon-button" type="button" aria-label="通知">
              <Bell aria-hidden="true" size={18} />
            </button>
            <button className="icon-button" type="button" aria-label="设置">
              <Settings2 aria-hidden="true" size={18} />
            </button>
          </div>
        </header>

        <main className="workspace">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
