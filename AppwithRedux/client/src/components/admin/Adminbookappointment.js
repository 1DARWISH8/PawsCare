import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import {useSelector} from 'react-redux'

function Adminbookappointment() {

  let {selectedUser} = useSelector(state=>state.userselected)
  let [error,setError]=useState('')
  let navigate= useNavigate()
  let {register,handleSubmit,formState:{errors}}=useForm()

  async function formSubmit(data)
    {
        // store in local api
        try
        {
            let username = selectedUser.username
            let petname = selectedUser.petname
            data = {username,petname,...data}
            // console.log(data)
            let booked = await axios.post(`http://localhost:5000/user-api/bookappointment`,data)
            if(booked.status===201)
            {
                navigate('/admin/checkappointment')
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    const today = new Date().toISOString().split('T')[0];

    const availableTimeSlots = [];
    for (let hour = 9; hour <= 19; hour++) {
    const hour12 = hour > 12 ? hour - 12 : hour;
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    availableTimeSlots.push(`${hour12.toString().padStart(2, '0')}:00 ${meridiem}`);
    availableTimeSlots.push(`${hour12.toString().padStart(2, '0')}:30 ${meridiem}`);
    }

  return (
    <div>
      <h1 className='text-center fs-3 text-decoration-underline'>BOOK APPOINTMENT</h1>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        <form className='col-sm-6 mx-auto m-3 p-3 ' onSubmit={handleSubmit(formSubmit)}>
            <div className='sm-3 pt-4'>
            <label className='text-center fw-bold form-label'>PETNAME:<span className='text-secondary fs-6 border border-secondary rounded m-2 p-1'>{selectedUser.petname}</span></label>
            </div>
            <div className='sm-3 '>
            <label className='text-center fw-bold form-label' htmlFor='service'>SELECT SERVICE TYPE:</label>
            <select className='m-1 text-secondary fw-bold form-control border border-secondary' id='service' {...register('service',{required:true})}>
                <option value=''>--SELECT--</option>
                <option value='HEALTH CHECK UP'>HEALTH CHECK UP</option>
                <option value='GROOMING'>GROOMING</option>
                <option value='TRAINING'>TRAINING</option>
            </select>
            {errors.service?.type==='required'&&<p className='text-danger fw-bold text-center'>*SERVICE needs to be SELECTED*</p>}
            </div>
            <div className='sm-3'>
            <label className='text-center fw-bold form-label' htmlFor='location'>SELECT LOCATION:</label>
            <select className='m-1 text-secondary fw-bold form-control border border-secondary' id='location' {...register('location',{required:true})}>
                <option value=''>--SELECT--</option>
                <option value='BANGALORE'>BANGALORE</option>
                <option value='CHENNAI'>CHENNAI</option>
                <option value='DELHI'>DELHI</option>
                <option value='HYDERABAD'>HYDERABAD</option>
            </select>
            {errors.location?.type==='required'&&<p className='text-danger fw-bold text-center'>*LOCATION needs to be SELECTED*</p>}
            </div>
            <div className='sm-3' >
                <label className='text-center fw-bold form-label' htmlFor='date'>SELECT DATE:</label>
                <input type='date' id='date' min={today} className='form-control border border-secondary text-secondary fw-bold' {...register('date',{required:true})}></input>
            </div>
            {errors.date?.type==='required'&&<p className='text-danger fw-bold text-center'>*DATE needs to be SELECTED*</p>}
            <div className='sm-3' >
                <label className='text-center fw-bold form-label' htmlFor='time'>SELECT TIME:</label>
                <select className='sm-3' id='time' {...register('time',{required:true})}>
                    <option value=''>
                        Select Time
                    </option>
                    {availableTimeSlots.map((timeSlot,index)=>
                    (
                        <option key={index} value={timeSlot}>
                            {timeSlot}
                        </option>
                    ))}
                </select>
            </div>
            {errors.time?.type==='required'&&<p className='text-danger fw-bold text-center'>*TIME needs to be SELECTED*</p>}
            <div className='text-center pt-3'>
            <button className='btn btn-success' type='submit'>BOOK</button>
            </div>
        </form>
    </div>
  )
}

export default Adminbookappointment
