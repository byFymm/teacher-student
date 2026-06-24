import { ArrowRight, BookOpenCheck, GraduationCap, ShieldCheck, UsersRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/Button";

const roleLinks = [
  { to: "/student", label: "学生入口", icon: GraduationCap },
  { to: "/teacher", label: "老师入口", icon: UsersRound },
  { to: "/admin", label: "管理入口", icon: ShieldCheck },
];

export function LoginPage() {
  const [message, setMessage] = useState("等待接入认证服务");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("登录服务将在认证模块接入");
  }

  return (
    <section className="login-grid" aria-labelledby="login-title">
      <div className="login-copy">
        <div className="section-icon">
          <BookOpenCheck aria-hidden="true" size={24} />
        </div>
        <h1 id="login-title">教育智能体平台</h1>
        <p>课程资料、题库训练、毕昇工作流和学情反馈统一在一个工作台里。</p>

        <div className="role-strip" aria-label="角色入口">
          {roleLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="role-link">
                <Icon aria-hidden="true" size={18} />
                <span>{item.label}</span>
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            );
          })}
        </div>
      </div>

      <form className="login-panel" onSubmit={handleSubmit}>
        <h2>登录</h2>
        <label>
          <span>账号</span>
          <input name="account" autoComplete="username" placeholder="teacher@example.com" />
        </label>
        <label>
          <span>密码</span>
          <input name="password" type="password" autoComplete="current-password" />
        </label>
        <Button type="submit">进入平台</Button>
        <p className="form-status" role="status">
          {message}
        </p>
      </form>
    </section>
  );
}