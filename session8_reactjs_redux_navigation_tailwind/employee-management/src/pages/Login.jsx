import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // where to redirect after login (default to /employees)
  const from = location.state?.from?.pathname || '/employees';

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = auth.login({ username, password });
    if (res?.ok) {
      // redirect to where user wanted to go
      navigate(from, { replace: true });
    } else {
      setErr(res?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Username</label><br />
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: 12, fontSize: 13 }}>
        Tip: use <code>admin / admin</code> to login as admin for this demo.
      </p>
    </div>
  );
}
