import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



function Bookappointment() {


    let navigate= useNavigate()
    let {currentUser}=useSelector(state=>state.userLogin)
    let [error,setError]=useState('')
    let {register,handleSubmit,formState:{errors}}=useForm()
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setService] = useState('');
    const [selectedLocation, setLocation] = useState('');
    const [timeslots,setTimeslots]=useState([])
    // Get today's date
    const today = new Date();


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
    // console.log(timeslots)



    async function formSubmit(data)
    {
        // store in local api
        try
        {
            let username = currentUser.username
            data.appointment_date = selectedDate
            
            let petname = currentUser.petdetails[0].petname
            data = {username,petname,...data}
            console.log(data)
            // let booked = await axios.post(`http://localhost:5000/user-api/bookappointment`,data)
            // if(booked.status===201)
            // {
                //     navigate('/appointment/appointsuccess')
                // }
            }
            catch(err)
            {
                setError(err.message)
            }
        }
        
        // console.log(selectedDate)
    // const today = new Date().toISOString().split('T')[0];

    // const availableTimeSlots = [];
    // for (let hour = 9; hour < 18; hour++)
    // {
    //     for (let minutes = 0 ; minutes < 60; minutes +=30)
    //     {
    //         availableTimeSlots.push
    //         (`${hour.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`);
    //     }
    // }

    // const availableTimeSlots = [];
    // for (let hour = 9; hour <= 19; hour++) {
    // const hour12 = hour > 12 ? hour - 12 : hour;
    // const meridiem = hour >= 12 ? 'PM' : 'AM';
    // availableTimeSlots.push(`${hour12.toString().padStart(2, '0')}:00 ${meridiem}`);
    // availableTimeSlots.push(`${hour12.toString().padStart(2, '0')}:30 ${meridiem}`);
    // }

    async function getappointments()
    {
        try
        {
            navigate('/home/appointment')
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    

return (
    <div>
        <h1 className='text-center fs-3 text-decoration-underline'>BOOK APPOINTMENT</h1>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        <form className='col-sm-6 mx-auto m-3 p-3 ' onSubmit={handleSubmit(formSubmit)}>
        {/* <NavLink className='bg-secondary btn text-white' to='/home'>ᐊ Back</NavLink> */}
        <button className='btn btn-warning' onClick={getappointments}>MY APPOINTMENTS</button>
            <div className='sm-3 pt-4'>
            <label className='text-center fw-bold form-label'>PETNAME:<span className='text-secondary fs-6 border border-secondary rounded m-2 p-1'>{currentUser.petdetails[0].petname}</span></label>
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
            <div className='sm-3' >
                <label className='text-center fw-bold form-label' htmlFor='date'>SELECT DATE:</label>
                {/* <input type='date' id='date' min={today} className='form-control border border-secondary text-secondary fw-bold' on  {...register('date',{required:true})}></input> */}
                <div></div>
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
                                <div className='text-center'>
                                <button className='btn btn-light m-2'>
                                    {slot.appointment_time}
                                </button>
                                </div>
                                :
                                <button className='btn btn-light m-2' disabled>
                                    {slot.appointment_time}
                                </button>
                                }
                                </>
                            ))
                        }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            }
            {errors.time?.type==='required'&&<p className='text-danger fw-bold text-center'>*TIME needs to be SELECTED*</p>}
            <div className='text-center pt-3'>
            <button className='btn btn-success' type='submit'>BOOK</button>
            </div>
        </form>
    </div>
  )
}

export default Bookappointment
