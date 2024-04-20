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
// react-redux to dispatch actions
import { useDispatch } from 'react-redux';
import { petProductsPromiseStatus } from '../redux/slices/petProductsSlice';
import Image from 'react-bootstrap/Image';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Home() {

  // import userdata and status from userLoginSlice
  let {currentUser,loginStatus} = useSelector(state=>state.userLogin)
  
  // states are imported from the context store
  // useContext is given a userLoginContext
  // let [currentUser,,userLoginStatus]=useContext(userLoginContext)
  // useNavigate() hook is assigned to navigate 
  let navigate= useNavigate()
  // dispatch is assigned to a hook
  let dispatch = useDispatch()

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

  async function get_products(data)
  {
    try
    {
      await dispatch(petProductsPromiseStatus(data))
      navigate('/shop')
    }
    catch(err)
    {
      
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
      {/* <Carousel.Item>
        <NavLink to="/home/bookappointment">
            <img src='https://assets.petco.com/petco/image/upload/f_auto,q_auto:best/vet-services-vtc-pets-img-d-600x417.png' width="100%" />
        </NavLink>
      </Carousel.Item> */}
    </Carousel>

    {
            currentUser.userType === 'user' &&
            <>
              <h4 className='pt-4' id="welcome">Welcome to</h4>
              <h1 className='pt-2' id='intro'>PAWSCARE🌟</h1>
              <div className='fs-3 pt-2 pb-5'> Your {loginStatus===true?<span id='intro'>{currentUser.petdetails[0].petname}</span>:<span>Pet</span>}'s Wellbeing Central! 🐾</div>
            
              {/* <div className="card m-3 mt-2" id='carouselcard'>
          <div className="card-header border-0">
            <div className=' text-center fw-bold'>Explore our premium pet services, including expert health checkups, haircut and training sessions to ensure your pets feel and look their best. 
            </div>          
          </div>
          <div className="card-body" id='appoint'>
            <div className='text-center p-2'>
              <button className='btn btn-primary fw-bold' onClick={navigateTo}>BOOK APPOINTMENT</button>
            </div>
          </div>
        </div>
          <div className='text-center p-3' id="health">
          At PawsCare Hub, we prioritize your furry companion's health and happiness.
          You can effortlessly register your pet, keeping a digital record of health checkups.
          <div className='pt-4'>
            <button className='btn btn-success fw-bold' onClick={toHealth}>HEALTH</button>
          </div>
            <Outlet/>
          </div> */}
            
            </>
          }
        
        <h1 className='mt-4 mx-2 text-start fs-4' id='pawscare'>SHOP BY PET :</h1>

  <section className="wrapper">
    <div className="container">
      <div className="row">

        <div className="col-sm-6 col-md-6 col-lg-2 mb-4">  
          <div className="card text-dark card-has-bg click-col" onClick={()=>get_products('DOG')} style={{backgroundImage:'url(https://res.cloudinary.com/dozacgfl7/image/upload/v1713275350/shop-by-dog_xodkhv.jpg)'}}>
            <div className="card-img-overlay d-flex flex-column">
              <div className="card-body">
              </div>
              <div className="card-footer">
                <div className="media">
                  <i className="fas fa-dog fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-2 mb-4">  
          <div className="card text-dark card-has-bg click-col" onClick={()=>get_products('CAT')} style={{backgroundImage:'url(https://res.cloudinary.com/dozacgfl7/image/upload/v1713275349/shop-by-cat_c6yuws.jpg)'}}>
            <div className="card-img-overlay d-flex flex-column">
              <div className="card-body">
              </div>
              <div className="card-footer">
                <div className="media">
                  <i className="fas fa-cat fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-2 mb-4">  
          <div className="card text-dark card-has-bg click-col" onClick={()=>get_products('BIRD')} style={{backgroundImage:'url(https://res.cloudinary.com/dozacgfl7/image/upload/v1713275349/shop-by-birds_un6hct.jpg)'}}>
            <div className="card-img-overlay d-flex flex-column">
              <div className="card-body">
              </div>
              <div className="card-footer">
                <div className="media">
                  <i className="fas fa-dove fs-1"></i>                
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-2 mb-4">  
          <div className="card text-dark card-has-bg click-col" onClick={()=>get_products('FISH')} style={{backgroundImage:'url(https://res.cloudinary.com/dozacgfl7/image/upload/v1713275349/shop-by-fish_bszpjt.jpg)'}}>
            <div className="card-img-overlay d-flex flex-column">
              <div className="card-body">
              </div>
              <div className="card-footer">
                <div className="media">
                  <i className="fas fa-fish fs-1"></i>                
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-sm-6 col-md-6 col-lg-2 mb-4">  
          <div className="card text-dark card-has-bg click-col" onClick={()=>get_products('HAMSTER')} style={{backgroundImage:'url(https://res.cloudinary.com/dozacgfl7/image/upload/v1713425726/shop-by-hamster_xdkxbl.jpg)'}}>
            <div className="card-img-overlay d-flex flex-column">
              <div className="card-body">
              </div>
              <div className="card-footer">
                <div className="media">
                  <img className='hamster' src='https://res.cloudinary.com/dozacgfl7/image/upload/v1713431896/hamster_mqkyrp.png'></img>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-2 mb-4">  
          <div className="card text-dark card-has-bg click-col" onClick={()=>get_products('TURTLE')} style={{backgroundImage:'url(https://media.istockphoto.com/id/529403903/photo/sea-turtle-isolated.jpg?s=612x612&w=0&k=20&c=fmaEV_RkGjwYH2Pvountl8LSMzopbDltEYX01uKJ6oY=)'}}>
            <div className="card-img-overlay d-flex flex-column">
              <div className="card-body">
              </div>
              <div className="card-footer">
                <div className="media">
                  <img className='turtle' src='https://res.cloudinary.com/dozacgfl7/image/upload/v1713430603/turtle_qtz3r3.png'></img>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>  
    </div>
  </section>

  <h1 className='mt-4 mx-2 text-start fs-4' id='pawscare'>SHOP BY CATEGORY :</h1>

  <section>
      <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Food')} > {/* Adjusted column sizes for responsiveness */}
          <Image src="https://res.cloudinary.com/dozacgfl7/image/upload/v1713610954/food_w1crqv.jpg" id='category-circle'  roundedCircle />
          <h4 className='pt-2' id='category-title'>FOOD</h4>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Treats')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://res.cloudinary.com/dozacgfl7/image/upload/v1713610954/treats_yr70tn.jpg" id='category-circle' roundedCircle />
          <h4 className='pt-2' id='category-title'>TREATS</h4>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Toys')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://res.cloudinary.com/dozacgfl7/image/upload/v1713610658/toys_coesna.jpg" id='category-circle' roundedCircle />
          <h4 className='pt-2' id='category-title'>TOYS</h4>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Health')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://res.cloudinary.com/dozacgfl7/image/upload/v1713634758/health_elgtt4.png" id='category-circle' roundedCircle />
          <h4 className='pt-2' id='category-title'>HEALTH</h4>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Clothing')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://res.cloudinary.com/dozacgfl7/image/upload/v1713607074/apparel_xr7sex.jpg" id='category-circle' roundedCircle />
          <h4 className='pt-2' id='category-title'>CLOTHING</h4>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Grooming')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://res.cloudinary.com/dozacgfl7/image/upload/v1713607075/grooming_no1xef.png" id='category-circle' roundedCircle />
          <h4 className='pt-2' id='category-title'>GROOMING</h4>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Essentials')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://res.cloudinary.com/dozacgfl7/image/upload/v1713607075/essentials_nnudx8.jpg" id='category-circle' roundedCircle />
          <h4 className='pt-2' id='category-title'>ESSENTIALS</h4>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Accessories')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://res.cloudinary.com/dozacgfl7/image/upload/v1713610953/accessories_awzpmr.jpg" id='category-circle' roundedCircle />
          <h4 className='pt-2' id='category-title'>ACCESSORIES</h4>
        </div>
      </div>
    </section>

    <h1 className='mt-4 mx-2 text-start fs-4' id='pawscare'>SHOP BY BRAND :</h1>

    <section>
      <div className='row'>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Pedigree')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Pets/kmargso/Brandfarm-Pets-1_Pedigree.png" id='category-circle' roundedCircle />
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Whiskas')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Pets/Feb-22/NewPetBrandFarm/Brandfarm-Pets-2.png" id='category-circle' roundedCircle />
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Drools')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Pets/kmargso/Brands/Drools_Updated.jpg" id='category-circle' roundedCircle />
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Royal Canin')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Pets/Feb-22/NewPetBrandFarm/Brandfarm-Pets-18.png" id='category-circle' roundedCircle />
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Meat Up')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Pets/Feb-22/NewPetBrandFarm/Brandfarm-Pets-16.png" id='category-circle' roundedCircle />
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Purepet')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Pets/Feb-22/NewPetBrandFarm/Brandfarm-Pets-17.png" id='category-circle' roundedCircle />
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Sheba')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Pets/kmargso/Sheba_Brandsfarm_logo.png" id='category-circle' roundedCircle />
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3  p-4" onClick={()=>get_products('Henlo')}> {/* Adjusted column sizes for responsiveness */}
          <Image src="https://supertails.com/cdn/shop/files/categories-7_1a2c42f0-c38c-4f39-82b6-71a672344875_800x.png?v=1712730222" id='category-circle' roundedCircle />
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
          
          {/* checks if user is logged in or not and renders the component accordingly */}
        </div>
    </div>
  )
}

export default Home
