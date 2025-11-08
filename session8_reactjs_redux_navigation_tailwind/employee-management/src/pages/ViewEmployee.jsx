import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext.jsx";

export default function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, deleteEmployee, offlineMode } = useContext(EmployeeContext);

  if (!Array.isArray(employees) || employees.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p>Loading employee details...</p>
      </div>
    );
  }

  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return (
      <div className="text-center mt-10">
        <h3 className="text-red-600 text-lg font-semibold mb-2">Employee not found</h3>
        <button
          onClick={() => navigate("/employees")}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Back to Employees
        </button>
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
      {offlineMode && (
        <div className="bg-yellow-50 text-gray-700 p-2 rounded mb-4 text-sm border border-yellow-200">
          Offline mode active — displaying local data
        </div>
      )}

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
