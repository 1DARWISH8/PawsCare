import React, {useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { petProductsPromiseStatus } from '../redux/slices/petProductsSlice';
import { useDispatch } from 'react-redux';

function Footer() {

  let {currentUser,loginStatus} = useSelector(state=>state.userLogin)
  let navigate= useNavigate()
  let dispatch = useDispatch()
  
  useEffect(() => {
    const handleNavLinkClick = () => {
      window.scrollTo(0, 0);
    };

    // Add event listeners to all NavLink elements
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      link.addEventListener('click', handleNavLinkClick);
    });

    // Remove event listeners when the component unmounts
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, []);

  async function get_pet_products(pet)
  {
    try
    {
      await dispatch(petProductsPromiseStatus(pet))
      navigate('/shop')
    }
    catch(err)
    {
      
    }
  }

  return (
        <div className="mt-2">
            {/* Footer */}
            {
              loginStatus?
              <>
                {
              currentUser.userType==="user"?
                <footer className="text-center text-lg-start text-dark" style={{ backgroundColor: "#5cb404" }}>
                  <div className=" p-4 pb-0">
                      <section className="">
                          <div className="row">
                              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                  <h6 className="mb-4 fs-3 fw-bold ">PAWSCARE</h6>
                                  <nav>
                                    Welcome to PawsCare – Your Pet's Wellbeing Central! 🐾
                                    <nav>
                                      At PawsCare Hub, we prioritize your furry companions' health and happiness.
                                    </nav>
                                    Explore our premium pet services, including expert haircuts and pampering sessions to ensure your pets look and feel their best. Our dedicated store offers a delightful array of treats, toys, and essentials, curated with love to cater to every pet's unique needs
                                  </nav>
                              </div>

                              <hr className="w-100 clearfix d-md-none" />
                              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                  <h6 className="text-uppercase mb-4 fw-bold">Useful links</h6>
                                  <p>
                                    <nav>
                                      <NavLink className="text-white text-decoration-none " to="/home/bookappointment">BOOK APPOINTMENT</NavLink>
                                    </nav>
                                  </p>
                                  <p>
                                    <nav>
                                      <NavLink className="text-white text-decoration-none" to="/home/myappointments">MY APPOINTMENTS</NavLink>
                                    </nav>
                                  </p>
                                  <p>
                                    <nav>
                                      <NavLink className="text-white text-decoration-none" to="/profile">PROFILE</NavLink>
                                    </nav>                                </p>
                                  <p>
                                    <nav>
                                      <NavLink className="text-white text-decoration-none" to="contact">CONTACT US</NavLink>
                                    </nav>                                
                                  </p>
                              </div>

                              <hr className="w-100 clearfix d-md-none" />

                              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                  <h6 className="text-uppercase mb-4 fw-bold">SHOP ON PAWSCARE</h6>
                                  <p>
                                    <nav>
                                      <NavLink className="text-dark text-decoration-none" to="/store">STORE</NavLink>
                                    </nav>                                
                                  </p>
                                  <p>
                                    <nav>
                                      <NavLink className="text-dark text-decoration-none" to="/cart">CART</NavLink>
                                    </nav>                                
                                  </p>
                                  <p>
                                    <nav>
                                    <NavLink className="text-dark text-decoration-none" to="/user/wishlist">WISHLIST</NavLink>
                                    </nav>                                
                                  </p>
                                  <p>
                                    <nav>
                                      <NavLink className="text-dark text-decoration-none" to="/user/orders">ORDERS</NavLink>
                                    </nav>                                
                                  </p>
                              </div>
                              


                              <hr className="w-100 clearfix d-md-none" />

                              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                  <h6 className="text-uppercase mb-4 fw-bold">PRODUCTS BY CATEGORY</h6>
                                  <p>
                                    <nav>
                                    <NavLink className="text-white text-decoration-none" onClick={()=>get_pet_products('DOG')}>
                                      <i className="fas fa-dog mr-3"></i> DOG 
                                    </NavLink>                                  
                                    </nav>                                
                                  </p>
                                  <p>
                                  <nav>
                                    <NavLink className="text-white text-decoration-none" onClick={()=>get_pet_products('CAT')}>
                                      <i className="fas fa-cat mr-3"></i> CAT 
                                    </NavLink>
                                  </nav>                               
                                  </p>
                                  <p>
                                  <nav>
                                  <NavLink className="text-white text-decoration-none" onClick={()=>get_pet_products('BIRD')}>
                                      <i className="fas fa-dove mr-3"></i> BIRD 
                                    </NavLink>
                                  </nav>                               
                                  </p>
                                  <p>
                                  <nav>
                                  <NavLink className="text-white text-decoration-none" onClick={()=>get_pet_products('FISH')}>
                                      <i className="fas fa-fish mr-3"></i> FISH 
                                  </NavLink>
                                  </nav>                               
                                  </p>
                              </div>
                          </div>
                      </section>

                      <hr className="my-3" />

                      <section className="p-3 pt-0">
                          <div className="row d-flex align-items-center">
                              <div className="col-md-7 col-lg-8 text-center text-md-start">
                                  <div className="p-3">
                                      © 2023
                                      <NavLink className="p-3 fw-bold text-white text-decoration-none">PawsCare.com</NavLink>
                                  </div>
                              </div>

                              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                  <a className="btn btn-outline-dark btn-floating m-1 text-white" role="button">
                                      <i className="fab fa-facebook-f"></i>
                                  </a>

                                  <a className="btn btn-outline-dark btn-floating m-1 text-white " role="button">
                                      <i className="fab fa-twitter"></i>
                                  </a>

                                  <a className="btn btn-outline-dark btn-floating m-1 text-white" role="button">
                                      <i className="fab fa-google"></i>
                                  </a>

                                  <a className="btn btn-outline-dark btn-floating m-1 text-white" href="www.instagram.com" target="_blank" role="button">
                                      <i className="fab fa-instagram"></i>
                                  </a>
                              </div>
                          </div>
                      </section>
                  </div>
              </footer>
              :
              <footer className="text-center text-lg-start text-dark" style={{ backgroundColor: "#11c739" }}>
                {/* Grid container */}
                <div className=" p-4 pb-0">
                    {/* Section: Links */}
                    <section className="">
                        {/* Grid row */}
                        <div className="row">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="mb-4 fs-3 fw-bold ">PAWSCARE</h6>
                                <nav>
                                  Welcome to PawsCare – Your Pet's Wellbeing Central! 🐾
                                  <nav>
                                    At PawsCare Hub, we prioritize your furry companions' health and happiness.
                                  </nav>
                                  Explore our premium pet services, including expert haircuts and pampering sessions to ensure your pets look and feel their best. Our dedicated store offers a delightful array of treats, toys, and essentials, curated with love to cater to every pet's unique needs
                                </nav>
                            </div>
                            {/* Grid column */}

                            <hr className="w-100 clearfix d-md-none" />
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 fw-bold">APPOINTMENTS</h6>
                                <p>
                                  <nav>
                                    <NavLink className="text-white text-decoration-none " to="/admin/checkappointment">CHECK APPOINTMENTS</NavLink>
                                  </nav>
                                </p>
                                <p>
                                  <nav>
                                    <NavLink className="text-white text-decoration-none" to="/admin/bookuserappointment">BOOK APPOINTMENT</NavLink>
                                  </nav>
                                </p>
                                {/* <p>
                                  <nav>
                                    <NavLink className="text-white text-decoration-none" to="/admin/managestore">MANAGE STORE</NavLink>
                                  </nav>                                </p>
                                <p>
                                  <nav>
                                    <NavLink className="text-white text-decoration-none" to="/admin/manageorders">MANAGE ORDERS</NavLink>
                                  </nav>                                
                                </p> */}
                            </div>

                            {/* Grid column */}
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 fw-bold">STORE</h6>
                                <p>
                                  <nav>
                                    <NavLink className="text-dark text-decoration-none" to="/admin/managestore">STORE PRODUCTS</NavLink>
                                  </nav>                                
                                </p>
                                <p>
                                  <nav>
                                    <NavLink className="text-dark text-decoration-none" to="/admin/deletedproducts">DELETED PRODUCTS</NavLink>
                                  </nav>                                
                                </p>
                                <p>
                                  <nav>
                                    <NavLink className="text-dark text-decoration-none" to="/admin/manageorders">MANAGE ORDERS</NavLink>
                                  </nav>                                
                                </p>
                                {/* <p>
                                  <nav>
                                  <NavLink className="text-dark text-decoration-none" to="/user/wishlist">WISHLIST</NavLink>
                                  </nav>                                
                                </p>
                                <p>
                                  <nav>
                                    <NavLink className="text-dark text-decoration-none" to="/user/orders">ORDERS</NavLink>
                                  </nav>                                
                                </p> */}
                            </div>
                            


                            {/* Grid column */}
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 fw-bold">MANAGE USERS</h6>
                                <p>
                                <nav>
                                  <NavLink className="text-white text-decoration-none" to="/admin/manageusers">
                                    USERS 
                                  </NavLink>                                  
                                </nav>                                
                                </p>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </section>
                    {/* Section: Links */}

                    <hr className="my-3" />

                    {/* Section: Copyright */}
                    <section className="p-3 pt-0">
                        <div className="row d-flex align-items-center">
                            {/* Grid column */}
                            <div className="col-md-7 col-lg-8 text-center text-md-start">
                                {/* Copyright */}
                                <div className="p-3">
                                    © 2023
                                    <NavLink className="p-3 fw-bold text-white text-decoration-none">PawsCare.com</NavLink>
                                </div>
                                {/* Copyright */}
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                {/* Facebook */}
                                <a className="btn btn-outline-dark btn-floating m-1 text-white" role="button">
                                    <i className="fab fa-facebook-f"></i>
                                </a>

                                {/* Twitter */}
                                <a className="btn btn-outline-dark btn-floating m-1 text-white " role="button">
                                    <i className="fab fa-twitter"></i>
                                </a>

                                {/* Google */}
                                <a className="btn btn-outline-dark btn-floating m-1 text-white" role="button">
                                    <i className="fab fa-google"></i>
                                </a>

                                {/* Instagram */}
                                <a className="btn btn-outline-dark btn-floating m-1 text-white" href="www.instagram.com" target="_blank" role="button">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                            {/* Grid column */}
                        </div>
                    </section>
                    {/* Section: Copyright */}
                </div>
                {/* Grid container */}
            </footer>
            }
              </>
              :
              <>
                <footer className="text-center text-lg-start text-dark" style={{ backgroundColor: "#11c739" }}>
                  {/* Grid container */}
                  <div className=" p-4 pb-0">
                      {/* Section: Links */}
                      <section className="">
                          {/* Grid row */}
                          <div className="row">
                              {/* Grid column */}
                              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                  <h6 className="mb-4 fs-3 fw-bold ">PAWSCARE</h6>
                                  <nav>
                                    Welcome to PawsCare – Your Pet's Wellbeing Central! 🐾
                                    <nav>
                                      At PawsCare Hub, we prioritize your furry companions' health and happiness.
                                    </nav>
                                    Explore our premium pet services, including expert haircuts and pampering sessions to ensure your pets look and feel their best. Our dedicated store offers a delightful array of treats, toys, and essentials, curated with love to cater to every pet's unique needs
                                  </nav>
                              </div>
                              {/* Grid column */}

                              <hr className="w-100 clearfix d-md-none" />
                              {/* Grid column */}
                              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                  <h6 className="text-uppercase mb-4 fw-bold">Useful links</h6>
                                  <p>
                                    <nav>
                                      <NavLink className="text-white text-decoration-none " to="/home/bookappointment">BOOK APPOINTMENT</NavLink>
                                    </nav>
                                  </p>
                                  <p>
                                    <nav>
                                      <NavLink className="text-white text-decoration-none" to="/home/myappointments">MY APPOINTMENTS</NavLink>
                                    </nav>
                                  </p>
                                  <p>
                                    <nav>
                                      <NavLink className="text-white text-decoration-none" to="/profile">PROFILE</NavLink>
                                    </nav>                                </p>
                                  <p>
                                    <nav>
                                      <NavLink className="text-white text-decoration-none" to="contact">CONTACT US</NavLink>
                                    </nav>                                
                                  </p>
                              </div>

                              {/* Grid column */}
                              <hr className="w-100 clearfix d-md-none" />

                              {/* Grid column */}
                              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                  <h6 className="text-uppercase mb-4 fw-bold">SHOP ON PAWSCARE</h6>
                                  <p>
                                    <nav>
                                      <NavLink className="text-dark text-decoration-none" to="/store">STORE</NavLink>
                                    </nav>                                
                                  </p>
                                  <p>
                                    <nav>
                                      <NavLink className="text-dark text-decoration-none" to="/cart">CART</NavLink>
                                    </nav>                                
                                  </p>
                                  <p>
                                    <nav>
                                    <NavLink className="text-dark text-decoration-none" to="/user/wishlist">WISHLIST</NavLink>
                                    </nav>                                
                                  </p>
                                  <p>
                                    <nav>
                                      <NavLink className="text-dark text-decoration-none" to="/user/orders">ORDERS</NavLink>
                                    </nav>                                
                                  </p>
                              </div>
                              


                              {/* Grid column */}
                              <hr className="w-100 clearfix d-md-none" />

                              {/* Grid column */}
                              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                  <h6 className="text-uppercase mb-4 fw-bold">PRODUCTS BY CATEGORY</h6>
                                  <p>
                                    <nav>
                                    <NavLink className="text-white text-decoration-none" onClick={()=>get_pet_products('DOG')}>
                                      <i className="fas fa-dog mr-3"></i> DOG 
                                    </NavLink>                                  </nav>                                
                                  </p>
                                  <p>
                                  <nav>
                                    <NavLink className="text-white text-decoration-none" onClick={()=>get_pet_products('CAT')}>
                                      <i className="fas fa-cat mr-3"></i> CAT 
                                    </NavLink>
                                  </nav>                               
                                  </p>
                                  <p>
                                  <nav>
                                  <NavLink className="text-white text-decoration-none" onClick={()=>get_pet_products('BIRD')}>
                                      <i className="fas fa-dove mr-3"></i> BIRD 
                                    </NavLink>
                                  </nav>                               
                                  </p>
                                  <p>
                                  <nav>
                                  <NavLink className="text-white text-decoration-none" onClick={()=>get_pet_products('FISH')}>
                                      <i className="fas fa-fish mr-3"></i> FISH 
                                  </NavLink>
                                  </nav>                               
                                  </p>
                              </div>
                              {/* Grid column */}
                          </div>
                          {/* Grid row */}
                      </section>
                      {/* Section: Links */}

                      <hr className="my-3" />

                      {/* Section: Copyright */}
                      <section className="p-3 pt-0">
                          <div className="row d-flex align-items-center">
                              {/* Grid column */}
                              <div className="col-md-7 col-lg-8 text-center text-md-start">
                                  {/* Copyright */}
                                  <div className="p-3">
                                      © 2023
                                      <NavLink className="p-3 fw-bold text-white text-decoration-none">PawsCare.com</NavLink>
                                  </div>
                                  {/* Copyright */}
                              </div>
                              {/* Grid column */}

                              {/* Grid column */}
                              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                  {/* Facebook */}
                                  <a className="btn btn-outline-dark btn-floating m-1 text-white" role="button">
                                      <i className="fab fa-facebook-f"></i>
                                  </a>

                                  {/* Twitter */}
                                  <a className="btn btn-outline-dark btn-floating m-1 text-white " role="button">
                                      <i className="fab fa-twitter"></i>
                                  </a>

                                  {/* Google */}
                                  <a className="btn btn-outline-dark btn-floating m-1 text-white" role="button">
                                      <i className="fab fa-google"></i>
                                  </a>

                                  {/* Instagram */}
                                  <a className="btn btn-outline-dark btn-floating m-1 text-white" href="www.instagram.com" target="_blank" role="button">
                                      <i className="fab fa-instagram"></i>
                                  </a>
                              </div>
                              {/* Grid column */}
                          </div>
                      </section>
                      {/* Section: Copyright */}
                  </div>
                  {/* Grid container */}
              </footer>
              </>
            }
            
        </div>
        /* End of .container */
    );
}

export default Footer;
