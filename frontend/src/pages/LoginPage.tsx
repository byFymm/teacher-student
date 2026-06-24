import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { platformHighlights, roleEntrances } from "../data/platform";

const roleIcons = [GraduationCap, UsersRound, ShieldCheck];

export function LoginPage() {
  const [message, setMessage] = useState("认证模块待接入，当前可直接进入各角色工作台预览");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("登录接口将在用户与权限模块接入后启用；现在先进入演示工作台。");
  }

  return (
    <section className="login-page" aria-labelledby="login-title">
      <div className="login-hero">
        <div className="login-copy">
          <div className="product-mark">
            <BookOpenCheck aria-hidden="true" size={26} />
          </div>
          <h1 id="login-title">把课程、题库、智能体和学情报告放进一个教学运营中枢</h1>
          <p>
            面向学校和教培机构的教育智能体平台：教师管理课程和资料，学生完成问答与训练，Bisheng
            工作流负责解析、组卷、批改和报告生成。
          </p>

          <div className="highlight-grid" aria-label="平台指标">
            {platformHighlights.map((item) => (
              <article key={item.label} className="highlight-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>{item.trend}</small>
              </article>
            ))}
          </div>
        </div>

        <div className="workflow-preview" aria-label="智能体流程预览">
          <div className="preview-header">
            <span>
              <Workflow aria-hidden="true" size={18} />
              Bisheng 工作流队列
            </span>
            <strong>Live</strong>
          </div>
          <div className="flow-line active">
            <span>资料解析</span>
            <strong>函数专题讲义.pdf</strong>
            <small>68%</small>
          </div>
          <div className="flow-line">
            <span>智能组卷</span>
            <strong>英语阅读 Week 7</strong>
            <small>待审核</small>
          </div>
          <div className="flow-line">
            <span>批改讲解</span>
            <strong>物理综合测验</strong>
            <small>排队中</small>
          </div>
        </div>
      </div>

      <div className="entry-grid">
        <form className="login-panel" onSubmit={handleSubmit}>
          <div className="panel-title-row">
            <div>
              <h2>平台登录</h2>
              <p>预留统一认证、租户识别和角色路由。</p>
            </div>
            <LockKeyhole aria-hidden="true" size={20} />
          </div>

          <label>
            <span>账号</span>
            <input name="account" autoComplete="username" placeholder="teacher@example.com" />
          </label>
          <label>
            <span>密码</span>
            <input name="password" type="password" autoComplete="current-password" placeholder="••••••••" />
          </label>
          <Button type="submit">进入平台</Button>
          <p className="form-status" role="status">
            {message}
          </p>
        </form>

        <section className="role-entrance-panel" aria-label="角色入口">
          <div className="panel-title-row">
            <div>
              <h2>角色工作台</h2>
              <p>先进入演示空间查看第一版产品界面。</p>
            </div>
            <Sparkles aria-hidden="true" size={20} />
          </div>

          <div className="role-list">
            {roleEntrances.map((role, index) => {
              const Icon = roleIcons[index];
              return (
                <Link key={role.to} to={role.to} className={`role-card tone-${role.accent}`}>
                  <Icon aria-hidden="true" size={20} />
                  <span>
                    <strong>{role.title}</strong>
                    <small>{role.description}</small>
                  </span>
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="readiness-panel" aria-label="建设状态">
          <div className="panel-title-row">
            <div>
              <h2>第一阶段建设状态</h2>
              <p>仓库底座已经可运行，业务模块按里程碑接入。</p>
            </div>
            <CheckCircle2 aria-hidden="true" size={20} />
          </div>
          <ul className="readiness-list">
            <li>
              <span>前端工作台</span>
              <strong>进行中</strong>
            </li>
            <li>
              <span>FastAPI 基础接口</span>
              <strong>已接入</strong>
            </li>
            <li>
              <span>租户与鉴权</span>
              <strong>下一步</strong>
            </li>
            <li>
              <span>Bisheng 真实联调</span>
              <strong>待配置</strong>
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}
