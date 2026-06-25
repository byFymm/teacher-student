import { apiGet, apiPatch, apiPost } from "./client";

export type Metric = {
  label: string;
  value: string;
  hint?: string;
  tone: string;
};

export type WorkflowRunItem = {
  id: string;
  name: string;
  target: string;
  status: string;
  progress: number;
  updated_at: string;
};

export type CourseOperation = {
  course: string;
  class_name: string;
  students: number;
  completion: number;
  alert: string;
};

export type ResourceJob = {
  id: string;
  name: string;
  resource_type: string;
  state: string;
  time: string;
};

export type InsightCard = {
  label: string;
  value: string;
  note: string;
};

export type TeacherWorkspace = {
  stats: Metric[];
  course_operations: CourseOperation[];
  workflow_runs: WorkflowRunItem[];
  resources: ResourceJob[];
  insights: InsightCard[];
};

export type ResourceCreatePayload = {
  name: string;
  resource_type: string;
};

export type ResourceCreateResponse = {
  resource: ResourceJob;
  workflow_run: WorkflowRunItem;
};

export type ExerciseCreatePayload = {
  knowledge_points: string;
  difficulty: string;
  count: number;
};

export type ExerciseCreateResponse = {
  task_id: string;
  workflow_run: WorkflowRunItem;
  title: string;
};

export type StudentCourse = {
  id: string;
  name: string;
  teacher: string;
  progress: number;
  next_action: string;
  mastery: string;
};

export type StudentTask = {
  id: string;
  title: string;
  task_type: string;
  due: string;
  status: string;
};

export type MasteryPoint = {
  label: string;
  value: number;
};

export type ChatMessage = {
  id: string;
  role: string;
  content: string;
  time: string;
};

export type StudentWorkspace = {
  stats: Metric[];
  courses: StudentCourse[];
  tasks: StudentTask[];
  mastery_points: MasteryPoint[];
  chat_messages: ChatMessage[];
  recommendation: string;
};

export type ChatResponse = {
  answer: string;
  messages: ChatMessage[];
};

export type ProviderStatus = {
  id: string;
  name: string;
  provider_type: string;
  status: string;
  latency: string;
  usage: number;
  enabled: boolean;
};

export type SystemModule = {
  name: string;
  owner: string;
  state: string;
};

export type AuditEvent = {
  actor: string;
  action: string;
  time: string;
};

export type AdminWorkspace = {
  stats: Metric[];
  providers: ProviderStatus[];
  system_modules: SystemModule[];
  audit_trail: AuditEvent[];
};

export type ProviderCreatePayload = {
  name: string;
  provider_type: string;
  latency: string;
};

export function getTeacherWorkspace() {
  return apiGet<TeacherWorkspace>("/api/v1/teacher/workspace");
}

export function createResource(payload: ResourceCreatePayload) {
  return apiPost<ResourceCreateResponse>("/api/v1/resources", payload);
}

export function createExercise(payload: ExerciseCreatePayload) {
  return apiPost<ExerciseCreateResponse>("/api/v1/exercises", payload);
}

export function getStudentWorkspace() {
  return apiGet<StudentWorkspace>("/api/v1/student/workspace");
}

export function sendChatQuestion(question: string) {
  return apiPost<ChatResponse>("/api/v1/chat", { question });
}

export function updateStudentTask(taskId: string, status: string) {
  return apiPatch<StudentTask>(`/api/v1/student/tasks/${taskId}`, { status });
}

export function getAdminWorkspace() {
  return apiGet<AdminWorkspace>("/api/v1/admin/workspace");
}

export function createProvider(payload: ProviderCreatePayload) {
  return apiPost<ProviderStatus>("/api/v1/admin/providers", payload);
}

export function toggleProvider(providerId: string) {
  return apiPatch<{ provider: ProviderStatus }>(`/api/v1/admin/providers/${providerId}/toggle`);
}