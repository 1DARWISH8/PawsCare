import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// logo image is imported from the images folder
import logo from "../images/pawscarelogo.png"
// userLoginContext is imported, to use the created context store
import './Header.css'
import {useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown, faHome, faUser, faShoppingCart, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Dropdown.css';

function Header() {
  // import userloginSlice from reducer store
  let {currentUser,loginStatus} = useSelector(state=>state.userLogin)

        const [isOpen, setIsOpen] = useState(false);
    
      const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const closeDropdown = () => {
        setIsOpen(false);
      };


  return (
        <div>
            <nav className="navbar">
              <NavLink className='nav-link fw-bold fs-5' id='pawscare' to='/home'><img width='70px' src={logo} alt='logo'/>PAWS CARE</NavLink>
                {/* userLoginStaus state is being to used to check if the user is logged in or not */}
                {loginStatus===false?
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
                {
                  currentUser.userType==='user'&&
                  <>
                    <li className='nav-item '>
                      <NavLink className='nav-link' id='icon' to=''><i className="bi bi-house-door-fill"></i>HOME</NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink className='nav-link' id='icon' to='/home/appointment'><i className="bi bi-calendar"></i>APPOINTMENTS</NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink className='nav-link' id='icon' to='/store/food'><i className="bi bi-shop"></i>STORE</NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink className='nav-link' id='icon' to='/cart'>CART<i className="bi bi-cart4"></i></NavLink>
                    </li>
                    {/* <li className='nav-item'>
                      <NavLink className='nav-link' id='icon' to='profile'>PROFILE<i className="bi bi-person-circle"></i></NavLink>
                    </li> */}
                    <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={closeDropdown}>
                        <button className="dropbtn">
                        <i className="bi bi-person-circle"></i>
                        </button>
                        {isOpen && (
                          <div className="dropdown-content">
                            <NavLink to="/profile" onClick={closeDropdown}>PROFILE</NavLink>
                            <NavLink to="/user/orders" onClick={closeDropdown}>VIEW ORDERS</NavLink>
                            <NavLink to="/user/wishlist" onClick={closeDropdown}>WISHLIST</NavLink>
                          </div>
                        )}
                      </div>
                      <div>
                        
                      </div>
                  </>
                }
                {
                  currentUser.userType==='admin'&&
                  <>
                    <li className='nav-item '>
                      <NavLink className='nav-link' id='icon' to=''><i className="bi bi-house-door-fill"></i>HOME</NavLink>
                    </li>
                    {/* <li className='nav-item' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}> */}
                      {/* <NavLink className='nav-link' id='icon' to='/admin/checkappointment'><i className="bi bi-calendar"></i>APPOINTMENTS</NavLink> */}
                      <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={closeDropdown}>
                        <button className="dropbtn">
                        <i className="bi bi-calendar"></i>APPOINTMENTS
                        </button>
                        {isOpen && (
                          <div className="dropdown-content">
                            <NavLink to="/admin/checkappointment" onClick={closeDropdown}><i className="bi bi-calendar"></i> CHECK APPOINTMENTS</NavLink>
                            <NavLink to="/admin/bookuserappointment" onClick={closeDropdown}><i className="bi bi-calendar"></i> BOOK APPOINTMENTS</NavLink>
                          </div>
                        )}
                      </div>
                    {/* </li> */}
                    <li className='nav-item'>
                      <NavLink className='nav-link' id='icon' to='/admin/managestore'><i className="bi bi-shop"></i>MANAGE STORE</NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink className='nav-link' id='icon' to='/admin/manageusers'>MANAGE USERS<i className="bi bi-person"></i></NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink className='nav-link' id='icon' to='profile'>PROFILE<i className="bi bi-person-circle"></i></NavLink>
                    </li>
                  </>
                }
                
                
              </ul>
              </div>
              </>}
            </nav>
        </div>    
  )
}

export default Header
