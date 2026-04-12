import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "career-guidance-secret";
const EXPIRES = process.env.JWT_EXPIRES || "1h";
export const signToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
export const verifyToken = (token) => jwt.verify(token, SECRET);
