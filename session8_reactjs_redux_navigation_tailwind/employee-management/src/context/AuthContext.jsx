import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();
const BASE_URL = "http://localhost:5001/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  const login = async ({ username, password }) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      let data = result?.data || result; // handle both shapes

      if (res.ok && (data.ok || data.user)) {
        const userData = data.user || data;
        setUser(userData);
        setOfflineMode(false);
        return { ok: true };
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch {
      setOfflineMode(true);
      if (username === "admin" && password === "admin") {
        const localUser = { username: "admin", role: "admin" };
        setUser(localUser);
        return { ok: true, message: "Local login success (offline)" };
      }
      return { ok: false, message: "Invalid credentials or server offline" };
    }
  };

  const logout = async () => {
    try {
      if (!offlineMode) await fetch(`${BASE_URL}/logout`, { method: "POST" });
    } catch {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, offlineMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
