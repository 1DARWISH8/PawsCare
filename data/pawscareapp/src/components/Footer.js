import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div className=''>
      <ul className="nav justify-content-center">
        <li className='nav-item '>
          <NavLink className='nav-link fw-bold' to='contact'>CONTACT US</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Footer
