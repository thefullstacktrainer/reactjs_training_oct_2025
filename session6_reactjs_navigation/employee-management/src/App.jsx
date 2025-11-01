import { Link, Routes, Route, NavLink } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
function App() {

  return (
    <>
      <div style={{ padding: '2rem' }}>
        <h1>Employee Management Application</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <NavLink to="/" style={({isActive}) => ({
            marginRight: '1rem',
            textDecoration: isActive ? 'underline' : 'none',
            color: isActive ? 'blue' : 'black'
          })}>Home</NavLink>
          <NavLink to="/about" style={({isActive}) => ({
            marginRight: '1rem',
            textDecoration: isActive ? 'underline' : 'none',
            color: isActive ? 'blue' : 'black'
          })}>About</NavLink>
          <NavLink to="/contact" style={({isActive}) => ({
            marginRight: '1rem',
            textDecoration: isActive ? 'underline' : 'none',
            color: isActive ? 'blue' : 'black'
          })}>Contact</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  )
}

export default App
