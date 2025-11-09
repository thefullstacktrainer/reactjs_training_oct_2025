import express from "express";
import { protect, allowRoles } from "../middleware/authMiddleware.js";
import { getSessions, addSession } from "../controllers/sessionController.js";
const router = express.Router();
router.get("/", protect, getSessions);
router.post("/", protect, allowRoles("admin","mentor"), addSession);
export default router;
