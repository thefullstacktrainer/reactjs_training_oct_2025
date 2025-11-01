import { Link, Routes, Route, NavLink } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import AppLayout from "./layouts/AppLayout"
import EmployeeList from "./pages/EmployeeList"

function App() {

  return (
    <>
      <div style={{ padding: '2rem' }}>
        
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />}/>
            <Route path="/employees" element={<EmployeeList />}/>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
