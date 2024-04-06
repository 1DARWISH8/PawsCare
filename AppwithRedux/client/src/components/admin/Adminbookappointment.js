import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useSelector} from 'react-redux'
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Alert} from 'react-bootstrap';

function Adminbookappointment() {

    let {selectedUser} = useSelector(state=>state.userselected)
    let [error,setError]=useState('')
    let navigate= useNavigate()
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
            let username = selectedUser.username
            data.appointment_date = selectedDate
            let petname = selectedUser.petdetails[0].petname
            let appointment_time = selectedOption
            data = {username,petname,...data,appointment_time}
            let booked = await axios.post(`http://localhost:5000/admin-api/bookappointment`,data)
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
        navigate('/admin/userprofile')
    }

  return (
    <div>
      <h1 className='text-center fs-3 text-decoration-underline'>BOOK APPOINTMENT</h1>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
        <form className='col-sm-6 mx-auto m-3 p-3 ' onSubmit={handleSubmit(formSubmit)}>
            <div className='sm-3 pt-4'>
            <label className='text-center fw-bold form-label'>PETNAME:<span className='text-secondary fs-6 border border-secondary rounded m-2 p-1'>{selectedUser.petdetails[0].petname}</span></label>
            </div>
            <div className='sm-3 '>
            <label className='text-center fw-bold form-label' htmlFor='service'>SELECT SERVICE TYPE:</label>
            <select {...register('appointment_service',{required:true})} className='m-1 text-secondary fw-bold form-control border border-secondary' value={selectedService} onChange={(e) => setService(e.target.value)} id='service' >
                <option value=''>--SELECT--</option>
                <option value='HEALTH CHECK UP'>HEALTH CHECK UP</option>
                <option value='GROOMING'>GROOMING</option>
                <option value='TRAINING'>TRAINING</option>
            </select>
            {errors.service?.type==='required'&&<p className='text-danger fw-bold text-center'>*SERVICE needs to be SELECTED*</p>}
            </div>
            <div className='sm-3'>
            <label className='text-center fw-bold form-label' htmlFor='location'>SELECT LOCATION:</label>
            <select {...register('appointment_location',{required:true})} className='m-1 text-secondary fw-bold form-control border border-secondary' value={selectedLocation} onChange={(e) => setLocation(e.target.value)} id='location' >
                <option value=''>--SELECT--</option>
                <option value='BANGALORE'>BANGALORE</option>
                <option value='CHENNAI'>CHENNAI</option>
                <option value='HYDERABAD'>HYDERABAD</option>
                <option value='VISAKHAPATNAM'>VISAKHAPATNAM</option>
            </select>
            {errors.location?.type==='required'&&<p className='text-danger fw-bold text-center'>*LOCATION needs to be SELECTED*</p>}
            </div>
            <label className='text-center fw-bold form-label' htmlFor='date'>SELECT DATE:</label>
            <div className='sm-3 text-center' >
                <input type="hidden"  {...register('appointment_date')} value={selectedDate} />
                <DatePicker
                    className='m-1 text-secondary fw-bold form-control border border-secondary'
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={today}
                    inline // Display the calendar inline
                />
            </div>
            {errors.date?.type==='required'&&<p className='text-danger fw-bold text-center'>*DATE needs to be SELECTED*</p>}
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
            {errors.time&&<p className='text-danger fw-bold text-center'>*TIME needs to be SELECTED*</p>}
            <div className='text-center pt-3'>
            <button className='btn btn-success' type='submit' disabled={!selectedOption}>BOOK</button>
            </div>
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

export default Adminbookappointment
