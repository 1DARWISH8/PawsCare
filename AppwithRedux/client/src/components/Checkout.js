import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'

function Checkout() {


  return (
    <div>
      <div>
        <NavLink className='bg-secondary btn text-white' to='/store/cart'>ᐊ Back</NavLink>
      </div>
      <div className='card text-center pt-5'>
        <h3 className='fw-bold'>,Thank You for placing an Order</h3>
        <p>Your Order will be Delivered within 7 Working days to the</p>
    </div>
    </div>
  )
}

export default Checkout
