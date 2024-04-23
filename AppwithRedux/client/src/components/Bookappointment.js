import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Alert} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Bookappointment.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Bookappointment() {


    let navigate= useNavigate()
    let {currentUser,loginStatus}=useSelector(state=>state.userLogin)
    let [error,setError]=useState('')
    let {register,handleSubmit,formState:{errors}}=useForm()
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setService] = useState('');
    const [selectedLocation, setLocation] = useState('');
    const [timeslots,setTimeslots]=useState([])
    // State to store the selected option
    const [selectedOption, setSelectedOption] = useState(""); 
    // Get today's date
    const today = new Date();
    let [alert,setAlert] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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


    useEffect(()=>
    {
        // Check if all inputs are provided
        if(selectedService&&selectedLocation&&selectedDate)
        {
            // retrieve slots according to the inputs
            getallslots(selectedService,selectedLocation,selectedDate)
        }
    },[selectedService,selectedLocation,selectedDate])

    async function getallslots(selectedService,selectedLocation,selectedDate)
    {
        try
        {
            // console.log(selectedService,selectedLocation,selectedDate)
            let slots = await axios.get(`http://localhost:5000/user-api/getallslots?date=${selectedDate}&location=${selectedLocation}&service=${selectedService}`)
            setTimeslots(slots.data.payload)
        }
        catch(err)
        {
            setError(err.message)
        }
    }


    async function formSubmit(data)
    {
        // store in local api
        try
        {
            let username = currentUser.username
            data.appointment_date = selectedDate
            let petname = currentUser.petdetails[0].petname
            let appointment_time = selectedOption
            data = {username,petname,...data,appointment_time}
            let booked = await axios.post(`http://localhost:5000/user-api/bookappointment`,data)
            if(booked.data.message==="APPOINTMENT HAS BEEN BOOKED")
            {
                setAlert(booked.data.message)
                handleShow()
            }
            else
            {
                setError(booked.data.message)
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    }
    
    async function close()
    {
        navigate('/home/appointment')
    }

return (
    <div>
        <h1 className='text-center text-dark fs-1 p-2' id='health'>BOOK APPOINTMENT</h1>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
        <form className='p-3 ' onSubmit={handleSubmit(formSubmit)}>
            <div className='row'>

                <div className='col-sm-6 col-md-4 col-xl-4'>
                    <div>
                        <label className='fw-bold form-label' htmlFor='date'>SELECT DATE <span className='text-danger fs-3'>*</span>:</label>
                    </div>
                    <div className='date-picker-container text-center'>
                        <input type="hidden"  {...register('appointment_date')} value={selectedDate} />
                        <DatePicker
                            className='m-1 text-secondary fw-bold form-control border border-secondary'
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            minDate={today}
                            inline // Display the calendar inline
                            style={{  width: '2000px', height: '400px' }}
                        />
                    </div>
                    {errors.date?.type==='required'&&<p className='text-danger fw-bold text-center'>*DATE needs to be SELECTED*</p>}
                </div>

                <div className='col-sm-6 col-md-4 col-xl-4 text-start'>
                    <div className='pt-4'>
                        {
                            loginStatus===true&&
                            <label className='fw-bold form-label'>PETNAME:<span className='text-secondary fs-6 border border-secondary rounded m-2 p-1'>{currentUser.petdetails[0].petname}</span></label>
                        }
                    </div>
                        <div>
                        <label className='fw-bold form-label' htmlFor='service'>SELECT SERVICE TYPE <span className='text-danger fs-3'>*</span>:</label>
                        <select {...register('appointment_service',{required:true})} className='m-1 text-secondary fw-bold form-control border border-secondary' value={selectedService} onChange={(e) => setService(e.target.value)} id='service' >
                            <option value=''>--SELECT--</option>
                            <option value='HEALTH CHECK UP'>HEALTH CHECK UP</option>
                            <option value='GROOMING'>GROOMING</option>
                            <option value='TRAINING'>TRAINING</option>
                        </select>
                        {errors.service?.type==='required'&&<p className='text-danger fw-bold text-center'>*SERVICE needs to be SELECTED*</p>}
                        </div>
                        <div >
                        <label className='fw-bold form-label' htmlFor='location'>SELECT LOCATION <span className='text-danger fs-3'>*</span>:</label>
                        <select {...register('appointment_location',{required:true})} className='m-1 text-secondary fw-bold form-control border border-secondary' value={selectedLocation} onChange={(e) => setLocation(e.target.value)} id='location' >
                            <option value=''>--SELECT--</option>
                            <option value='BANGALORE'>BANGALORE</option>
                            <option value='CHENNAI'>CHENNAI</option>
                            <option value='HYDERABAD'>HYDERABAD</option>
                            <option value='VISAKHAPATNAM'>VISAKHAPATNAM</option>
                        </select>
                        {errors.location?.type==='required'&&<p className='text-danger fw-bold text-center'>*LOCATION needs to be SELECTED*</p>}
                        </div>
                            </div>


<div className='col-sm-12 col-md-4 col-xl-4 p-3 '>
  {timeslots.length !== 0 && (
    <div className=''>
      <label className='fw-bold form-label' htmlFor='time'>SELECT TIME SLOT <span className='text-danger fs-3'>*</span>:</label>
      <div className='row row-cols-4 row-cols-md-4 row-cols-lg-4'>
        {timeslots.map((slot, index) => (
          <div className='col' key={index}>
            {slot.appointment_status === 'available' ? (
              <div className='text-center p-2'>
                <input
                  type='checkbox'
                  value={slot.appointment_time}
                  checked={selectedOption === slot.appointment_time}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <label>{slot.appointment_time}</label>
              </div>
            ) : (
              <div className='text-center p-2'>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SLOT UNAVAILABLE</Tooltip>}>
                    <input type='checkbox' disabled />
                </OverlayTrigger>
                <label >{slot.appointment_time}</label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )}
</div>


            </div>
            
            
            {errors.time&&<p className='text-danger fw-bold text-center'>*TIME needs to be SELECTED*</p>}

{
    loginStatus===false?
    <>
        {/* <div className='text-center'>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SELECTS</Tooltip>}>
                <Button className='btn btn-success' disabled={true}>BOOK</Button>
            </OverlayTrigger>  
        </div>   */}
        <div className='text-center'>
            <Button className='btn btn-success' type='submit' disabled >BOOK</Button>
            <p className='text-danger'>LOGIN TO BOOK YOUR APPOINTMENT</p>
        </div>
    </>
    :
    <>
    {!selectedOption?
            <div className='text-center'>
                <Button className='btn btn-success' disabled={true}>BOOK</Button>
                <p className='text-danger'>SELECT ALL <span className='text-danger fs-3'>*</span> FIELDS</p>
            </div>:
            <div className='text-center'>
                <button className='btn btn-success' type='submit' disabled={!selectedOption}>BOOK</button>
            </div>
    }
    </>
}

            
            
        </form>
            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>APPOINTMENT BOOKED SUCCESSFULLY</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
            <Button variant="success" onClick={close}>
                OK
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Bookappointment
