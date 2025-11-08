import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext.jsx";

export default function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, deleteEmployee } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(employees)) {
      const found = employees.find((emp) => String(emp.id) === String(id));
      setEmployee(found || null);
      setLoading(false);
    }
  }, [employees, id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "#555" }}>
        <p>Loading employee details...</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3 style={{ color: "red" }}>Employee not found</h3>
        <button onClick={() => navigate("/employees")}>Back to Employees</button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      deleteEmployee(employee.id);
      navigate("/employees");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Department:</strong> {employee.department}</p>

      <div className="mt-6 flex gap-3">
        <Link to={`/employees/${employee.id}/edit`}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Edit
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/employees")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}
