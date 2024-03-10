import React, { useContext, useEffect, useState } from 'react'
import { userLoginContext } from '../contexts/userLoginContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'


function Bookappointment() {

    let navigate= useNavigate()
    let {currentUser}=useSelector(state=>state.userLogin)
    // let [currentUser,setCurrentUser]=useContext(userLoginContext)
    let [error,setError]=useState('')
    let {register,handleSubmit,formState:{errors}}=useForm()



    async function formSubmit(data)
    {
        // store in local api
        try
        {
            let username = currentUser.username
            let petname = currentUser.petname
            data = {username,petname,...data}
            // console.log(data)
            let booked = await axios.post(`http://localhost:5000/user-api/bookappointment`,data)
            if(booked.status===200)
            {
                navigate('/appointment/appointsuccess')
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    const today = new Date().toISOString().split('T')[0];

    const availableTimeSlots = [];
    for (let hour = 9; hour < 18; hour++)
    {
        for (let minutes = 0 ; minutes < 60; minutes +=30)
        {
            availableTimeSlots.push(`${hour.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`);
        }
    }

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
            <label className='text-center fw-bold form-label'>PETNAME:<span className='text-secondary fs-6 border border-secondary rounded m-2 p-1'>{currentUser.petname}</span></label>
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

export default Bookappointment
