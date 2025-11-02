import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AppLayout() {
  const { user, logout } = useAuth();

  const navLinkStyle = ({ isActive }) => ({
    marginRight: '1rem',
    textDecoration: isActive ? 'underline' : 'none',
    color: isActive ? 'blue' : 'black',
  });

  return (
    <div>
      <header
        style={{
          background: 'rgb(88 133 178)',
          color: 'white',
          padding: '1rem',
          position: 'relative',
        }}
      >
        <h1>Employee Management Application</h1>

        <nav style={{ marginBottom: '1rem' }}>
          <NavLink to="/" style={navLinkStyle}>Home</NavLink>
          <NavLink to="/employees" style={navLinkStyle}>Employees</NavLink>
          <NavLink to="/about" style={navLinkStyle}>About</NavLink>
          <NavLink to="/contact" style={navLinkStyle}>Contact</NavLink>
        </nav>

        <div style={{ position: 'absolute', top: '1rem', right: '2rem' }}>
          {user ? (
            <>
              <span style={{ marginRight: '1rem' }}>Hi, {user.username}</span>
              <button
                onClick={logout}
                style={{
                  background: '#d9534f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" style={{ color: 'white' }}>
              Login
            </NavLink>
          )}
        </div>
      </header>

      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
