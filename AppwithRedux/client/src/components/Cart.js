import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { userDetailsPromiseStatus } from '../redux/slices/userDetailsSlice'

// import {useNavigate} from 'react-router-dom'

function Cart() {

    let {currentUser}=useSelector(state=>state.userLogin)
    let navigate=useNavigate()
    let dispatch = useDispatch()
    let [cart,setCart] = useState([])
    let [error,setError] = useState('')
    let sum = 0
    
    const getcart = async()=>
    {
        let cartproducts = await axios.get(`http://localhost:5000/user-api/cart/${currentUser.username}`)
        setCart(cartproducts.data)
    }
    useEffect(()=>getcart,[])

    async function removeitem(item)
    {
        try
        {
            let username = currentUser.username
            item = {...item,username}
            let productdeleted = await axios.post('http://localhost:5000/user-api/removecartproduct',item)
            if (productdeleted.data.message === "PRODUCT IS DELETED FROM CART")
            {
                getcart()
            }
            else
            {
                setError(productdeleted.data.message)
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    async function checkout()
    {
        try
        {
            // let res1= await axios.patch(`http://localhost:4000/userdata/${currentUser.id}`,)
            // // console.log(res1.status)
            // if(res1.status===200)
            //     {
            //         setCart([])
            //         navigate('/store/checkout')
            //     }
        }
        catch(error)
        {
            alert(error.message)
        }        
    }


return (
    <div className='container'>
        <h2 className='text-center'>CART</h2>

        
    <div >
        <div>
        {cart.length ? 
        <table className='table table-responsive table-hover'>
            {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        <tbody>
        {cart.map((item,index)=>
        (
                <tr key={index}>
                <td>
                    <img src={item.image} style={{width:"50%",height:"50%"}}/>
                    <p>{item.productname}</p>
                </td>
                <td className='text-center'>
                    <div>Q:1</div>
                    Rs.{item.price}
                    <div className='text-white'>{sum+=parseInt(item.price)}</div>
                </td>
                <td className='text-end'>
                <button className='btn text-danger' onClick={()=>removeitem(item)}><span className="material-symbols-outlined">
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
