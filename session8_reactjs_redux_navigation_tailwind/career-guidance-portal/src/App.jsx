import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentForm from './components/StudentForm'
import StudentList from './features/students/StudentList'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h2>Career Guidance Portal - Student Registration</h2>
        <StudentForm/>
        <StudentList/>
      </div>
    </>
  )
}

export default App
