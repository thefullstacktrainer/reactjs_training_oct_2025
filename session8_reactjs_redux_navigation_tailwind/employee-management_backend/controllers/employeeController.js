// import { db } from "../db/memoryDB.js";
// import { v4 as uuidv4 } from "uuid";
// import { success, error } from "../utils/responseHelper.js";

// export const getAllEmployees = (req, res) => {
//   return success(res, db.employees);
// };

// export const getEmployeeById = (req, res) => {
//   const emp = db.employees.find(e => e.id === req.params.id);
//   if (!emp) return error(res, "Employee not found", 404);
//   return success(res, emp);
// };

// export const addEmployee = (req, res) => {
//   const { name, role, department } = req.body;
//   if (!name || !role || !department)
//     return error(res, "All fields required", 400);

//   const newEmp = { id: uuidv4(), name, role, department };
//   db.employees.push(newEmp);
//   return success(res, newEmp, 201);
// };

// export const updateEmployee = (req, res) => {
//   const { id } = req.params;
//   const empIndex = db.employees.findIndex(e => e.id === id);
//   if (empIndex === -1) return error(res, "Employee not found", 404);

//   db.employees[empIndex] = { ...db.employees[empIndex], ...req.body };
//   return success(res, db.employees[empIndex]);
// };

// export const deleteEmployee = (req, res) => {
//   const { id } = req.params;
//   const index = db.employees.findIndex(e => e.id === id);
//   if (index === -1) return error(res, "Employee not found", 404);

//   const removed = db.employees.splice(index, 1);
//   return success(res, { message: "Deleted successfully", employee: removed[0] });
// };



// import { pool } from "../db/db.js";
// import { success, error } from "../utils/responseHelper.js";

// export const getAllEmployees = async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM employees ORDER BY name");
//     return success(res, result.rows);
//   } catch (err) {
//     console.error(err);
//     return error(res, "Database error");
//   }
// };

// export const getEmployeeById = async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM employees WHERE id = $1", [req.params.id]);
//     if (result.rows.length === 0) return error(res, "Employee not found", 404);
//     return success(res, result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     return error(res, "Database error");
//   }
// };

// export const addEmployee = async (req, res) => {
//   const { name, role, department } = req.body;
//   if (!name || !role || !department) return error(res, "All fields required", 400);

//   try {
//     const result = await pool.query(
//       "INSERT INTO employees (name, role, department) VALUES ($1, $2, $3) RETURNING *",
//       [name, role, department]
//     );
//     return success(res, result.rows[0], 201);
//   } catch (err) {
//     console.error(err);
//     return error(res, "Database error");
//   }
// };

// export const updateEmployee = async (req, res) => {
//   const { id } = req.params;
//   const { name, role, department } = req.body;

//   try {
//     const result = await pool.query(
//       `UPDATE employees
//        SET name = COALESCE($1, name),
//            role = COALESCE($2, role),
//            department = COALESCE($3, department)
//        WHERE id = $4
//        RETURNING *`,
//       [name, role, department, id]
//     );

//     if (result.rows.length === 0) return error(res, "Employee not found", 404);
//     return success(res, result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     return error(res, "Database error");
//   }
// };

// export const deleteEmployee = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query("DELETE FROM employees WHERE id = $1 RETURNING *", [id]);
//     if (result.rows.length === 0) return error(res, "Employee not found", 404);
//     return success(res, { message: "Deleted successfully", employee: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     return error(res, "Database error");
//   }
// };


import Employee from "../models/Employee.js";
import { success, error } from "../utils/responseHelper.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ name: 1 });
    return success(res, employees);
  } catch (err) {
    console.error(err);
    return error(res, "Database error");
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return error(res, "Employee not found", 404);
    return success(res, emp);
  } catch (err) {
    console.error(err);
    return error(res, "Invalid ID or database error");
  }
};

export const addEmployee = async (req, res) => {
  const { name, role, department } = req.body;
  if (!name || !role || !department)
    return error(res, "All fields required", 400);

  try {
    const newEmp = await Employee.create({ name, role, department });
    return success(res, newEmp, 201);
  } catch (err) {
    console.error(err);
    return error(res, "Database error");
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return error(res, "Employee not found", 404);
    return success(res, updated);
  } catch (err) {
    console.error(err);
    return error(res, "Invalid ID or database error");
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return error(res, "Employee not found", 404);
    return success(res, { message: "Deleted successfully", employee: deleted });
  } catch (err) {
    console.error(err);
    return error(res, "Invalid ID or database error");
  }
};
