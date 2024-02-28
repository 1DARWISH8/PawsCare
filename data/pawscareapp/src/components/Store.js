import React, {useContext} from 'react'
import { NavLink,Outlet,useNavigate } from 'react-router-dom'
import { userLoginContext } from '../contexts/userLoginContext'

function Store() {

  let [,,userLoginStatus,,,,cart]=useContext(userLoginContext)
  let navigate = useNavigate()

  function tocart()
  {
    if(userLoginStatus)
    {
      navigate('/store/cart')
    }
    else
    {
      alert("SIGN UP / LOG IN TO ORDER")
      navigate('/getstarted')
    }
  }

  return (
    <div>
        <div className="nav justify-content-center rounded p-2">
        <li className='nav-item'>
            <NavLink className='nav-link border rounded bg-secondary text-white' id='nav-link' to='/store/food'>FOOD</NavLink>
        </li>
          <li className='nav-item'>
            <NavLink className='nav-link border rounded bg-secondary text-white' to='/store/treats'>TREATS</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link border rounded bg-secondary text-white' to='/store/toys'>TOYS</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link border rounded bg-secondary text-white' to='/store/essentials'>ESSENTIALS</NavLink>
          </li>
          <li className='nav-item'>
            <button className='btn m-1' onClick={tocart}><span className='cart'>CART<i className="bi bi-cart4"></i><span className='number'>{cart.length}</span></span></button>
          </li>
      </div>
      <Outlet/>
    </div>
  )
}

export default Store
