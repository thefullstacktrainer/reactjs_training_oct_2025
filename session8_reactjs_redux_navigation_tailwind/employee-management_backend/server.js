// import express from "express";
// import cors from "cors";
// import employeeRoutes from "./routes/employeeRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// const app = express();
// const PORT = 5001;

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/employees", employeeRoutes);
// app.use("/api/auth", authRoutes);

// // Health check
// app.get("/", (req, res) => {
//   res.send(`Employee Management Backend is running on port ${PORT}`);
// });

// app.listen(PORT, () =>
//   console.log(`🚀 Server running at http://localhost:${PORT}`)
// );


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.send(`Employee Management Backend is running on port ${PORT}`);
});

// Connect to MongoDB then start server
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
});
