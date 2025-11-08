import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const EmployeeContext = createContext();
const BASE_URL = "http://localhost:5001/api/employees";

const defaultEmployees = [
  { id: uuidv4(), name: "Ramesh", role: "Developer", department: "IT" },
  { id: uuidv4(), name: "Priya", role: "HR Manager", department: "Human Resources" },
  { id: uuidv4(), name: "Kiran", role: "Accountant", department: "Finance" },
];

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(defaultEmployees);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL);
      const data = await res.json();

      if (res.ok && Array.isArray(data.data)) {
        setEmployees(data.data);
        setOfflineMode(false);
      } else if (res.ok && Array.isArray(data)) {
        setEmployees(data);
        setOfflineMode(false);
      } else {
        setEmployees(defaultEmployees);
        setOfflineMode(true);
      }
    } catch {
      setEmployees(defaultEmployees);
      setOfflineMode(true);
      setError("Backend not reachable, using local data.");
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (emp) => {
    if (offlineMode) {
      const newEmp = { ...emp, id: uuidv4() };
      setEmployees((prev) => [...prev, newEmp]);
      return;
    }

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp),
      });
      const data = await res.json();

      if (res.ok && data?.data) {
        setEmployees((prev) => [...prev, data.data]);
      } else if (res.ok && data) {
        setEmployees((prev) => [...prev, data]);
      } else {
        throw new Error("Invalid add response");
      }
    } catch {
      const newEmp = { ...emp, id: uuidv4() };
      setEmployees((prev) => [...prev, newEmp]);
      setOfflineMode(true);
    }
  };

  const updateEmployee = async (id, updatedEmp) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        String(emp.id) === String(id) ? { ...emp, ...updatedEmp } : emp
      )
    );

    if (offlineMode) return Promise.resolve();

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmp),
      });
      const data = await res.json();

      if (res.ok && data?.data) {
        setEmployees((prev) =>
          prev.map((emp) =>
            String(emp.id) === String(id) ? data.data : emp
          )
        );
      } else {
        throw new Error("Invalid update response");
      }
    } catch {
      setOfflineMode(true);
    }

    return Promise.resolve();
  };

  const deleteEmployee = async (id) => {
    if (offlineMode) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      } else {
        throw new Error("Delete failed");
      }
    } catch {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      setOfflineMode(true);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees: Array.isArray(employees) ? employees : [],
        loading,
        error,
        offlineMode,
        fetchEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
