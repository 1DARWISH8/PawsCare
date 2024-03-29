import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
// logo image is imported from the images folder
import logo from "../images/pawscarelogo.png"
// userLoginContext is imported, to use the created context store
import { userLoginContext } from '../contexts/userLoginContext'
import './Header.css'

function Header() {

  // userLoginStatus from the context store is used
  let [ , ,userLoginStatus]=useContext(userLoginContext)


  return (
        <div>
            <nav className="navbar">
              <NavLink className='nav-link fw-bold fs-5' id='pawscare' to='/home'><img width='70px' src={logo} alt='logo'/>PAWS CARE</NavLink>
                {/* userLoginStaus state is being to used to check if the user is logged in or not */}
                {userLoginStatus===false?
              <>
              {/* if user is not logged in then by conditional rendering the header of the app changes */}
              <div >
                <ul className="nav justify-content-end">
                  <li className='nav-item '>
                    <NavLink className='nav-link' id='icon' to=''><i className="bi bi-house-door-fill"></i><span>HOME</span></NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' id='icon' to='/store/food'><i className="bi bi-shop"></i>STORE</NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' id='icon' to='/getstarted'>GET STARTED</NavLink>
                  </li>
                </ul>
              </div>
              </>:
              <>
              {/* when the user is logged in the corresponding header is dynamically rendered */}
              <div>
              <ul className="nav justify-content-end">
                <li className='nav-item '>
                  <NavLink className='nav-link' id='icon' to=''><i className="bi bi-house-door-fill"></i>HOME</NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' id='icon' to='/store/food'><i className="bi bi-shop"></i>STORE</NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-link' id='icon' to='profile'>PROFILE<i className="bi bi-person-circle"></i></NavLink>
                </li>
              </ul>
              </div>
              </>}
            </nav>
        </div>    
  )
}

export default Header
