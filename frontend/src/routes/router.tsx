import { createBrowserRouter } from "react-router-dom";

import { AppShell } from "../app/layout/AppShell";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { LoginPage } from "../pages/LoginPage";
import { StudentDashboard } from "../pages/student/StudentDashboard";
import { TeacherDashboard } from "../pages/teacher/TeacherDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "student", element: <StudentDashboard /> },
      { path: "teacher", element: <TeacherDashboard /> },
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
]);