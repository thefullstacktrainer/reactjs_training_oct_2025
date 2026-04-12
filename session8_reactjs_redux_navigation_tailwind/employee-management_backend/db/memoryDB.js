import { v4 as uuidv4 } from "uuid";

export const db = {
  employees: [
    { id: uuidv4(), name: "Ramesh", role: "Developer", department: "IT" },
    { id: uuidv4(), name: "Priya", role: "HR Manager", department: "Human Resources" },
    { id: uuidv4(), name: "Kiran", role: "Accountant", department: "Finance" },
  ],
  users: [
    { username: "admin", password: "admin", role: "admin" },
  ],
};
