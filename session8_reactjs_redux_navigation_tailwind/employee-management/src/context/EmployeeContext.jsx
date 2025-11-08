import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const EmployeeContext = createContext();

const BASE_URL = "http://localhost:5001/api/employees";

// Local fallback data
const defaultEmployees = [
  { id: uuidv4(), name: "Rajesh", role: "Developer", department: "IT" },
  { id: uuidv4(), name: "Preeti", role: "HR Manager", department: "Human Resources" },
  { id: uuidv4(), name: "Krishna", role: "Accountant", department: "Finance" },
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

      // Ensure we set array, not entire object
      if (res.ok && Array.isArray(data.data)) {
        setEmployees(data.data);
        setOfflineMode(false);
      } 
      else if (res.ok && Array.isArray(data)) {
        setEmployees(data);
        setOfflineMode(false);
      } 
      else {
        console.warn("⚠️ API response invalid or not array, using fallback");
        setEmployees(defaultEmployees);
        setOfflineMode(true);
      }
    } catch (err) {
      console.warn("⚠️ Backend unreachable — using local fallback data");
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
      alert("Added locally (offline mode)");
      return;
    }

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp),
      });
      const data = await res.json();
      if (res.ok) {
        setEmployees((prev) => [...prev, data]);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Add failed:", err);
      setEmployees((prev) => [...prev, { ...emp, id: uuidv4() }]);
      setOfflineMode(true);
    }
  };

  const updateEmployee = async (id, updatedEmp) => {
    if (offlineMode) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, ...updatedEmp } : emp))
      );
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmp),
      });
      const data = await res.json();
      if (res.ok) {
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === id ? data : emp))
        );
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.warn("⚠️ Update failed, doing local update");
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, ...updatedEmp } : emp))
      );
      setOfflineMode(true);
    }
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
    } catch (err) {
      console.warn("⚠️ Delete failed, removing locally");
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
