import { useState } from 'react'
import './App.css'
import CareerCard from './components/CareerCard'
function App() {

  return (
    <>
      <div>
        <p>Welcome to last session of ReactJS</p>

        {/* <CareerCard title="SE" description="Software Engineer"/>
        <CareerCard title="AI Engineer" description="Build AI models"/> */}
        <CareerCard title="AI Engineer" description="Build AI models"/>
      </div>
    </>
  )
}

export default App
