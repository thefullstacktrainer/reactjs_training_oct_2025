// ======================================
// Server bootstrap with Express + Socket.io
// ======================================
import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import studentRoutes from "./routes/studentRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import mentorAdminRoutes from "./routes/mentorAdminRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import logRoutes from "./routes/logRoutes.js";

dotenv.config();
const application = express();
application.use(cors());
application.use(express.json());
application.get("/", (_, response)=>response.send("Career Guidance API + Sockets + JSON DB"));

const httpServer = http.createServer(application);
const socketServer = new Server(httpServer, { cors: { origin: "*" } });
application.set("io", socketServer);

application.use("/api/students", studentRoutes);
application.use("/api/sessions", sessionRoutes);
application.use("/api/mentors", mentorRoutes);
application.use("/api/admin/mentors", mentorAdminRoutes);
application.use("/api/analytics", analyticsRoutes);
application.use("/api/admin/logs", logRoutes);

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, ()=>console.log(`Server+Socket listening on ${PORT}`));

socketServer.on("connection", socket=>{
  console.log("socket connected:", socket.id);
  socket.on("joinRoom", (roomName)=>{
    socket.join(roomName);
    console.log(`🔗 ${socket.id} joined ${roomName}`);
  });
  socket.on("disconnect",()=>console.log("socket disconnected:", socket.id));
});
