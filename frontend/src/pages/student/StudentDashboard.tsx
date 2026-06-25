import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  BookMarked,
  BotMessageSquare,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  MessageSquareText,
  Send,
  Target,
} from "lucide-react";
import { FormEvent, useState } from "react";

import { masteryPoints, studentCourses, studentStats, studentTasks } from "../../data/platform";
import {
  getStudentWorkspace,
  sendChatQuestion,
  updateStudentTask,
  type StudentWorkspace,
} from "../../services/api/platform";

const statIcons = [BookMarked, ClipboardCheck, MessageSquareText, Flame];

const fallbackStudentWorkspace: StudentWorkspace = {
  stats: studentStats,
  courses: studentCourses.map((course, index) => ({
    id: `fallback-course-${index}`,
    name: course.name,
    teacher: course.teacher,
    progress: course.progress,
    next_action: course.nextAction,
    mastery: course.mastery,
  })),
  tasks: studentTasks.map((task, index) => ({
    id: `fallback-task-${index}`,
    title: task.title,
    task_type: task.type,
    due: task.due,
    status: task.status,
  })),
  mastery_points: masteryPoints,
  chat_messages: [
    {
      id: "fallback-chat-user",
      role: "user",
      content: "指数函数和幂函数怎么区分？",
      time: "刚刚",
    },
    {
      id: "fallback-chat-assistant",
      role: "assistant",
      content: "先看自变量的位置：指数函数的变量在指数上，幂函数的变量在底数上。",
      time: "刚刚",
    },
  ],
  recommendation: "优先复习受力分析与函数图像，先做基础题，再进入 AI 讲解模式。",
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "操作失败，请稍后重试";
}

export function StudentDashboard() {
  const queryClient = useQueryClient();
  const [question, setQuestion] = useState("指数函数怎么判断单调性？");
  const [chatNotice, setChatNotice] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["student-workspace"],
    queryFn: getStudentWorkspace,
  });

  const workspace = data ?? fallbackStudentWorkspace;
  const chatMessages = workspace.chat_messages.slice(-6);

  const chatMutation = useMutation({
    mutationFn: sendChatQuestion,
    onSuccess: (response) => {
      setQuestion("");
      setChatNotice("AI 学习助手已回答");
      queryClient.setQueryData<StudentWorkspace>(["student-workspace"], (current) => {
        if (!current) {
          return current;
        }
        return { ...current, chat_messages: response.messages };
      });
      void queryClient.invalidateQueries({ queryKey: ["student-workspace"] });
    },
    onError: (error) => setChatNotice(getErrorMessage(error)),
  });

  const taskMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: string }) =>
      updateStudentTask(taskId, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["student-workspace"] });
    },
  });

  function handleChatSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      setChatNotice("请先输入问题");
      return;
    }
    chatMutation.mutate(trimmedQuestion);
  }

  return (
    <section className="page-stack student-dashboard" aria-labelledby="student-title">
      <header className="page-header hero-header compact-hero">
        <div>
          <h1 id="student-title">学习中心</h1>
          <p>围绕课程资料进行问答、练习、考试训练和错题复盘，学习过程会沉淀为个人学情报告。</p>
        </div>
        <button className="command-button" type="button">
          <BotMessageSquare aria-hidden="true" size={18} />
          AI 学习助手
        </button>
      </header>

      {isError ? <p className="form-status warning">后端暂时不可用，当前展示本地演示数据。</p> : null}
      {isLoading ? <p className="form-status">正在同步学习数据...</p> : null}

      <div className="metric-grid four-columns">
        {workspace.stats.map((stat, index) => {
          const Icon = statIcons[index] ?? BookMarked;
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
            {workspace.courses.map((course) => (
              <article key={course.id} className="course-row">
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
                <small>{course.next_action}</small>
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
          <div className="chat-preview" aria-live="polite">
            {chatMessages.map((message) => (
              <div key={message.id} className={`chat-bubble ${message.role}`}>
                {message.content}
              </div>
            ))}
          </div>
          <form className="chat-form" onSubmit={handleChatSubmit}>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="输入课程问题"
              rows={3}
            />
            <button className="command-button full-width" type="submit" disabled={chatMutation.isPending}>
              <Send aria-hidden="true" size={18} />
              {chatMutation.isPending ? "思考中" : "发送问题"}
            </button>
          </form>
          {chatNotice ? <p className="form-status success">{chatNotice}</p> : null}
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
            {workspace.tasks.map((task) => {
              const nextStatus = task.status === "已完成" ? "进行中" : "已完成";
              return (
                <article key={task.id} className="task-row">
                  <span>
                    <strong>{task.title}</strong>
                    <small>{task.task_type} · {task.due}</small>
                  </span>
                  <em className={task.status === "已完成" ? "done" : ""}>{task.status}</em>
                  <button
                    className="task-action"
                    type="button"
                    disabled={taskMutation.isPending}
                    onClick={() => taskMutation.mutate({ taskId: task.id, status: nextStatus })}
                  >
                    {task.status === "已完成" ? "重开" : "完成"}
                  </button>
                </article>
              );
            })}
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
            {workspace.mastery_points.map((point) => (
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
            <p>{workspace.recommendation}</p>
          </div>
        </section>
      </div>
    </section>
  );
}