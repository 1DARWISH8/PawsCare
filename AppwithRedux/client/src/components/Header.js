import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import './Header.css'
import {useDispatch,useSelector} from 'react-redux'
import './Dropdown.css';
import { logOut } from '../redux/slices/userLoginSlice'
/* Import Bootstrap Icons CSS */
import './Header.css'
import { Navbar, Nav, NavDropdown, Container, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { userCartPromiseStatus } from '../redux/userCartSlice';
import { searchResultsPromiseStatus } from '../redux/slices/searchResultsSlice';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import Login from './Login'
// import Register from './Register'

function Header() {
  // import userloginSlice from reducer store
  let {currentUser,loginStatus} = useSelector(state=>state.userLogin)
  let navigate=useNavigate()
	let dispatch = useDispatch()
  let logo = 'https://res.cloudinary.com/dozacgfl7/image/upload/v1711878050/logo_hjylkr.png'
  let {userCart} = useSelector(state=>state.usercart)

  const [search_word, setSearch_word] = useState('');

  // const [showLogin, setShowLogin] = useState(false);

  // const handleLoginClose = () => setShowLogin(false);
  // const handleLoginShow = () => setShowLogin(true);
  
  // const [showRegister, setShowRegister] = useState(false);

  // const handleRegisterClose = () => setShowRegister(false);
  // const handleRegisterShow = () => setShowRegister(true);

  async function logout()
    {
        await dispatch(logOut())
		    sessionStorage.removeItem('token')        
        navigate('/')
    }

    async function handleSearch(e) {
      e.preventDefault();
    
      if (search_word.trim() !== '') {
        await dispatch(searchResultsPromiseStatus(search_word));
        navigate('/searchshop');
      } else {
        console.log('Search word is empty');
        // ADD ERROR ALERT
      }
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
            <form  onSubmit={handleSearch} >
              <div className="d-flex m-2 border">
              <input
                  type="text"
                  value={search_word}
                  onChange={(e) => setSearch_word(e.target.value)}
                  placeholder="Search..."
                  style={{width:"100%"}}
                />
                <Button type='submit' className='fw-bold text-dark border border-none' style={{ backgroundColor: "#11c739" }}><i class="fas fa-search"></i></Button>
              </div>
            </form>
          </Nav>
          <Nav>
            <NavLink className='nav-link' id='icon' to='/home/appointment'><i className="bi bi-calendar"></i>APPOINTMENTS</NavLink>
            <NavLink className='nav-link' id='icon' to='/contact'><i class="fas fa-headphones headphone-icon"></i>CONTACT US</NavLink>
            <NavLink className='nav-link' id='icon' to='/register'>REGISTER</NavLink>
            <NavLink className='nav-link' id='icon' to='/login'>LOG IN</NavLink>
            {/* <Button className='nav-link' id='icon' onClick={handleLoginShow}>
              Login
            </Button>
            <Button className='nav-link' id='icon' onClick={handleRegisterShow}>
              Register
            </Button> */}
          </Nav>
          </Navbar.Collapse>
          </Navbar>  

          {/* <Offcanvas show={showLogin} onHide={handleLoginClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id='health'>LOGIN</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Login/>
        </Offcanvas.Body>
      </Offcanvas>
  
          <Offcanvas show={showRegister} onHide={handleRegisterClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id='health'>REGISTER</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Register/>
        </Offcanvas.Body>
      </Offcanvas> */}
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
              <form  onSubmit={handleSearch} >
                <div className="d-flex m-2 border">
                <input
                    type="text"
                    value={search_word}
                    onChange={(e) => setSearch_word(e.target.value)}
                    placeholder="Search..."
                    style={{width:"100%"}}
                  />
                  <Button type='submit' className='fw-bold text-dark border border-none' style={{ backgroundColor: "#11c739" }}><i class="fas fa-search"></i></Button>
                </div>
              </form>
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
              <NavLink className='nav-link mx-2' id='icon' to='/store'><i className="bi bi-calendar"></i>STORE</NavLink>
            <NavLink className='nav-link mx-2' id='icon' to='/cart'><i className="bi bi-cart4"></i><span>{userCart.length}</span></NavLink>
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
            <NavLink className='nav-link fw-bold fs-5' id='pawscare' to='/dashboard'><img width='70px' src={logo} alt='logo'/>PAWS CARE</NavLink>
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
