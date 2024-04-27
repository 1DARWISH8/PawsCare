import React, { useEffect, useState } from 'react'
import './Cart.css'
import axios from 'axios'
import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';
import { userCartPromiseStatus } from '../redux/userCartSlice'


function Cart() {

    let {currentUser}=useSelector(state=>state.userLogin)
    let navigate=useNavigate()
    let dispatch = useDispatch()
    let [cart,setCart] = useState([])
    let [error,setError] = useState('')
    let [alert,setAlert] = useState('')
    let [total,setTotal] = useState(0)
    let [usercart,setUsercart] = useState([])
    
    const getcart = async()=>
    {
        let cartproducts = await axios.get(`http://localhost:5000/user-api/cart/${currentUser.username}`)
        console.log(cartproducts)
        if (cartproducts.data.message==="RETRIEVED USER-CART")
        {
            setUsercart(cartproducts.data.payload)
            setCart(cartproducts.data.payload.cart)
        }
        else
        {
            setError(cartproducts.data.message)
        }
    }
    useEffect(()=>getcart,[])

    console.log(cart)

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
        await dispatch(productDetailsPromiseStatus(item))
        navigate('/store/productpage')
    }
    catch(err)
    {
        setError(err.message)
    }
}

// console.log(cart[0].stock)

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
            // console.log(item)
            let username = currentUser.username
            item = {...item,username}
            let productdeleted = await axios.post('http://localhost:5000/user-api/removecartproduct',item)
            if (productdeleted.data.message === "PRODUCT IS DELETED FROM CART")
            {
                getcart()
                await dispatch(userCartPromiseStatus(username))
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

    // Function to get the name of the month from its index
    function getMonthName(monthIndex) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    }

    async function checkout(user,cart,sum)
    {
        try
        {
            let username = user.username
            let phonenumber = user.phonenumber
            let address = user.address
            let total_price = sum
            let order_items = cart
                // Get today's date
                let today = new Date();
                let ordered_on_date = `${today.getDate()} ${getMonthName(today.getMonth())} ${today.getFullYear()}`;
            let order = {username,phonenumber,address,order_items,total_price,ordered_on_date}
            // console.log(order)
            let checkedout = await axios.post('http://localhost:5000/user-api/order',order)
            console.log(checkedout)
            if(checkedout)
            {
                setAlert(checkedout.data.message)
                getcart()
                await dispatch(userCartPromiseStatus(username))
            }
        }
        catch(error)
        {
            setError(error.message)
        }        
    }

    async function get_total()
    {
        try
        {
            let total_price = 0
            for (const item of cart)
            {
                total_price += item.discounted_price * item.quantity
            }
            setTotal(total_price)
        }
        catch(err)
        {

        }
    }

    useEffect(()=>
{get_total()},[cart])

// PAYMENT GATEWAY
async function handle_Payment(e,cart)
{
    try
    {
        let response = await axios.post('http://localhost:5000/user-api/razorpayorder',)
        var options = {
            "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    }
    catch(err)
    {

    }
}

return (
    <>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }

        {
            cart.length!==0?
            <section className=" m-3">
                    <div className="row w-100">
                        <div className="col-lg-12 col-md-12 col-12">
                            <h3 className="display-5 mb-2 text-center">Cart</h3>
                            <p className="mb-5 text-center">
                                <i className="text-info font-weight-bold">{cart.length}</i> items in your cart</p>
                            <table id="shoppingCart" className="table table-condensed table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <th style={{ width: '60%' }}>Product</th>
                                        <th   className='text-center' style={{ width: '10%' }}>Price</th>
                                        <th className='text-center' style={{ width: '20%' }}>Quantity</th>
                                        <th style={{ width: '8%' }}>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cart.map((item,index)=>
            (
                    
                    <tr key={index}>
                    <td data-th="Product">
                                <div className="row">
                                    <div className="col-md-3 text-left">
                                        <img src={item.image[0].ImageURL} alt="" className="img-fluid d-none d-md-block rounded mb-2 shadow "/>
                                    </div>
                                    <div className="col-md-9 text-start mt-sm-2 btn" id='product_name' onClick={()=>openproductpage(item)}>
                                        <h4>{item.productname}</h4>
                                    </div>
                                </div>
                            </td>
                            <td data-th="Price" className='text-center p-3'>₹{item.discounted_price}</td>
                            <td data-th="Quantity">
                                <div className='text-center'>
                                    <button className='btn btn-dark m-2' onClick={()=>decrementQuantity(item)}>-</button>
                                    <span >{item.quantity}</span>
                                    <button className='btn btn-dark m-2' onClick={()=>incrementQuantity(item)}>+</button>
                                </div>
                            </td>
                            <td className="actions pt-3 px-3">
                                    <button className="btn btn-dark border-secondary bg-danger btn-md mb-2" onClick={()=>removeitem(item)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                            </td>
                </tr>
            ))}
                                </tbody>
                            </table>
                            <div className='text-end'>
                                <h4>Subtotal:</h4>
                                <h1>₹{usercart.amount}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 d-flex">
                        <div className="btn col-sm-6 mb-3 mb-m-1 order text-start">
                            <NavLink to='/store'>
                                <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
                            </NavLink>
                        </div>
                        <div className="col-sm-6 order text-end">
                            <button className="btn btn-primary mb-4 btn-lg pl-5 pr-5" onClick={()=>handle_Payment(cart)}>Checkout</button>
                        </div>
                    </div>
            </section>
            :
            <>
                <h3 className='mt-4'>CART IS EMPTY</h3>
                <div className="text-center">
                    <NavLink to='/store' className="btn btn-dark">
                        <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
                    </NavLink>
                </div>
            </>
}

</>
)
}

export default Cart
