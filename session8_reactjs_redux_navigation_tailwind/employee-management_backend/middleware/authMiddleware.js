export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token !== "Bearer admin-demo") {
    return res.status(403).json({ message: "Not authorized" });
  }
  next();
};
