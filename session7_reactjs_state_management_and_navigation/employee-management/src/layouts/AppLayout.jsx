import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div>

      <header style={{ background: 'rgb(88 133 178)', color: 'white', padding: '1rem' }}>
        <h1>Employee Management Application</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <NavLink to="/" style={({ isActive }) => ({
            marginRight: '1rem',
            textDecoration: isActive ? 'underline' : 'none',
            color: isActive ? 'blue' : 'black'
          })}>Home</NavLink>
          <NavLink to="/employees" style={({ isActive }) => ({
            marginRight: '1rem',
            textDecoration: isActive ? 'underline' : 'none',
            color: isActive ? 'blue' : 'black'
          })}>Employees</NavLink>
          <NavLink to="/about" style={({ isActive }) => ({
            marginRight: '1rem',
            textDecoration: isActive ? 'underline' : 'none',
            color: isActive ? 'blue' : 'black'
          })}>About</NavLink>
          <NavLink to="/contact" style={({ isActive }) => ({
            marginRight: '1rem',
            textDecoration: isActive ? 'underline' : 'none',
            color: isActive ? 'blue' : 'black'
          })}>Contact</NavLink>
        </nav>


       <div style={{ position: 'absolute', right: 16, top: 12 }}>
          {user ? (
            <>
              <span style={{ marginRight: 12 }}>Hi, {user.username}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </header>

      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  )
}
