import { BookOpenCheck, GraduationCap, ShieldCheck, UsersRound } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "登录", icon: BookOpenCheck },
  { to: "/student", label: "学生", icon: GraduationCap },
  { to: "/teacher", label: "老师", icon: UsersRound },
  { to: "/admin", label: "管理", icon: ShieldCheck },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="主导航">
        <div className="brand">
          <span className="brand-mark">T</span>
          <span>
            <strong>TEACHER</strong>
            <small>教育智能体</small>
          </span>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className="nav-item">
                <Icon aria-hidden="true" size={18} strokeWidth={2} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <main className="workspace">
        <Outlet />
      </main>
    </div>
  );
}