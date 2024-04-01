import React, { useContext,useEffect } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { compareSync } from 'bcryptjs'
// import axios from 'axios'
import { userLoginContext } from '../contexts/userLoginContext'


function Login() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let navigate=useNavigate()

  let [,,userLoginStatus,,formSubmit,error]=useContext(userLoginContext)

  useEffect(()=>
  {
      if(userLoginStatus===true)
      {
        navigate('/home')
      }
  },[userLoginStatus])

  return (
    <div>
      <form className='col-sm-6 mx-auto m-3 p-3' onSubmit={handleSubmit(formSubmit)}>
        <h1 className='text-center fs-3 text-decoration-underline'>LOG IN</h1>
        <p className='text-center fw-bold pt-1'>Not a USER?<NavLink to='/getstarted/register'>REGISTER</NavLink></p>
        {error.length!==0&&<p className='fw-bold text-center text-danger'>{error}</p>}
      <div className='sm-3 m-3 pt-3'>
        <label className='form-label fw-bold' htmlFor='username'>USERNAME</label>
        <input className='form-control border-black' type='text' id='username' {...register('username',{required:true})}></input>
        {errors.username?.type==='required'&&<p className='text-center text-danger fw-bold'>USERNAME is REQUIRED</p>}
      </div>
      <div className='sm-3 m-3 pt-3'>
        <label className='form-label fw-bold' htmlFor='password'>PASSWORD</label>
        <input className='form-control border-black' type='password' id='password' {...register('password',{required:true})}></input>
        {errors.password?.type==='required'&&<p className='text-center text-danger fw-bold'>PASSWORD is REQUIRED</p>}
      </div>
      <div className='text-center'>
        <button type='submit' className='btn btn-success border-black fw-bold'>SUBMIT</button>
      </div>
      </form>
    </div>
  )
}

export default Login
