import React from 'react'
import { useContext } from 'react'
import { EmployeeContext } from '../context/EmployeeContext'

export default function EmployeeList() {
    const { employees } = useContext(EmployeeContext)
    return (<>
        <h2>Employee List</h2>
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Department</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp) => (
                    <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.role}</td>
                    <td>{emp.department}</td>
                </tr>

                ))}
            </tbody>
        </table>
    </>

    )
}
