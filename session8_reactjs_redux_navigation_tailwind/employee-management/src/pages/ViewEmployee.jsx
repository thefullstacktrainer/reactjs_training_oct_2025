import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext.jsx";
import Toast from "../components/Toast.jsx";

export default function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, deleteEmployee } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (Array.isArray(employees)) {
      const found = employees.find((emp) => String(emp.id) === String(id));
      setEmployee(found || null);
      setLoading(false);
    }
  }, [employees, id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        <div className="loader mx-auto mb-2"></div>
        <p>Loading employee details...</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center mt-10">
        <h3 className="text-red-600 text-lg font-semibold mb-2">
          Employee not found
        </h3>
        <button
          onClick={() => navigate("/employees")}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Back to Employees
        </button>
      </div>
    );
  }

  const handleDelete = async () => {
    setDeleting(true);
    const res = await deleteEmployee(employee.id);
    setDeleting(false);
    setConfirmDelete(false);

    if (res.ok) {
      setToastMessage("Employee deleted successfully");
      setTimeout(() => navigate("/employees"), 1800);
    } else {
      setToastMessage("Failed to delete employee");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8 relative">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm text-center">
            <p className="text-gray-800 mb-4">
              Are you sure you want to delete <strong>{employee.name}</strong>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`px-4 py-2 rounded text-white ${
                  deleting
                    ? "bg-red-400 cursor-wait"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                disabled={deleting}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Employee Details
      </h2>
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
          onClick={() => setConfirmDelete(true)}
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
