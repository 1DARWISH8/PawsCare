// useContext hook is imported to read and access data from context
import React, { useRef, useEffect } from 'react';
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


  const videoRefs = [useRef(null), useRef(null), useRef(null),useRef(null)];

  const handleVideoEnded = (index) => {
    const video = videoRefs[index].current;
    video.currentTime = 0; // Reset video to start
    video.play(); // Start playing again
  };

  return (
    <section>
        <div className='text-center' id='header'>

          <NavLink to='/store'>
            <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1712338808/videoframe_2487_czzbmy.png' id='home-banner' width="100%"  ></img>
          </NavLink>

      <div className='row p-2'>
        <div className='col-sm-6'>
            <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1713770760/Welcome_nkfygs.gif' width='100%'/>
        </div>
        <div className="col-sm-6">
          <Carousel variant='dark' id='carousel-banner'>
          <Carousel.Item>
              <NavLink to='/home/appointment'>
                <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1713759781/Screenshot_2024-04-22_085431_vc8kge.png' width="100%"/>
              </NavLink>
          </Carousel.Item>
          <Carousel.Item>
            <NavLink to='/home/appointment'>
                <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1713758973/Insta_Consultation_Web__pvzjx9.jpg' width="100%" />
            </NavLink>
          </Carousel.Item>
          </Carousel>
        </div>
      </div>


        <div className="carousel-container p-3 pt-0">
        <Carousel  className='p-5' variant='dark'>
        <Carousel.Item onClick={()=>get_products('Pedigree')}>
              <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1713721800/pedigree_nwyrco.webp' width="100%" />
        </Carousel.Item>
        <Carousel.Item onClick={()=>get_products('Henlo')}>
              <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1713721927/henlo-products_ao6ufo.webp' width="100%" />
        </Carousel.Item>
        <Carousel.Item onClick={()=>get_products('Health')}>
              <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1713721927/Suppliements-Banner_d6v6hw.webp' width="100%" />
        </Carousel.Item>
        </Carousel>
      </div>
        
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


  <Carousel  className='p-5' variant='dark'>
    <Carousel.Item onClick={()=>get_products('Treats')}>
      <video ref={videoRefs[0]} width="100%" className='p-2' autoPlay muted onEnded={() => handleVideoEnded(0)}>
        <source src="https://res.cloudinary.com/dozacgfl7/video/upload/v1713721110/2023-09-10-drool-worthy-treats-desktop_zsgb42.mp4" type="video/mp4" />        Your browser does not support the video tag.
      </video>        
    </Carousel.Item>
    <Carousel.Item onClick={()=>get_products('Toys')}>
      <video ref={videoRefs[1]} width="100%" className='p-2' autoPlay muted onEnded={() => handleVideoEnded(1)}>
        <source src="https://res.cloudinary.com/dozacgfl7/video/upload/v1713721109/playful-temptations-desktop_gl4cy5.mp4" type="video/mp4" />        Your browser does not support the video tag.
      </video>        
    </Carousel.Item>
    <Carousel.Item onClick={()=>get_products('CAT')}>
      <video ref={videoRefs[2]} width="100%" className='p-2' autoPlay muted onEnded={() => handleVideoEnded(2)}>
        <source src="https://res.cloudinary.com/dozacgfl7/video/upload/v1713721109/2023-09-10-kitty-pawrty-supplies-desktop_s2tisk.mp4" type="video/mp4" />        Your browser does not support the video tag.
      </video>        
    </Carousel.Item>
  </Carousel>  

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

    <img className='p-3' src='https://images-eu.ssl-images-amazon.com/images/G/31/img22/Baby/cnnjpp1/Baby/Fullr_Amazon_Ads__1500_x_300.jpg' width="100%"/>
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
      <img src='https://www.zigly.com/media/wysiwyg/1920x174.jpg' width="100%"></img>
    </section>          
          {/* checks if user is logged in or not and renders the component accordingly */}
        </div>
    </section>
  )
}

export default Home
