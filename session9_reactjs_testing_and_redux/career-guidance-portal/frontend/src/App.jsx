import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LoginForm from "./features/auth/LoginForm";
import StudentList from "./features/students/StudentList";
import SessionsList from "./features/sessions/SessionsList";
import MentorAdmin from "./features/mentors/MentorAdmin";
import LogsViewer from "./features/logs/LogsViewer";
import NotificationFeed from "./features/notifications/NotificationFeed";
import SessionSocketListener from "./features/sessions/SessionSocketListener";
import ProgressSocketListener from "./features/students/ProgressSocketListener";
import NotificationSocketListener from "./features/notifications/NotificationSocketListener";
import DashboardRouter from "./features/dashboard/DashboardRouter";
import MyMentees from "./features/students/MyMentees";

const SessionAnalytics = lazy(()=>import("./features/analytics/SessionAnalytics"));
const LiveAnalytics = lazy(()=>import("./features/analytics/LiveAnalytics"));

export default function App(){
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-60">
          <Navbar />
          <SessionSocketListener />
          <ProgressSocketListener />
          <NotificationSocketListener />

          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<ProtectedRoute roles={["admin","mentor"]}><DashboardRouter/></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute roles={["admin","mentor"]}><StudentList/></ProtectedRoute>} />
            <Route path="/mentees" element={<ProtectedRoute roles={["mentor","admin"]}><MyMentees/></ProtectedRoute>} />
            <Route path="/sessions" element={<ProtectedRoute roles={["admin","mentor","student"]}><SessionsList/></ProtectedRoute>} />
            <Route path="/mentors" element={<ProtectedRoute roles={["admin"]}><MentorAdmin/></ProtectedRoute>} />
            <Route path="/logs" element={<ProtectedRoute roles={["admin"]}><LogsViewer/></ProtectedRoute>} />
            <Route path="/activity" element={<ProtectedRoute roles={["admin","mentor"]}><NotificationFeed/></ProtectedRoute>} />
            <Route path="/analytics" element={
              <ProtectedRoute roles={["admin"]}>
                <Suspense fallback={<p className="p-6">Loading charts...</p>}><SessionAnalytics/></Suspense>
              </ProtectedRoute>} />
            <Route path="/live-analytics" element={
              <ProtectedRoute roles={["admin","mentor"]}>
                <Suspense fallback={<p className="p-6">Loading live analytics...</p>}><LiveAnalytics/></Suspense>
              </ProtectedRoute>} />
            <Route path="/forbidden" element={<h2 className="p-6">🚫 Access Denied</h2>} />
            <Route path="*" element={<div className="p-6">Go to <Link className="text-blue-700 underline" to="/login">Login</Link></div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
