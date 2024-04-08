import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import './Header.css'
import {useDispatch,useSelector} from 'react-redux'
import './Dropdown.css';
import { logOut } from '../redux/slices/userLoginSlice'
/* Import Bootstrap Icons CSS */
import './Header.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Offcanvas from 'react-bootstrap/Offcanvas';

function Header() {
  // import userloginSlice from reducer store
  let {currentUser,loginStatus} = useSelector(state=>state.userLogin)
  let navigate=useNavigate()
	let dispatch = useDispatch()
  let logo = 'https://res.cloudinary.com/dozacgfl7/image/upload/v1711878050/logo_hjylkr.png'

      function logout()
    {
        dispatch(logOut())
		    sessionStorage.removeItem('token')        
        navigate('/getstarted')
    }

  return (
    <>
    
      {loginStatus===false?
      <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Navbar.Brand >
          <NavLink className='nav-link fw-bold fs-5' id='pawscare' to='/home'><img width='70px' src={logo} alt='logo'/>PAWS CARE</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Form className="d-flex m-2 border ">
              <Form.Control
                type="search"
                className="me-2 border border-black"
                aria-label="Search"
              />
              <Button className='fw-bold text-dark border border-none' style={{ backgroundColor: "#11c739" }}><i class="fas fa-search"></i></Button>
            </Form>
          </Nav>
          <Nav>
            <NavLink className='nav-link' id='icon' to='/home/appointment'><i className="bi bi-calendar"></i>APPOINTMENTS</NavLink>
            <NavLink className='nav-link' id='icon' to='/cart'><i className="bi bi-cart4"></i>CART</NavLink>
            <NavLink className='nav-link' id='icon' to='/getstarted'>GET STARTED</NavLink>
          </Nav>
          </Navbar.Collapse>
          </Navbar>    
      </>
      :
      <>
      {currentUser.userType==='user'&&
        <>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Navbar.Brand >
          <NavLink className='nav-link fw-bold fs-5' id='pawscare' to='/home'><img width='70px' src={logo} alt='logo'/>PAWS CARE</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Form className="d-flex m-2 border ">
              <Form.Control
                type="search"
                className="me-2 border border-black"
                aria-label="Search"
              />
              <Button className='fw-bold text-dark border border-none' style={{ backgroundColor: "#11c739" }}><i class="fas fa-search"></i></Button>
            </Form>
          </Nav>
          <Nav>
              <NavDropdown title="Profile" className='nav-item mx-2' id="collapsible-nav-dropdown">
                <NavDropdown.Item >
                  <NavLink to="/profile" className='nav-link'>MY ACCOUNT
                  {/* {currentUser.username}<img src={currentUser.profileImageURL} alt='userprofile image' className='rounded-circle m-1' width="40"></img> */}
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <NavLink className='nav-link' to="/home/myappointments" >MY APPOINTMENTS</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <NavLink to="/user/orders" className='nav-link'>VIEW ORDERS</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <NavLink to="/user/wishlist" className='nav-link'>WISHLIST</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item className='bg-danger'>
                  <NavLink className='nav-link  bg-danger text-light fw-bold' onClick={logout}>LOG OUT</NavLink>
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink className='nav-link mx-2' id='icon' to='/home/appointment'><i className="bi bi-calendar"></i>BOOK APPOINTMENT</NavLink>
            <NavLink className='nav-link mx-2' id='icon' to='/cart'><i className="bi bi-cart4"></i>CART</NavLink>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        </>
      }

      {
        currentUser.userType==='admin'&&
        <>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Navbar.Brand >
            <NavLink className='nav-link fw-bold fs-5' id='pawscare' to='/home'><img width='70px' src={logo} alt='logo'/>PAWS CARE</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
                <NavDropdown title="APPOINTMENTS" className='nav-item mx-2' id="collapsible-nav-dropdown">
                  <NavDropdown.Item >
                    <NavLink to="/admin/checkappointment" className='nav-link' ><i className="bi bi-calendar"></i> CHECK APPOINTMENTS</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
                    <NavLink to="/admin/bookuserappointment" className='nav-link' ><i className="bi bi-calendar"></i> BOOK APPOINTMENTS</NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="STORE" className='nav-item mx-2' id="collapsible-nav-dropdown">
                  <NavDropdown.Item >
                  <NavLink to="/admin/managestore" className='nav-link'><i className="bi bi-shop"></i>MANAGE STORE</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
                    <NavLink to="/admin/manageorders" className='nav-link' >MANAGE ORDERS</NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown.Item>
                  <NavLink className='nav-link mx-2' id='icon' to='/admin/manageusers'>MANAGE USERS<i className="bi bi-person"></i></NavLink>
                </NavDropdown.Item>
                <NavDropdown title="PROFILE" className='nav-item mx-2' id="collapsible-nav-dropdown">
                  <NavDropdown.Item className='bg-danger'>
                    <NavLink className='nav-link bg-danger text-light fw-bold' onClick={logout}>
                      LOGOUT
                    </NavLink>                  
                  </NavDropdown.Item>
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
        </>
      }
        
      </>}
      
  
  </>)
}

export default Header
