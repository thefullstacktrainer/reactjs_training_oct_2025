import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext.jsx';

export default function ViewEmployee() {
  const { id } = useParams();
  const { employees, deleteEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const employee = employees.find((emp) => emp.id === id);


  if (!employee) {
    return (
      <div>
        <h2>Employee not found!</h2>
        <Link to="/employees">Go Back</Link>
      </div>
    );
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${employee.name}`)
    if (confirmDelete) {
      deleteEmployee(id);
      navigate('/employees')
    }
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Department:</strong> {employee.department}</p>

      <div style={{ marginTop: '1rem' }}>
        <Link to={`/employees/${id}/edit`} style={{ marginRight: '1rem' }}>
          <button>Edit</button>
        </Link>
        &nbsp;
        <button onClick={handleDelete} style={{ color: 'white', backgroundColor: 'tomato' }}>Delete</button>
        <Link to="/employees" style={{ marginLeft: '1rem' }}>Back to List</Link>
      </div>
    </div>
  );
}

