import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => { if (user) navigate("/dashboard"); }, [user, navigate]);

  const submit = (event) => { event.preventDefault(); dispatch(login(credentials)); };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={submit} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-xl mb-4 font-semibold">Mentor Login</h2>
        <input className="border p-2 mb-2 w-full" placeholder="Email" value={credentials.email}
          onChange={(event)=>setCredentials({...credentials, email:event.target.value})} />
        <input className="border p-2 mb-2 w-full" type="password" placeholder="Password" value={credentials.password}
          onChange={(event)=>setCredentials({...credentials, password:event.target.value})} />
        <button className="bg-blue-600 text-white px-4 py-2 w-full rounded">
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}
