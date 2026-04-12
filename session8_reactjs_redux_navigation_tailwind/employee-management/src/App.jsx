import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import EmployeeLayout from "./pages/employees/EmployeeLayout.jsx";
import EmployeeList from "./pages/EmployeeList.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import ViewEmployee from "./pages/ViewEmployee.jsx";
import EditEmployee from "./pages/EditEmployee.jsx";
import EmployeeStats from "./pages/employees/EmployeeStats.jsx";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="employees" element={<EmployeeLayout />}>
              <Route index element={<EmployeeList />} />
              <Route path="add" element={<AddEmployee />} />
              <Route path="stats" element={<EmployeeStats />} />
              <Route path=":id" element={<ViewEmployee />} />
              <Route path=":id/edit" element={<EditEmployee />} />
            </Route>
          </Route>

          {/* 404 fallback route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
