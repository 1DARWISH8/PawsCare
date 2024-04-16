// useContext hook is imported to read and access data from context
import React, { useState, useEffect } from 'react';
// To navigate from one components to other according to user interaction useNavigate hook is imported from React Router library
import {NavLink, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './Video.css';

// images are imported for the carousel
// import haircut from '../images/haircut.jpg'
// import training from '../images/training.jpg'
// import checkup from '../images/checkup.jpg'

// carousel is imported from the react-bootstrap which was installed using the command "npm i react-bootstrap bootstrap" 
import Carousel from 'react-bootstrap/Carousel';
// outlet which renders components is imported
import {Outlet} from 'react-router-dom'
// styles are imported from the css file
import './Home.css'




function Home() {

  // import userdata and status from userLoginSlice
  let {currentUser,loginStatus} = useSelector(state=>state.userLogin)
  
  // states are imported from the context store
  // useContext is given a userLoginContext
  // let [currentUser,,userLoginStatus]=useContext(userLoginContext)
  // useNavigate() hook is assigned to navigate 
  let navigate= useNavigate()

  // This function is called when the "APPOINTMENT" button is clicked on
  function navigateTo()
  {
    // checks if user is logged in or not
    if (loginStatus)
    {
      //if user is logged in then the page navigates to the appointment page 
      navigate('/home/appointment')
    }
    else
    {
      // if user is not logged in then page navigates to getstarted page
      navigate('/getstarted')
      alert('(SIGN UP) /  (LOG IN) TO BOOK AN APPOINTMENT')
    }
  }

  // this function is called on when "HEALTH" button is clicked
  function toHealth()
  {
    // checks if user is logged in or not
    if (loginStatus)
    {
      // if user is logged in the page renders healthcard
      navigate('/home/healthcard')
    }
    else
    {
      // if user is not logged in then page navigates to getstarted page
      alert('(SIGN UP)  /  (LOG IN) TO VIEW YOUR PET`S HEALTHCARD ')
      navigate('/getstarted')
    }
  }

  async function openstore()
  {
    navigate('/store')
  }

  return (
    <div>
        <div className='text-center' id='header'>

        {/* <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1712338808/videoframe_2487_czzbmy.png' id='shop-now' onClick={openstore} width="100%"></img> */}
        <Carousel >
      <Carousel.Item>
        <NavLink to="/store">
          <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1712338808/videoframe_2487_czzbmy.png' width="100%"></img>
        </NavLink>
      </Carousel.Item>
      <Carousel.Item>
        <NavLink to="/home/bookappointment">
            <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best/vet-services-vtc-pets-img-d-600x417.png' width="100%" />
        </NavLink>
      </Carousel.Item>
    </Carousel>
        
        <h1 className='mt-4 mx-2 text-start fs-4' id='pawscare'>SHOP BY PET :</h1>

  <section class="wrapper">
    <div class="container">
      <div class="row">

        <div class="col-sm-6 col-md-6 col-lg-3 mb-4">  
          <div class="card text-dark card-has-bg click-col" style={{backgroundImage:'url(https://res.cloudinary.com/dozacgfl7/image/upload/v1713275350/shop-by-dog_xodkhv.jpg)'}}>
            <div class="card-img-overlay d-flex flex-column">
              <div class="card-body">
              </div>
              <div class="card-footer">
                <div class="media">
                  <i className="fas fa-dog fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-6 col-lg-3 mb-4">  
          <div class="card text-dark card-has-bg click-col" style={{backgroundImage:'url(https://res.cloudinary.com/dozacgfl7/image/upload/v1713275349/shop-by-cat_c6yuws.jpg)'}}>
            <div class="card-img-overlay d-flex flex-column">
              <div class="card-body">
              </div>
              <div class="card-footer">
                <div class="media">
                  <i className="fas fa-cat fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-6 col-lg-3 mb-4">  
          <div class="card text-dark card-has-bg click-col" style={{backgroundImage:'url(https://res.cloudinary.com/dozacgfl7/image/upload/v1713275349/shop-by-birds_un6hct.jpg)'}}>
            <div class="card-img-overlay d-flex flex-column">
              <div class="card-body">
              </div>
              <div class="card-footer">
                <div class="media">
                  <i className="fas fa-dove fs-1"></i>                
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-6 col-lg-3 mb-4">  
          <div class="card text-dark card-has-bg click-col" style={{backgroundImage:'url(https://res.cloudinary.com/dozacgfl7/image/upload/v1713275349/shop-by-fish_bszpjt.jpg)'}}>
            <div class="card-img-overlay d-flex flex-column">
              <div class="card-body">
              </div>
              <div class="card-footer">
                <div class="media">
                  <i className="fas fa-fish fs-1"></i>                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </section>

          {
            currentUser.userType==='admin'&&
            <>
            <h3>WELCOME, {currentUser.username}</h3>
            <h5>TO DASHBOARD</h5>
            </>
          }
          {
            currentUser.userType === 'user' &&
            <>
              <h4 className='pt-4' id="welcome">Welcome to</h4>
              <h1 className='pt-2' id='intro'>PAWSCARE🌟</h1>
              <div className='fs-3 pt-2 pb-5'> Your {loginStatus===true?<span id='intro'>{currentUser.petdetails[0].petname}</span>:<span>Pet</span>}'s Wellbeing Central! 🐾</div>
            
              <div className="card m-3 mt-2" id='carouselcard'>
          <div className="card-header border-0">
            <div className=' text-center fw-bold'>Explore our premium pet services, including expert health checkups, haircut and training sessions to ensure your pets feel and look their best. 
            </div>          
          </div>
          <div className="card-body" id='appoint'>
            <div className='text-center p-2'>
              {/* button is used to help book appointments */}
              <button className='btn btn-primary fw-bold' onClick={navigateTo}>BOOK APPOINTMENT</button>
            </div>
          </div>
        </div>
          <div className='text-center p-3' id="health">
          At PawsCare Hub, we prioritize your furry companion's health and happiness.
          You can effortlessly register your pet, keeping a digital record of health checkups.
          <div className='pt-4'>
            {/* button is added to dynamically rendered according to the userLoginStatus */}
            <button className='btn btn-success fw-bold' onClick={toHealth}>HEALTH</button>
          </div>
            {/* the component is dynamically rendered in the outlet */}
            <Outlet/>
          </div>
            
            </>
          }
          {/* checks if user is logged in or not and renders the component accordingly */}
        </div>

    </div>
  )
}

export default Home
