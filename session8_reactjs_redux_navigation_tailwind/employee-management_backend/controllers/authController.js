// import { db } from "../db/memoryDB.js";
// import { success, error } from "../utils/responseHelper.js";

// export const login = (req, res) => {
//   const { username, password } = req.body;

//   const user = db.users.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (!user) return error(res, "Invalid credentials", 401);

//   return success(res, {
//     ok: true,
//     user: { username: user.username, role: user.role },
//     message: "Login successful"
//   });
// };

// export const logout = (req, res) => {
//   return success(res, { ok: true, message: "Logged out successfully" });
// };



// import { pool } from "../db/db.js";
// import { success, error } from "../utils/responseHelper.js";

// export const login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const result = await pool.query(
//       "SELECT username, role FROM users WHERE username = $1 AND password = $2",
//       [username, password]
//     );

//     if (result.rows.length === 0) return error(res, "Invalid credentials", 401);

//     const user = result.rows[0];
//     return success(res, {
//       ok: true,
//       user,
//       message: "Login successful",
//     });
//   } catch (err) {
//     console.error(err);
//     return error(res, "Database error");
//   }
// };

// export const logout = (req, res) => {
//   return success(res, { ok: true, message: "Logged out successfully" });
// };


import User from "../models/User.js";
import { success, error } from "../utils/responseHelper.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) return error(res, "Invalid credentials", 401);

    return success(res, {
      ok: true,
      user: { username: user.username, role: user.role },
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    return error(res, "Database error");
  }
};

export const logout = (req, res) => {
  return success(res, { ok: true, message: "Logged out successfully" });
};
