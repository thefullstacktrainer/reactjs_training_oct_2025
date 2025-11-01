import { Link } from "react-router-dom"

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
      </div>
    </>
  )
}

export default App
