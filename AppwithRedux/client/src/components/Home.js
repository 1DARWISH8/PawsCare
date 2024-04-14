// useContext hook is imported to read and access data from context
import React, { useState, useEffect } from 'react';
// To navigate from one components to other according to user interaction useNavigate hook is imported from React Router library
import {NavLink, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

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

  return (
    <div>
        <div className='text-center' id='header'>

        <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1712338808/videoframe_2487_czzbmy.png' width="100%"></img>
        {/* <Carousel >
      <Carousel.Item>
        <NavLink to="/store">
          <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1712338808/videoframe_2487_czzbmy.png' width="100%"></img>
        </NavLink>
      </Carousel.Item>
      <Carousel.Item>
        <NavLink to="/home/bookappointment">
            <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1712339150/appointment_w5z8cn.png' width="100%" />
        </NavLink>
      </Carousel.Item>
    </Carousel> */}
        
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
