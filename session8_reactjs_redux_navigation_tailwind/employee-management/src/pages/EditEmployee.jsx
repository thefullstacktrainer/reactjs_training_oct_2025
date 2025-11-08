import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../context/EmployeeContext.jsx";

export default function EditEmployee() {
  const { id } = useParams();
  const { employees, updateEmployee, offlineMode } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (Array.isArray(employees) && employees.length > 0) {
      const emp = employees.find((e) => e.id === id);
      if (emp) setFormData(emp);
      else navigate("/employees");
    }
  }, [employees, id, navigate]);

  if (!formData) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p>Loading employee for edit...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(id, formData);
    navigate(`/employees/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      {offlineMode && (
        <div className="bg-yellow-50 text-gray-700 p-2 rounded mb-4 text-sm border border-yellow-200">
          Offline mode active — changes will be stored locally
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(`/employees/${id}`)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
