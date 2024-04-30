import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {Alert} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Accordion from 'react-bootstrap/Accordion';
import '../Myappointments.css'
import './Manageusers.css'
import { NavLink } from 'react-router-dom';

function Checkappointments() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let [appointmentsdata,setAppointmentsdata] = useState('')
  let [error,setError] = useState('')
  let [alert,setAlert] = useState('')

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  // State to store the selected option
  const [selectedOption, setSelectedOption] = useState(""); 
  const today = new Date();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [timeslots,setTimeslots]=useState([])
  const [sortedAppointments, setSortedAppointments] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc')
  
      // Function to handle sorting appointments data based on the selected sort order
      function handleSort() {
        const sorted = [...appointmentsdata].sort((a, b) => {
          const dateA = new Date(a.appointment_date);
          const dateB = new Date(b.appointment_date);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setSortedAppointments(sorted);
      }
    
      useEffect(() => {
        handleSort();
      }, [sortOrder, appointmentsdata]);


  const hideAlert = () =>
  {
      setTimeout(()=>
      {
      setAlert('');
      },5000);
  }

  useState(()=>
  {
      hideAlert();
  },[])

  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const toggleFloatingButton = () => 
  {
    setShowFloatingButton(!showFloatingButton);
  }

  async function formSubmit(data)
  {
    console.log(data)
    let appointments = await axios.post('http://localhost:5000/admin-api/pendingappointment',data)
    setAppointmentsdata(appointments.data.payload)
  }

  async function getallappointments()
  {
    try
    {
      let appointments = await axios.get('http://localhost:5000/admin-api/getallappointments')
      setAppointmentsdata(appointments.data.payload)
    }
    catch(err)
    {
      setError(err.message)
    }
  }

  useEffect(()=>
  (getallappointments),[])

  async function cancelappointment(appointment)
  {
      try
      {
            let cancelled = await axios.post('http://localhost:5000/admin-api/cancelappointment',appointment)
          if(cancelled)
          {
              setAlert(cancelled.data.message)
              getallappointments()
          }
      }
      catch(err)
      {
          setError(err.message)
      }
  }

  async function appointmentcompleted(appointment)
    {
        try
        {
            let complete= await axios.post('http://localhost:5000/admin-api/appointmentcompleted',appointment)
            console.log(complete)
            if (complete.data.message==="APPOINTMENT IS COMPLETE")
            {
              setAlert(complete.data.message)
              getallappointments()
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    async function rescheduleappointment(selectedAppointment)
    {
        try
        {
            let new_appointment_date = selectedDate
            let new_appointment_time = selectedOption
            let appointment_data = {...selectedAppointment,new_appointment_time,new_appointment_date}
            let rescheduled = await axios.post('http://localhost:5000/admin-api/rescheduleappointment',appointment_data)
            if(rescheduled.data.message==="APPOINTMENT RESCHEDULED SUCCESSFULLY")
            {
                setAlert(rescheduled.data.message)
                handleClose()
                getallappointments()
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    useEffect(()=>
    {
        if (selectedAppointment)
        {
            if(selectedAppointment.appointment_service&&selectedAppointment.appointment_location&&selectedDate)
                {
                    getallslots(selectedAppointment.appointment_service,selectedAppointment.appointment_location,selectedDate)
                }
        }
    },[selectedDate])

    async function getallslots(selectedService,selectedLocation,selectedDate)
    {
        try
        {
            // console.log(selectedService,selectedLocation,selectedDate)
            let slots = await axios.get(`http://localhost:5000/user-api/getallslots?date=${selectedDate}&location=${selectedAppointment.appointment_location}&service=${selectedAppointment.appointment_service}`)
            setTimeslots(slots.data.payload)
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    const handleRescheduleClick = (appointment) => {
        setSelectedAppointment(appointment); // Set the selected appointment
        handleShow(); // Show the modal
    };


  return (
    <div className='text-center'>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
      



{/* Sort selection dropdown */}
            <div className="mx-5 text-start">
                <label htmlFor="sortOrder" className="m-2">Sort by:</label>
                <select id="sortOrder" className="" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Oldest to Newest</option>
                    <option value="desc">Newest to Oldest</option>
                </select>
            </div>
    {sortedAppointments.length>0?
        <>
            {
                sortedAppointments.map((appointment,index)=>
                (
                    <article key={index} class="postcard light red m-4">
                        {
                            appointment.appointment_service==="HEALTH CHECK UP"&&
                            <img class="postcard__img" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712573019/Health_checkup_docs_itqetq.png" alt="Image Title" />	
                        }
                        {
                            appointment.appointment_service==="GROOMING"&&
                            <img class="postcard__img" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712573257/dog_training_eskdcl.jpg" alt="Image Title" />
                        }
                        {
                            appointment.appointment_service==="TRAINING"&&
                            <img class="postcard__img" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712573466/cat_grooming_bskql7.jpg" alt="Image Title" />	
                        }
                        <div class="postcard__text t-dark">
                            <h1 class="postcard__title red">{appointment.appointment_service}</h1>
                            <div class="postcard__subtitle small">
                                {/* <time datetime="2020-05-25 12:00:00"> */}
                                    <div className='text-start'>
                                        <i class="fas fa-calendar-alt"></i><span className='fw-bold m-2'>APPOINTMENT DATE:</span>{appointment.appointment_date}
                                    </div>
                                    <div className='text-start'>
                                        <i class="fas fa-clock "></i><span className='fw-bold m-2'>APPOINTMENT TIME:</span>{appointment.appointment_time}
                                    </div>
                                    <div className='text-start'>
                                        <i class="fas fa-map-marker-alt "></i><span className='fw-bold m-2'>APPOINTMENT LOCATION:</span>{appointment.appointment_location},PawsCare
                                    </div>
                                {/* </time> */}
                            </div>
                            <div class="postcard__bar"></div>
                            <div class="postcard__preview-txt">
                            STATUS:
                                {appointment.appointment_status === "CANCELLED" && <span className='text-danger fw-bold m-2'>
                                    {appointment.appointment_status} 
                                        <span className='m-2 text-primary'>
                                            By {appointment.cancelled_by}
                                        </span>
                                    </span>}
                                {appointment.appointment_status === "COMPLETED" && <span className='text-success fw-bold m-2'>{appointment.appointment_status}</span>}
                                {(appointment.appointment_status !== "COMPLETED" && appointment.appointment_status !== "CANCELLED") && <span className='text-primary fw-bold m-2'>{appointment.appointment_status}</span>}
                            </div>
                            <div class="postcard__preview-txt">
                            BOOKED BY:
                                <span className='fw-bold m-2'>
                                    {appointment.username}
                                </span> 
                            </div>
                            <div class="postcard__preview-txt">
                            PET NAME:
                                <span className='fw-bold m-2'>
                                    {appointment.petname}
                                </span> 
                            </div>
                            <ul class="postcard__tagbox">
                            {appointment.appointment_status==="PENDING"&&
                                            <>
                                            <button className='btn btn-danger m-2' onClick={()=>cancelappointment(appointment)}>CANCEL APPOINTMENT</button>
                                            <button className='btn btn-primary m-2' onClick={() => handleRescheduleClick(appointment)}>RESCHEDULE APPOINTMENT</button>
                                            <button className='btn btn-success m-2' onClick={()=>appointmentcompleted(appointment)}>COMPLETED</button>
                                            </>
                            }
                                {/* <li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
                                <li class="tag__item play blue"><i class="fas fa-clock mr-2"></i>55 mins.</li>
                                <li class="tag__item play red">
                                    <a href="#"><i class="fas fa-play mr-2"></i>Play Episode</a>
                                </li> */}
                            </ul>
                        </div>
                    </article>
                ))
            }
    <div className="hover-container">
        <button className="stickyButton" onClick={toggleFloatingButton}>
        <i className="fas fa-plus rotated"></i>
      </button>
      {showFloatingButton && (
      <div  onClick={toggleFloatingButton}>
        <NavLink className="floatingButton btn" to="/admin/bookuserappointment">
            BOOK APPOINTMENT
        </NavLink>
      </div>
      )}
    </div>
      </>:
      <>
      <h5>NO APPOINTMENTS TO SHOW</h5>
      </>
        }
      <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title> Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p><span className='fw-bold'>Previous Appointment Details</span> 
            <p><span className='fw-bold'>Date:</span>{selectedAppointment && selectedAppointment.appointment_date}
            <p><span className='fw-bold'>Time:</span>{selectedAppointment && selectedAppointment.appointment_time}</p>
            </p>
            
        </p>
            <label className='text-center fw-bold form-label' htmlFor='date'>SELECT DATE:</label>
        <div className='text-center'>
            <input type="hidden"  {...register('new_appointment_date')} value={selectedDate} />
            <DatePicker
                className='m-1 text-secondary fw-bold form-control border border-secondary'
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={today}
                inline // Display the calendar inline
                autoFocus
            />
        </div>
        {
                timeslots.length!==0 &&
                <div className='sm-3' >
                <label className='text-center fw-bold form-label' htmlFor='time'>SELECT TIME:</label>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className='fw-bold'>SELECT TIME SLOT</Accordion.Header>
                        <Accordion.Body>
                        {
                            timeslots.map((slot,index)=>
                            (
                                <>
                                {slot.appointment_status==='available'?
                                <div className='text-center' key={index}>
                                {/* <button type='button' className={`btn btn-light m-2 ${clickedButton === slot.appointment_time ? 'btn-primary':''}`} 
                                onClick={() => handleOptionClick(slot.appointment_time)}>
                                    {slot.appointment_time}
                                </button> */}
                                <label>
                                    <input 
                                    type='checkbox' 
                                    value={slot.appointment_time}
                                    checked={selectedOption === slot.appointment_time}
                                    onChange={(e)=>setSelectedOption(e.target.value)}/>
                                    {slot.appointment_time}
                                </label>
                                </div>
                                :
                                <div className='text-center' key={index}>
                                {/* <button className='btn btn-light m-2' disabled>
                                    {slot.appointment_time}
                                </button> */}
                                <label>
                                    <input type="checkbox" disabled/>
                                    {slot.appointment_time}
                                </label>
                                </div>
                                }
                                </>
                            ))
                        }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            }
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
            Cancel
            </Button>
            <Button variant="primary" onClick={()=>rescheduleappointment(selectedAppointment)} disabled={!selectedOption}>
            RESCHEDULE
            </Button>
        </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Checkappointments
