import express from "express";
import { protect, allowRoles } from "../middleware/authMiddleware.js";
import { getLogs, filterLogs } from "../controllers/logController.js";
const router = express.Router();
router.use(protect, allowRoles("admin"));
router.get("/", getLogs);
router.get("/search", filterLogs);
export default router;
