import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext.jsx';

export default function EmployeeList() {
  const { employees } = useContext(EmployeeContext);

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Employee List</h2>
        <NavLink
          to="/employees/add"
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md font-semibold"
        >
          + Add Employee
        </NavLink>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Department</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border">{emp.name}</td>
                <td className="px-4 py-2 border">{emp.role}</td>
                <td className="px-4 py-2 border">{emp.department}</td>
                <td className="px-4 py-2 border">
                  <NavLink
                    to={`/employees/${emp.id}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    View
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
