import express from "express";
import { loginMentor, seedMentor } from "../controllers/mentorController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/seed", seedMentor);
router.post("/login", loginMentor);
router.get("/profile", protect, (request,response)=>response.json(request.user));
export default router;
