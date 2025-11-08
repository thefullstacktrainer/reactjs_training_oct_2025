import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Toast from "../components/Toast.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/employees";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const res = await auth.login({ username, password });
    setLoading(false);

    if (res?.ok) {
      setToast("Login successful");
      setTimeout(() => navigate(from, { replace: true }), 1800);
    } else {
      setErr(res?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md mt-12 relative">
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Login
      </h2>

      {err && (
        <div className="text-red-600 text-sm text-center mb-4">{err}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-medium py-2 rounded ${
            loading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-3">
        Tip: use <code>admin / admin</code> to log in as admin.
      </p>
    </div>
  );
}
