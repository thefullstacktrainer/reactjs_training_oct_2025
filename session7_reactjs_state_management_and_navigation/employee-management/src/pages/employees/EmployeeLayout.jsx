import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export default function EmployeeLayout() {
    return (
        <div>
            <h2>
                Employee Section
            </h2>
            <nav style={{ marginBottom: '1rem' }}>
                <NavLink to="/employees" style={({ isActive }) => ({
                    marginRight: '1rem',
                    textDecoration: isActive ? 'underline' : 'none',
                    color: isActive ? 'blue' : 'black'
                })}>All Employees</NavLink>
                <NavLink to="/employees/stats" style={({ isActive }) => ({
                    marginRight: '1rem',
                    textDecoration: isActive ? 'underline' : 'none',
                    color: isActive ? 'blue' : 'black'
                })}>Stats</NavLink>
            </nav>
            <Outlet/>
        </div>
    )
}
