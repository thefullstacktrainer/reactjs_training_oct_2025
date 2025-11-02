import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

export const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([
    { id: uuidv4(), name: 'Ramesh', role: 'Developer', department: 'IT' },
    { id: uuidv4(), name: 'Priya', role: 'HR Manager', department: 'Human Resources' },
    { id: uuidv4(), name: 'Kiran', role: 'Accountant', department: 'Finance' },
  ]);

  const addEmployee = (emp) => {
    const newEmp = { ...emp, id: uuidv4() };
    setEmployees([...employees, newEmp]);
  };

  const updateEmployee = (id, updatedEmp) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedEmp } : emp))
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
