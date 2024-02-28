import React, { useContext, useState } from 'react'
import { userLoginContext } from '../contexts/userLoginContext'
import './Cart.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {NavLink} from 'react-router-dom'

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
// import {useNavigate} from 'react-router-dom'

function Cart() {

    let [currentUser,setCurrentUser,userLoginStatus,setUserLoginStatus,formSubmit,error,cart,setCart]=useContext(userLoginContext)
    let navigate=useNavigate()
    // console.log(cart)
    let [copycart,setCopycart]=useState(cart)
    let sum =0


    function removeitem(index)
    {
        let newcart = copycart.filter(item=>item.id!==index);
        setCopycart(newcart);
        setCart(newcart);
    }

    // console.log(cart)
    async function checkout()
    {
        try
        {
            let res1= await axios.patch(`http://localhost:4000/userdata/${currentUser.id}`,cart)
            // console.log(res1.status)
            if(res1.status===200)
                {
                    setCart([])
                    navigate('/store/checkout')
                }
        }
        catch(error)
        {
            alert(error.message)
        }        
    }


return (
    <div className='container'>
        <NavLink className='btn fw-bold' to='/store/food'>ᐊ Back</NavLink>
    <div >
        <div>
        {cart.length ? 
        <table className='table table-responsive table-hover'>
        <tbody>
        {cart.map((item,index)=>
        (
                <tr key={index}>
                <td>
                    <img src={item.image} style={{width:"50%",height:"50%"}}/>
                    <p>{item.name}</p>
                </td>
                <td className='text-center'>
                    <div>Q:1</div>
                    Rs.{item.price}
                    <div className='text-white'>{sum+=parseInt(item.price)}</div>
                </td>
                <td className='text-end'>
                <button className='btn btn-danger' onClick={()=>removeitem(item.id)}><span className="material-symbols-outlined">
                    delete
                </span></button>
                </td>
            </tr>
        ))}
        <tr className='text-end'>
            <td></td>
            <td>Total Price:<span className='fw-bold'>Rs.{sum}</span></td>
            <td>
            <button className='btn btn-success ' onClick={()=>checkout(cart)}>CHECKOUT</button>
            </td>
        </tr>
        </tbody>
        </table>:
        <>
            <h1 className='text-center'>..CART IS EMPTY..</h1>
            <p className='fw-bold text-center'>ADD ITEMS TO CART</p>
        </>}
        
        </div>
        
    </div>
</div>
)
}

export default Cart
