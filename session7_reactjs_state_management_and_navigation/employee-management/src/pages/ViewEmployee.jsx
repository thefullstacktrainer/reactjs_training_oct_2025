import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext.jsx';

export default function ViewEmployee() {
  const { id } = useParams();
  const { employees } = useContext(EmployeeContext);

  const employee = employees.find((emp) => emp.id === parseInt(id));

  if (!employee) {
    return (
      <div>
        <h2>Employee not found!</h2>
        <Link to="/employees">Go Back</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <p><strong>ID:</strong> {employee.id}</p>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Department:</strong> {employee.department}</p>

      <div style={{ marginTop: '1rem' }}>
        <Link to={`/employees/${id}/edit`} style={{ marginRight: '1rem' }}>
          Edit
        </Link>
        <Link to="/employees">Back to List</Link>
      </div>
    </div>
  );
}

