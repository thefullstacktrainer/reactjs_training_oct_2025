import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function EmployeeLayout() {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
    }`;

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <div className="bg-white rounded-lg shadow-md mb-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
            Employee Section
          </h2>

          <nav className="flex flex-wrap gap-2">
            <NavLink to="/employees" className={linkClasses}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A10.97 10.97 0 0112 15c2.5 0 4.847.824 6.879 2.21M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              All Employees
            </NavLink>

            <NavLink to="/employees/stats" className={linkClasses}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Statistics
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
