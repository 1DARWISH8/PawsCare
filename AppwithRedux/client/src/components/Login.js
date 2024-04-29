import React, { useEffect, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { userLoginPromiseStatus } from '../redux/slices/userLoginSlice'
import {useDispatch,useSelector} from 'react-redux'
import './Login.css'
import { userCartPromiseStatus } from '../redux/userCartSlice'

function Login() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let dispatch = useDispatch()
  let navigate=useNavigate()
  let {currentUser,loginStatus,errorMessage} = useSelector(state=>state.userLogin)
  let [userType,setUserType] = useState('user')

  let userTypeChange=()=>
  {
    if(userType==="user")
    {
      setUserType('admin')
    }
    else
    {
      setUserType('user')
    }
  }

  async function formSubmit(data)
  {
    data={userType,...data}
    await dispatch(userLoginPromiseStatus(data))
    await dispatch(userCartPromiseStatus(data.username))
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
    <div className='text-center'>
      <h1 className='pt-4' id='health'>LOGIN</h1>
      <h6 className="mb-0 mt-3 pb-3 text-center"><span>USER</span><span>ADMIN</span></h6>
			<input className="checkbox" type="checkbox" id="reg-log" onChange={userTypeChange} name="reg-log"/>
			<label for="reg-log"></label>
      {errorMessage.length!==0&&<p className='fw-bold text-center text-danger fs-4'>{errorMessage.message}</p>}
						<div className="d-flex align-items-center justify-content-center pt-3">
            <form id='login-form' className='' onSubmit={handleSubmit(formSubmit)}>
              <div className="align-items-center justify-content-center">
                <h2 className="mb-4 pb-3" id='health'>
                  {userType==='user'?<>
                  User </>
                  :
                  <>
                  Admin </>}
                  Log In
                </h2>
                <div className="form-group">
                  <input type="text" className="form-style" placeholder="Your Username" autocomplete="off" id='username' {...register('username',{required:true})}/>
                  <i className="input-icon fas fa-user"></i>
                </div>
                {errors.username?.type==='required'&&<p className='text-center pt-2 fw-bold'>USERNAME is REQUIRED</p>}
                <div className="form-group mt-2">
                  <input type="password" class="form-style" placeholder="Your Password" autocomplete="off" id='password' {...register('password',{required:true})}/>
                  <i className="input-icon fas fa-lock"></i>
                </div>
                {errors.password?.type==='required'&&<p className='text-center pt-2 fw-bold'>PASSWORD is REQUIRED</p>}
                <div className='text-center m-3'>
                  <button type='submit' id='login-btn' className='btn fw-bold'>LOG IN</button>
                </div>
              </div>
              <p className='text-center fw-bold pt-1'>Not a USER?<NavLink className="text-light text-decoration-underline" to='/getstarted/register'>REGISTER</NavLink></p>
          </form>
			  </div>

    </div>
  )
}

export default Login
