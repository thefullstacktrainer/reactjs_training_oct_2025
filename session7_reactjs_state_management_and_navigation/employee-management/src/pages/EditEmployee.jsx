import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { EmployeeContext } from '../context/EmployeeContext.jsx';

export default function EditEmployee() {
  const { id } = useParams();
  const { employees } = useContext(EmployeeContext);
  const { updateEmployee } = useContext(EmployeeContext); 
  const navigate = useNavigate();

  const existing = employees.find((emp) => emp.id === id);

  const [formData, setFormData] = useState(existing || {});

  useEffect(() => {
    if (!existing) navigate('/employees');
  }, [existing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateEmployee(id, formData)
    navigate(`/employees/${id}`);
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Role: </label>
          <input
            type="text"
            name="role"
            value={formData.role || ''}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Department: </label>
          <input
            type="text"
            name="department"
            value={formData.department || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}



