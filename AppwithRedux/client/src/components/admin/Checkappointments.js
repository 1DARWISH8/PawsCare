import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import {Alert} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Accordion from 'react-bootstrap/Accordion';

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
          }
          getallappointments()
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
      {/* <span >
        <form onSubmit={handleSubmit(formSubmit)}>
          <label htmlFor='service' className='fw-bold m-2'>SERVICE:</label>
          <select id='service' {...register('service',{required:true})}>
          <option value=''>SELECT</option>
          <option value='HEALTH CHECK UP'>HEALTH CHECK UP</option>
          <option value='GROOMING'>GROOMING</option>
          <option value='TRAINING'>TRAINING</option>
          </select>
          <label htmlFor='location' className='fw-bold m-2'>LOCATION:</label>
          <select id='location' {...register('location',{required:true})}>
          <option value=''>SELECT</option>
          <option value='BANGALORE'>BANGALORE</option>
          <option value='CHENNAI'>CHENNAI</option>
          <option value='DELHI'>DELHI</option>
          <option value='HYDERABAD'>HYDERABAD</option>
          </select>
          <label htmlFor='appointmentstatus' className='fw-bold m-2'>STATUS:</label>
          <select id='appointmentstatus' {...register('appointmentstatus',{required:true})}>
          <option value=''>SELECT</option>
          <option value='COMPLETE'>COMPLETE</option>
          <option value='PENDING'>PENDING</option>
          <option value='CANCELLED'>CANCELLED</option>
          </select>
          <label className='fw-bold m-2' htmlFor='date'>SELECT DATE:</label>
          <input type='date' id='date' {...register('date',{required:true})}></input>
          <button className='btn btn-secondary m-2' type='submit'>Search</button>
        </form>
      </span> */}

      {appointmentsdata.length?
      <>
        <table>
            <tbody>
                {
                    appointmentsdata.map((appointment,index)=>(
                        <tr key={index}>
                            <Card className='m-3'>
                                <Card.Body>
                                    <Card.Title>
                                        SERVICE:{appointment.service}
                                        <span>
                                            {(appointment.appointment_status!=="CANCELLED" && appointment.appointment_status!=="COMPLETED")?
                                            <>
                                            <button className='btn btn-danger m-2' onClick={()=>cancelappointment(appointment)}>CANCEL</button>
                                            <button className='btn btn-success m-2' onClick={()=>appointmentcompleted(appointment)}>COMPLETED</button>
                                            <button className='btn btn-primary m-2' onClick={() => handleRescheduleClick(appointment)}>RESCHEDULE</button>
                                            </>:
                                            <></>
                                            }
                                        </span>
                                        USER:{appointment.username}
                                    </Card.Title>
                                    <Card.Text>
                                      STATUS:
                                      {appointment.appointment_status === "CANCELLED" && <span className='text-danger'>{appointment.appointment_status}</span>}
                                      {appointment.appointment_status === "COMPLETED" && <span className='text-success'>{appointment.appointment_status}</span>}
                                      {(appointment.appointment_status !== "COMPLETED" && appointment.appointment_status !== "CANCELLED") && <span className='text-primary'>{appointment.appointment_status}</span>}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>APPOINTMENT LOCATION:{appointment.appointment_location},DATE&TIME:{appointment.appointment_date}&{appointment.appointment_time}</Card.Footer>
                            </Card>
                        </tr>
                    ))
                }
            </tbody>
        </table>
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
