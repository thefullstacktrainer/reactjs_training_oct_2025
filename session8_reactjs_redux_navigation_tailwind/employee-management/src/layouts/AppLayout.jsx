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
      <header className="bg-blue-800 text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center shadow-md">
        <h1 className="text-xl font-semibold mb-2 md:mb-0">Employee Management</h1>
        <nav className="space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "underline" : ""}>Home</NavLink>
          <NavLink to="/employees" className={({ isActive }) => isActive ? "underline" : ""}>Employees</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "underline" : ""}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "underline" : ""}>Contact</NavLink>
        </nav>
        {user ? (
          <div className="mt-3 md:mt-0">
            <span className="mr-3">Hi, {user.username}</span>
            <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="bg-green-600 px-3 py-1 rounded text-sm">Login</NavLink>
        )}
      </header>


      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
