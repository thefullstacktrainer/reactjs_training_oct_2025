import React from 'react'

function CareerCard({title, description}) {
  return (
    <div className='career-card' data-testid="career-card">
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
  )
}

export default CareerCard