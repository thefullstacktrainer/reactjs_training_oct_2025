import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../context/EmployeeContext.jsx";
import Toast from "../components/Toast.jsx";

export default function EditEmployee() {
  const { id } = useParams();
  const { employees, updateEmployee, offlineMode, loading } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showRedirectLoading, setShowRedirectLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (Array.isArray(employees) && employees.length > 0) {
      const emp = employees.find((e) => String(e.id) === String(id));
      if (emp) setFormData(emp);
    }
  }, [employees, id]);

  if (loading || !formData) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const updated = await updateEmployee(id, formData);
    setSaving(false);

    setToastMessage("Changes saved successfully");
    setShowRedirectLoading(true);

    setTimeout(() => {
      setToastMessage("");
      setShowRedirectLoading(false);
      navigate(`/employees/${updated.id}`);
    }, 2000);
  };

  return (
    <div className="relative max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}

      {offlineMode && (
        <div className="bg-yellow-50 text-gray-700 p-2 rounded mb-4 text-sm border border-yellow-200">
          Offline mode active — changes stored locally
        </div>
      )}

      {showRedirectLoading && (
        <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center rounded-lg z-40">
          <div className="loader border-4 border-gray-300 border-t-blue-600 rounded-full w-10 h-10 animate-spin mb-2"></div>
          <p className="text-gray-600 text-sm">Redirecting...</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={saving}
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
            disabled={saving}
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
            disabled={saving}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className={`px-4 py-2 rounded text-white ${
              saving ? "bg-green-400 cursor-wait" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
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
