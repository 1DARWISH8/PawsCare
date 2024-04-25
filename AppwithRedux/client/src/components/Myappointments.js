import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Card from 'react-bootstrap/Card';
import {Alert} from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Accordion from 'react-bootstrap/Accordion';
import './Myappointments.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function Myappointments()
{
    let navigate= useNavigate()
    let {currentUser}=useSelector(state=>state.userLogin)
    let [error,setError]=useState('')
    let [appointmentsdata,setAppointmentsdata]=useState('')
    // console.log(booking)
    let {register,handleSubmit,formState:{errors}}=useForm()
    const [timeslots,setTimeslots]=useState([])
    let [alert,setAlert] = useState('')

    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    // State to store the selected option
    const [selectedOption, setSelectedOption] = useState(""); 
    const today = new Date();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
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

    async function getappointments()
    {
        try
        {
            // setBooking(false)
            appointmentsdata  = await axios.post('http://localhost:5000/user-api/appointments',currentUser)
            appointmentsdata = appointmentsdata.data.payload
            setAppointmentsdata(appointmentsdata)
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    async function bookappointment()
    {
        navigate('/home/bookappointment')
    }

    useEffect(()=>(getappointments),[])

    async function cancelappointment(appointment)
    {
        try
        {
            let cancelled = await axios.post('http://localhost:5000/user-api/cancelappointment',appointment)
            if(cancelled)
            {
                setAlert(cancelled.data.message)
            }
            getappointments()
        }
        catch(err)
        {
            setError(err.message)
        }
    }
    // console.log(timeslots)

    async function rescheduleappointment(selectedAppointment)
    {
        try
        {
            let new_appointment_date = selectedDate
            let new_appointment_time = selectedOption
            let appointment_data = {...selectedAppointment,new_appointment_time,new_appointment_date}
            console.log(appointment_data)
            let rescheduled = await axios.post('http://localhost:5000/user-api/rescheduleappointment',appointment_data)
            console.log(rescheduled)
            if(rescheduled.data.message==="APPOINTMENT RESCHEDULED SUCCESSFULLY")
            {
                setAlert(rescheduled.data.message)
                handleClose()
                getappointments()
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


        <button className='btn btn-warning' onClick={bookappointment}>BOOK APPOINTMENT</button>
{/* Sort selection dropdown */}
            <div className="mx-5 text-start">
                <label htmlFor="sortOrder" className="m-2">Sort by:</label>
                <select id="sortOrder" className="" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Oldest to Newest</option>
                    <option value="desc">Newest to Oldest</option>
                </select>
                </div>
    {sortedAppointments.length&&
        <div>
            {
                sortedAppointments.map((appointment,index)=>
                (
                    <article class="postcard light red m-3">
                        {
                            appointment.appointment_service==="HEALTH CHECK UP"&&
                            <img class="postcard__img" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712573019/Health_checkup_docs_itqetq.png" alt="Image Title" />	
                        }
                        {
                            appointment.appointment_service==="TRAINING"&&
                            <img class="postcard__img" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712573257/dog_training_eskdcl.jpg" alt="Image Title" />
                        }
                        {
                            appointment.appointment_service==="GROOMING"&&
                            <img class="postcard__img" src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712573466/cat_grooming_bskql7.jpg" alt="Image Title" />	
                        }
                        <div class="postcard__text t-dark">
                            <h1 class="postcard__title red">{appointment.appointment_service}</h1>
                            <div class="postcard__subtitle small">
                                    <div className='text-start'>
                                        <i class="fas fa-calendar-alt"></i><span className='fw-bold m-2'>APPOINTMENT DATE:</span>{appointment.booked_appointment_date}
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
                                {appointment.appointment_status === "CANCELLED" && <span className='text-danger fw-bold m-2'>{appointment.appointment_status}</span>}
                                {appointment.appointment_status === "COMPLETED" && <span className='text-success fw-bold m-2'>{appointment.appointment_status}</span>}
                                {(appointment.appointment_status !== "COMPLETED" && appointment.appointment_status !== "CANCELLED") && <span className='text-primary fw-bold m-2'>{appointment.appointment_status}</span>}
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
                                            
                                            </>
                            }
                            </ul>
                        </div>
                    </article>
                ))
            }
        </div>
        
        }


        <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title> Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p><span className='fw-bold'>Previous Appointment Details</span> 
            <p><span className='fw-bold'>Date:</span>{selectedAppointment && selectedAppointment.booked_appointment_date}
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
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SLOT UNAVAILABLE</Tooltip>}>
                                    <input type='checkbox' disabled />
                                </OverlayTrigger>
                                <label>
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
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SLOT UNAVAILABLE</Tooltip>}>
                <Button variant="primary" onClick={()=>rescheduleappointment(selectedAppointment)} disabled={!selectedOption}>
                    RESCHEDULE
                </Button>
            </OverlayTrigger>
        </Modal.Footer>
        </Modal>
    </div>
)
}

export default Myappointments
