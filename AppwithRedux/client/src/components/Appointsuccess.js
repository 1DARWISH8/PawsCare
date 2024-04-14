import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux' 
import { userDetailsPromiseStatus } from '../redux/slices/userDetailsSlice'

function Appointsuccess() {

    let {currentUser}=useSelector(state=>state.userLogin)
    // let dispatch = useDispatch()
    // console.log(currentUser)
    
    // useEffect(()=>
    // {
    //     dispatch(userDetailsPromiseStatus(currentUser))
    // },[])

    // let {presentUser} = useSelector(state=>state.userdetails)
    // console.log(presentUser)

return (
    <div>
        <div className='pt-3'>
            <NavLink className='bg-secondary btn text-white ' to='/home'>ᐊ Back</NavLink>
        </div>
        <div className='card m-5 p-5 bg-success'>
        <div>
            <h3 className='text-center'>✅YOUR APPOINTMENT HAS BEEN BOOKED SUCCESSFULLY</h3>
        </div>
        <h5 className='text-center pt-2'>THE DETAILS ARE AS FOLLOW:</h5>
        <div className='card m-4 bg-success text-center border-0 sm-3'>
        {/* <div className='fw-bold text-white  border border-bottom-0'>
            SERVICE:<span className='m-2'>{currentUser.appointments[0].service}</span>
        </div>
        <div className='fw-bold text-white border border-bottom-0'>
            LOCATION:<span className='m-2'>{currentUser.appointments[0].location}</span>
        </div>
        <div className='fw-bold text-white border'>
            DATE,TIME:<span className='m-2'>{currentUser.appointments[0].date},{currentUser.appointments[0].time}</span>
        </div> */}
        </div>
    </div>
    </div>
)
}

export default Appointsuccess
