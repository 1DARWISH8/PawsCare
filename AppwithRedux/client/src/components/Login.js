import React, { useEffect, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { userLoginPromiseStatus } from '../redux/slices/userLoginSlice'
import {useDispatch,useSelector} from 'react-redux'

function Login() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let dispatch = useDispatch()
  let navigate=useNavigate()
  let {currentUser,loginStatus,errorMessage} = useSelector(state=>state.userLogin)
  let [userType,setUserType] = useState('user')

  let userTypeChange=(event)=>
  {
    setUserType(event.target.value)
  }

  const formSubmit=(data)=>
  {
    data={userType,...data}
    dispatch(userLoginPromiseStatus(data))
  }

  useEffect(()=>
  {
      if(loginStatus===true)
      {
        if (currentUser.userType==='user')
        {
          navigate('/home')
        }
        else
        {
          navigate('/dashboard')
        }
      }
  },[loginStatus])

  return (
    <div>
      <form className='col-sm-6 mx-auto m-3 p-3' onSubmit={handleSubmit(formSubmit)}>
        <h1 className='text-center fs-3 text-decoration-underline'>LOG IN</h1>
      <label className='form-label fw-bold'>SELECT USER TYPE:</label>
      <input type='radio' id='user' name='userType' value='user' checked={userType==='user'} onChange={userTypeChange}></input>
      <label htmlFor='user'>USER</label>
      <input type='radio' id='admin' name='userType' value='admin' onChange={userTypeChange}></input>
      <label htmlFor='admin'>ADMIN</label>
      {/* <input type='radio' id='seller' name='userType' value='seller' onChange={userTypeChange} ></input>
      <label htmlFor='seller'>SELLER</label> */}

        <p className='text-center fw-bold pt-1'>Not a USER?<NavLink to='/getstarted/register'>REGISTER</NavLink></p>
        {errorMessage.length!==0&&<p className='fw-bold text-center text-danger'>{errorMessage.message}</p>}
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
        <button type='submit' className='btn btn-success border-black fw-bold'>LOG IN</button>
      </div>
      </form>
    </div>
  )
}

export default Login
