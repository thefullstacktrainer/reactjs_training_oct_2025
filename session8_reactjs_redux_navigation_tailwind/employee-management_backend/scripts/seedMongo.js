// scripts/seedMongo.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import User from "../models/User.js";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Employee.deleteMany({});
  await User.deleteMany({});

  await Employee.insertMany([
    { name: "Ramesh", role: "Developer", department: "IT" },
    { name: "Priya", role: "HR Manager", department: "Human Resources" },
    { name: "Kiran", role: "Accountant", department: "Finance" },
  ]);

  await User.create({ username: "admin", password: "admin", role: "admin" });

  console.log("🌱 Seed data inserted successfully!");
  await mongoose.disconnect();
}

seed();
