import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import MentorDashboard from "./MentorDashboard";
import { Navigate } from "react-router-dom";

export default function DashboardRouter() {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "mentor") return <MentorDashboard />;
  return <Navigate to="/sessions" replace />;
}
