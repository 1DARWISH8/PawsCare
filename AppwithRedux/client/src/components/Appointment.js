import React from 'react'
import { NavLink } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion';
import { Carousel } from 'react-bootstrap';

function Appointment() {

return (
    <div >
        <div className='text-center'>
            {/* <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1712394046/Health_checkup_hukjap.png' width="75%"/> */}
            {/* <NavLink className="btn btn-dark fw-bold" to="/home/bookappointment">BOOK APPOINTMENT</NavLink> */}
        </div>

        <div className="cards">
      <div className="row">

      <div className="col-md-5 mt-2">
          <Carousel id="CarouselTest">
            <Carousel.Item>
              <img className="d-block w-100" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712394046/Health_checkup_hukjap.png" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712397861/dog_grooming_hszxqo.png" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712398173/cat_training_siz65t.png" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712481800/dog_training_fatb1h.png" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712481800/bird_training_lmskfq.png" alt="" />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="col-md-7 px-3">
          <div className="card-block px-6" text-start>
          <div className='text-center'>
            <h4 className="card-title fw-bold m-3 text-dark">Book Your Appointment Today!!! </h4>
                <NavLink className="btn btn-dark fw-bold" to="/home/bookappointment">BOOK APPOINTMENT</NavLink>
            </div>
            <p className="card-text m-2 text-dark" id="health">
                <p>
                    Choose PawsCare for exceptional care and support for your beloved companion.
                </p>
                We provide top-notch pet care services including health checkups, grooming, and training at our world class facilities. 
                Our experienced team ensures personalized attention for your furry friend's needs. From routine checkups to specialized grooming sessions, we're here to keep your pet healthy and happy.
                Book appointments conveniently via phone or online to schedule your pet's next visit. 
                Our certified trainers use positive reinforcement techniques to teach essential skills tailored to your pet's needs. With our comprehensive services, we aim to foster a strong bond between you and your pet while ensuring their well-being. 
            </p>
            <p className="card-text"></p>
            <br />
            
          </div>
        </div>

        
      </div>
    </div>

    <div >
        <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1712381158/appointment_features_gplzwu.png' width="100%"/>
    </div>


        <h4 className='mt-5 mx-2'>Frequently asked questions</h4>
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <h5>
                        How to book an appointment?
                    </h5>
                </Accordion.Header>
                <Accordion.Body>
                    <p>
                        By visting the appointments section, you get the option to book an appointment which upon availed will redirect you to an appointment form where the user can choose the service, the location, the date of appointment and the time slot to book an appointment
                    </p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>
                    <h5>
                        What are the appointment services provided by PawsCare?
                    </h5>
                </Accordion.Header>
                <Accordion.Body>
                    <p>
                        We at PawsCare provide the following services that caters to every need of your pet.
                        <p>
                                1. Health Check Up Services
                                2. Grooming Services
                                3. Training
                        </p>
                        
                    </p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
)
}

export default Appointment
