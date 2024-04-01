import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import logo from '../images/gradlogofromai_prev_ui.png'

function GetStarted() {
return (
    <div>
        <div className='nav justify-content-center pt-5' id='welcome'>
            <h1>WELCOME TO</h1>
        </div>
        <div className='nav justify-content-center p-3'>
            <img width='300px' src={logo} alt=' '></img>
        </div>
        <ul className='nav justify-content-center'>
            <li className='nav-item'>
            <NavLink className='nav-link' to='/getstarted/register'>SIGN UP</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/getstarted/login'>LOG IN</NavLink>
            </li>
        </ul>
        <Outlet/>
    </div>
)
}

export default GetStarted
