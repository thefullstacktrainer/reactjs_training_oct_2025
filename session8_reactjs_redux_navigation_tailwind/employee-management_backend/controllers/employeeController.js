import { db } from "../db/memoryDB.js";
import { v4 as uuidv4 } from "uuid";
import { success, error } from "../utils/responseHelper.js";

export const getAllEmployees = (req, res) => {
  return success(res, db.employees);
};

export const getEmployeeById = (req, res) => {
  const emp = db.employees.find(e => e.id === req.params.id);
  if (!emp) return error(res, "Employee not found", 404);
  return success(res, emp);
};

export const addEmployee = (req, res) => {
  const { name, role, department } = req.body;
  if (!name || !role || !department)
    return error(res, "All fields required", 400);

  const newEmp = { id: uuidv4(), name, role, department };
  db.employees.push(newEmp);
  return success(res, newEmp, 201);
};

export const updateEmployee = (req, res) => {
  const { id } = req.params;
  const empIndex = db.employees.findIndex(e => e.id === id);
  if (empIndex === -1) return error(res, "Employee not found", 404);

  db.employees[empIndex] = { ...db.employees[empIndex], ...req.body };
  return success(res, db.employees[empIndex]);
};

export const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const index = db.employees.findIndex(e => e.id === id);
  if (index === -1) return error(res, "Employee not found", 404);

  const removed = db.employees.splice(index, 1);
  return success(res, { message: "Deleted successfully", employee: removed[0] });
};
