import React, { useContext, useMemo } from "react";
import { EmployeeContext } from "../../context/EmployeeContext.jsx";

export default function EmployeeStats() {
  const { employees, loading, offlineMode } = useContext(EmployeeContext);

  const totalEmployees = employees.length;

  const departmentCounts = useMemo(() => {
    const counts = {};
    employees.forEach((e) => {
      counts[e.department] = (counts[e.department] || 0) + 1;
    });
    return counts;
  }, [employees]);

  const uniqueDepartments = Object.keys(departmentCounts);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p>Loading employee statistics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
      {offlineMode && (
        <div className="bg-yellow-50 text-gray-700 p-2 rounded mb-4 text-sm border border-yellow-200">
          Offline mode active — statistics are based on local data
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Employee Statistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800">
            Total Employees
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {totalEmployees}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-center border border-green-100">
          <h3 className="text-lg font-semibold text-green-800">
            Departments
          </h3>
          <p className="text-xl text-green-700 mt-1">
            {uniqueDepartments.length}
          </p>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
          <h3 className="text-lg font-semibold text-indigo-800">
            Unique Roles
          </h3>
          <p className="text-xl text-indigo-700 mt-1">
            {[...new Set(employees.map((e) => e.role))].length}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          Employees per Department
        </h4>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {uniqueDepartments.map((dept) => (
            <div
              key={dept}
              className="bg-gray-50 p-3 rounded border border-gray-200 shadow-sm"
            >
              <p className="text-gray-800 font-medium">{dept}</p>
              <p className="text-sm text-gray-600">
                {departmentCounts[dept]}{" "}
                {departmentCounts[dept] === 1 ? "employee" : "employees"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
