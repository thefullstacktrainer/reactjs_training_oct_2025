import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext.jsx";

export default function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, deleteEmployee } = useContext(EmployeeContext);

  try {
    const employee = employees.find((emp) => emp.id === id);

    if (!employee) {
      throw new Error("Employee not found!");
    }

    const handleDelete = () => {
      if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
        deleteEmployee(employee.id);
        navigate("/employees");
      }
    };

    return (
      <div>
        <h2>Employee Details</h2>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Department:</strong> {employee.department}</p>

        <div style={{ marginTop: "1rem" }}>
          <Link to={`/employees/${employee.id}/edit`}>
            <button>Edit</button>
          </Link>
          &nbsp;
          <button
            onClick={handleDelete}
            style={{ backgroundColor: "tomato", color: "white" }}
          >
            Delete
          </button>
          &nbsp;
          <button onClick={() => navigate("/employees")}>Back to List</button>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h3 style={{ color: "red" }}>{error.message}</h3>
        <button onClick={() => navigate("/employees")}>Back to Employees</button>
      </div>
    );
  }
}
