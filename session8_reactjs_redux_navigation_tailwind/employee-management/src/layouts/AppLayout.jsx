import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AppLayout() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `px-2 ${
      isActive ? "underline text-blue-200" : "text-white hover:text-blue-100"
    }`;

  return (
    <div>
      <header className="bg-blue-800 text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center shadow-md">
        <h1 className="text-xl font-semibold mb-2 md:mb-0">
          Employee Management
        </h1>

        <nav className="flex flex-wrap items-center gap-4 text-sm">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          {user && (
            <NavLink to="/employees" className={linkClass}>
              Employees
            </NavLink>
          )}
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="mt-3 md:mt-0">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">Hi, {user.username}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
            >
              Login
            </NavLink>
          )}
        </div>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
