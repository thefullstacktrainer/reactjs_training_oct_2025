import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext.jsx';

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
  });

  const { addEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.department) {
      alert('Please fill all fields');
      return;
    }
    addEmployee(formData);
    navigate('/employees');
  };

  return (
    <div>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Role: </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Department: </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}
