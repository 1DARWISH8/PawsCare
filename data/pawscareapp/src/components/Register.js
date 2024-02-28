import React from 'react'
import { useState } from 'react';
import {useForm} from "react-hook-form"
import axios from 'axios';
import {NavLink, useNavigate} from 'react-router-dom'
import {hashSync} from 'bcryptjs'
// import Appointment from './Appointment';

function Register() {

    let {register,handleSubmit,formState:{errors}}=useForm({
        // defaultValues:{
        //     Appointments:[],
        //     orders:[]
        // }
    })
    let navigate=useNavigate();
    // console.log(typeof navigate)
    let [error,setError]=useState('')
    // console.log("ERROR:",errors)

    async function formSubmit(data)
    {
        // console.log(data);
        // store in local api
        try
        {
            // search for duplicate user
            let res1= await axios.get(`http://localhost:4000/userdata?username=${data.username}`)
            let userList= res1.data;
            if(userList.length===0)
            {
                // hashing the password
                data.password = hashSync(data.password,5)
                // replace password with hashed password
                // store in local API
                let res= await axios.post('http://localhost:4000/userdata',data)
                // console.log(res)
                if(res.status===201)
                {
                    navigate('/getstarted/login')
                }
            }
            // when username already exists
            else
            {
                setError('Username Exists!')
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    function Back()
    {
        navigate('/getstarted')
    }
    // console.log(errors.petanimal?.type)
    // console.log(errors.username?.type)


    // console.log(error)

return (
    <div>
        <button className='border-0 bg-white text-decoration-underline' onClick={Back}>Back</button>
        <form className='col-sm-6 mx-auto m-3 p-2' onSubmit={handleSubmit(formSubmit)}>
        <h1 className='text-center fs-3 text-decoration-underline'>REGISTRATION</h1>
        <p className='text-center fw-bold'>ALREADY A USER?<NavLink to='/getstarted/login'>Login</NavLink></p>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}


        {/* USER DETAILS FORM */}
        <h5 className='text-center fw-bold pt-5'>USER DETAILS</h5>
        <div className='sm-3 m-3'>
            {/* username */}
            <label htmlFor='username' className='form-label fw-bold' >USERNAME:</label>
            <input type='text' className='form-control border-black' id='username' {...register('username',{required:true})}></input>
            {errors.username?.type==='required'&&<p className='text-danger fw-bold text-center'>*USERNAME is required*</p>}
        </div>
        
        <div className='sm-3 m-3'>
            {/* password */}
            <label htmlFor='password' className='form-label fw-bold' >PASSWORD:</label>
            <input type='password' className='form-control border-black' id='password' {...register('password',{required:true})}></input>
            {errors.password?.type==='required'&&<p className='text-center text-danger fw-bold'>*PASSWORD is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            {/* email */}
            <label htmlFor='email' className='form-label fw-bold' >EMAIL ADDRESS:</label>
            <input type='email' id='email' className='form-control border-black' {...register('email',{required:true})}></input>
            {errors.email?.type==='required'&&<p className='text-center text-danger fw-bold'>*EMAIL is required*</p>}
        </div>



        {/* PET DETAILS FORM */}
        <div >
            <h5 className='text-center fw-bold pt-3'>PET DETAILS</h5>
        <div className='sm-3 m-3 '>
        <label htmlFor='imageupload' className=' form-label fw-bold'>UPLOAD IMAGE:</label>
        {/* <input type='file' accept='image/*' id='imageupload' className='form-control' {...register('imageupload')}></input> */}
        <input type='text' id='imageupload' className='form-control border-black' {...register('imageupload')}></input>
        </div>
        <div className='sm-3 m-3'>
            <label htmlFor='petname' className='form-label fw-bold' >PETNAME:</label>
            <input type='text' className='form-control border-black' id='petname' {...register('petname',{required:true})}></input>
            {errors.petname?.type==='required'&&<p className='text-danger fw-bold text-center'>*PETNAME is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            {/* DOB */}
            <label htmlFor='dob' className='form-label fw-bold'>DATE OF BIRTH:</label>
            <input type='date' id="dob" className='form-control border-black text-center' {...register('dob',{required:true})}></input>
            {errors.dob?.type==='required'&&<p className='text-center text-danger fw-bold'>*DATE OF BIRTH is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            <label className='form-label fw-bold' htmlFor='petanimal'>PET ANIMAL:</label>
            <select className='form-control text-center border-black' id='petanimal' {...register('petanimal',{required:true})}>
                <option value="">--SELECT--</option>
                <option value="DOG">DOG</option>
                <option value="CAT">CAT</option>
                <option value="BIRD">BIRD</option>
                <option value="HAMSTER">HAMSTER</option>
                <option value="OTHER">Other</option>
            </select>
            {errors.petanimal?.type==='required'&&<p className='text-center text-danger fw-bold'>*PET ANIMAL TYPE is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            {/* Previous Health checkup date */}
            <label htmlFor='checkupdate' className='form-label fw-bold'>PREVIOUS DATE OF HEALTH CHECK-UP:</label>
            <input type='date' id="checkupdate" className='form-control border-black text-center' {...register('checkupdate',{required:true})}></input>
            {errors.checkupdate?.type==='required'&&<p className='text-center text-danger fw-bold'>*PREVIOUS HEALTH CHECK-UP DATE is required*</p>}
        </div>
        </div>



{/* COMMUNICATION DETAILS */}

        <div>
            <h5 className='text-center fw-bold pt-3'>COMMUNICATION DETAILS</h5>
            <div className='sm-3 m-3 '>
                <label className='form-label fw-bold' htmlFor='phonenumber'>PHONE NUMBER:</label>
                <input className='form-control border-black' type='tele' {...register('phonenumber',{required:true})}></input>
                {errors.phonenumber?.type==='required'&&<p className='fw-bold text-danger text-center'>*PHONE NUMBER is required*</p>}
            </div>
            <div className='sm-3 m-3 '>
                <label className='form-label fw-bold' htmlFor='address'>ADDRESS:</label>
                <textarea className='form-control border-black' type='text' id='address' {...register('address',{required:true})}></textarea>
                {errors.address?.type==='required'&&<p className='fw-bold text-danger text-center'>*ADDRESS is required*</p>}
            </div>
            <div className='sm-3 m-3'>
                <label className='form-label fw-bold' htmlFor='pincode'>PINCODE</label>
                <input className='form-control border-black' type='number' id='pincode' {...register('pincode',{required:true})}></input>
                {errors.pincode?.type==='required'&&<p className='text-danger text-center fw-bold'>*PINCODE is required*</p>}
            </div>
        </div>

        <div className='text-center p-2'>
            <button type='submit' className='btn btn-dark'>REGISTER</button>
        </div>
        </form>

    </div>
)
}

export default Register
