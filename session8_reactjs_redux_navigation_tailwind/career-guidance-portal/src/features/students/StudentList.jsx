import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeStudent } from './studentSlice'

function StudentList() {
    const students = useSelector((state) => state.students.list)
    const company = useSelector((state) => state.students.company)
    const dispatch = useDispatch()
    const results = useSelector((state) => state.results.scores)
  return (
    <div>
        <h2>Registered Students for {company}</h2>
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
        {results.map(result => <span> {result}</span>)}

    </div>
  )
}

export default StudentList