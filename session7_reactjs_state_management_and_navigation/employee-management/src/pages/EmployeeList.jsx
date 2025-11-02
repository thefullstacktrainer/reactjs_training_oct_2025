import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext.jsx';

export default function EmployeeList() {
  const { employees } = useContext(EmployeeContext);

  return (
    <div>
      <h2>Employee List</h2>
      <NavLink
        to="/employees/add"
        style={{
          display: 'inline-block',
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#003366',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
        }}
      >
        + Add Employee
      </NavLink>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.department}</td>
              <td>
                <NavLink to={`/employees/${emp.id}`}>View</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

