import React, { useEffect, useState } from 'react'
import './Cart.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';


function Cart() {

    let {currentUser}=useSelector(state=>state.userLogin)
    let navigate=useNavigate()
    let dispatch = useDispatch()
    let [cart,setCart] = useState([])
    let [error,setError] = useState('')
    let [alert,setAlert] = useState('')
    let sum = 0
    
    const getcart = async()=>
    {
        let cartproducts = await axios.get(`http://localhost:5000/user-api/cart/${currentUser.username}`)
        setCart(cartproducts.data)
    }
    useEffect(()=>getcart,[])

    const hideAlert = () =>
{
    setTimeout(()=>
    {
        setAlert('');
    },5000);
}

useState(()=>
{
    hideAlert();
},[])

async function openproductpage(item)
{
    try
    {
        dispatch(productDetailsPromiseStatus(item))
        navigate('/store/productpage')
    }
    catch(err)
    {
        setError(err.message)
    }
}

    async function incrementQuantity(item)
    {
        try
        {
            item.quantity += 1
            let increased = await axios.post('http://localhost:5000/user-api/editquantity',item)
            if (increased)
            {
                getcart()
            }
        }
        catch(err)
        {
            setError(err.message)
        }
        
    };
    async function decrementQuantity(item) 
    {
        try
        {
            if (item.quantity !== 1)
            {
                item.quantity -= 1
                let decreased = await axios.post('http://localhost:5000/user-api/editquantity',item)
                if (decreased)
                {
                    getcart()
                }
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    };

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

    async function checkout(user,cart,sum)
    {
        try
        {
            let username = user.username
            let phonenumber = user.phonenumber
            let address = user.address
            let totalprice = sum
            let orderitems = cart
            let order = {username,phonenumber,address,orderitems,totalprice}
            // console.log(order)
            let checkedout = await axios.post('http://localhost:5000/user-api/order',order)
            // console.log(checkedout)
            if(checkedout)
            {
                setAlert(checkedout.data.message)
                getcart()
            }
        }
        catch(error)
        {
            setError(error.message)
        }        
    }

return (
    <div className='container'>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
    <div >
        <div>
        {cart.length ? 
        <table className='table table-responsive table-hover'>
            {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
                <h2 >CART</h2>
        <tbody>
        {cart.map((item,index)=>
        (
                <tr key={index}>
                <td onClick={()=>openproductpage(item)}>
                    <img src={item.image} style={{width:"50%",height:"50%"}} onClick={()=>openproductpage(item)}/>
                    <p onClick={()=>openproductpage(item)}>{item.productname}</p>
                </td>
                <td className='text-center'>
                    <div>
                        <button className='btn btn-dark m-0' onClick={()=>decrementQuantity(item)}>-</button>
                        <span className='m-2'>{item.quantity}</span>
                        <button className='btn btn-dark m-0' onClick={()=>incrementQuantity(item)}>+</button>
                    </div>
                    Rs.{item.price}
                    <div className='text-white'>{sum+=(parseInt(item.price)*item.quantity)}</div>
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
            <button className='btn btn-success ' onClick={()=>checkout(currentUser,cart,sum)}>CHECKOUT</button>
            </td>
        </tr>
        </tbody>
        </table>:
        <>
            <h1 className='text-center m-3'>..CART IS EMPTY..</h1>
            <p className='fw-bold text-center'>ADD ITEMS TO CART</p>
        </>}
        
        </div>
        
    </div>
</div>
)
}

export default Cart
