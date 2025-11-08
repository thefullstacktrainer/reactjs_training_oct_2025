import { db } from "../db/memoryDB.js";
import { success, error } from "../utils/responseHelper.js";

export const login = (req, res) => {
  const { username, password } = req.body;

  const user = db.users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return error(res, "Invalid credentials", 401);

  return success(res, {
    ok: true,
    user: { username: user.username, role: user.role },
    message: "Login successful"
  });
};

export const logout = (req, res) => {
  return success(res, { ok: true, message: "Logged out successfully" });
};
