import React, { useContext, useState } from 'react'
import { userLoginContext } from '../contexts/userLoginContext'
import { NavLink } from 'react-router-dom'

function Checkout() {

  let [currentUser]=useContext(userLoginContext)

  return (
    <div>
      <div>
        <NavLink className='bg-secondary btn text-white' to='/store/cart'>ᐊ Back</NavLink>
      </div>
      <div className='card text-center pt-5'>
        <h3 className='fw-bold'>{currentUser.username},Thank You for placing an Order</h3>
        <p>Your Order will be Delivered within 7 Working days to the {currentUser.address}</p>
    </div>
    </div>
  )
}

export default Checkout
