import { Link, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
function App() {

  return (
    <>
      <div style={{ padding: '2rem' }}>
        <h1>Employee Management Application</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ marginBottom: '1rem' }}>Home</Link>
          <Link to="/about" style={{ marginBottom: '1rem' }}>About</Link>
          <Link to="/contact" style={{ marginBottom: '1rem' }}>Contact</Link>
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
