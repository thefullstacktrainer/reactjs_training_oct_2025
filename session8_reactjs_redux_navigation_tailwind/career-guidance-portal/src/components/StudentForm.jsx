import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addStudent } from '../features/students/studentSlice'

function StudentForm() {
    const [name,setName] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(name.trim() === '') return;
        const newStudent = {id :Date.now(),name}
        dispatch(addStudent(newStudent))
        setName('')
    }
  return (
   <form onSubmit={handleSubmit}>
    <input type="text" value={name} placeholder='Enter Student Name' onChange={(e) => 
        setName(e.target.value)
    }/>
    <button type="submit">Add Student</button>

   </form>
  )
}

export default StudentForm;