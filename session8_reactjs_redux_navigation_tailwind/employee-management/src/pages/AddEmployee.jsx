import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext.jsx";

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const { addEmployee, offlineMode } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.role || !formData.department) {
      setError("Please fill all fields.");
      return;
    }

    setSaving(true);
    await addEmployee(formData);
    setSaving(false);
    navigate("/employees");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      {offlineMode && (
        <div className="bg-yellow-50 text-gray-700 p-2 rounded mb-4 text-sm border border-yellow-200">
          Offline mode active — employees will be stored locally
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add New Employee
      </h2>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter employee name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter role (e.g. Developer)"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter department (e.g. IT)"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full text-white font-medium py-2 rounded ${
            saving
              ? "bg-blue-400 cursor-wait"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}
