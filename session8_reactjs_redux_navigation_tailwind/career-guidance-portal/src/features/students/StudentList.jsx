import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeStudent } from './studentSlice'

function StudentList() {
    const students = useSelector((state) => state.students.list)
    const dispatch = useDispatch()
  return (
    <div>
        <h2>Registered Students</h2>
        <ul>
            {
                students.map((student) => (
                    <li key={student.id}>
                        <span>{student.name}</span>
                         <button onClick={()=> dispatch(removeStudent(student.id))}>
                        Remove
                    </button>
                    </li>
                   
                ))
            }
        </ul>

    </div>
  )
}

export default StudentList