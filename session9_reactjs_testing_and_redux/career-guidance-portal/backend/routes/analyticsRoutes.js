import express from "express";
import { protect, allowRoles } from "../middleware/authMiddleware.js";
import { sessionSummary } from "../controllers/analyticsController.js";
const router = express.Router();
router.get("/summary", protect, allowRoles("admin","mentor"), sessionSummary);
export default router;
