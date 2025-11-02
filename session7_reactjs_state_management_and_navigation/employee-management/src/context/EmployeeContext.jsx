import React from 'react'
import { createContext, useState } from 'react'


export const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Ramesh', role: 'Developer', department: 'IT' },
        { id: 2, name: 'Priya', role: 'HR Manager', department: 'Humar Resources' },
        { id: 3, name: 'Kiran', role: 'Accountant', department: 'Finance' }
    ])



    const addEmployee = (emp) => {
        setEmployees([...employees, { ...emp, id: employees.length + 1 }])
    }

    return (<EmployeeContext.Provider value={{ employees, addEmployee }}>
        {children}
    </EmployeeContext.Provider>)

}