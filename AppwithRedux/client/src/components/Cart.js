import React, { useEffect, useState } from 'react'
import './Cart.css'
import axios from 'axios'
import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';
import { userCartPromiseStatus } from '../redux/userCartSlice'
import FailedModal from './FailedModal'

function Cart() {

    let {currentUser}=useSelector(state=>state.userLogin)
    let navigate=useNavigate()
    let dispatch = useDispatch()
    let [cart,setCart] = useState([])
    let [error,setError] = useState('')
    let [alert,setAlert] = useState('')
    let [total,setTotal] = useState(0)
    let [usercart,setUsercart] = useState([])
    let [paymentMode,setPaymentmode] = useState("CASH ON DELIVERY(COD)")
    let [successModal,setSuccessModal] = useState("INACTIVE")
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => {
      setShowModal(false);
    };
  
    
    const handlePaymentModeChange = (e) => {
        setPaymentmode(e.target.value);
    };

    const getcart = async()=>
    {
        let cartproducts = await axios.get(`http://localhost:5000/user-api/cart/${currentUser.username}`)
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

    async function checkout(response)
    {
        try
        {
            let username = currentUser.username
            let phonenumber = currentUser.phonenumber
            let address = currentUser.address
            let total_price = usercart.amount
            let order_items = cart
            // Get today's date
            let today = new Date();
            let ordered_on_date = `${today.getDate()} ${getMonthName(today.getMonth())} ${today.getFullYear()}`;
            if(paymentMode==="ONLINE PAYMENT")
            {
                console.log("first")
                let payment_status = "COMPLETE"
                let payment_method = paymentMode
                let {razorpay_payment_id,razorpay_order_id} = response
                let order = {username,phonenumber,address,order_items,total_price,ordered_on_date,payment_status,payment_method,razorpay_order_id,razorpay_payment_id}
                let checkedout = await axios.post('http://localhost:5000/user-api/order',order)
                if(checkedout)
                {
                    setAlert(checkedout.data.message)
                    getcart()
                    await dispatch(userCartPromiseStatus(username))
                }
            }
            else if(paymentMode === "CASH ON DELIVERY(COD)")
            {
                let order = {username,phonenumber,address,order_items,total_price,ordered_on_date}
                let checkedout = await axios.post('http://localhost:5000/user-api/order',order)
                if(checkedout)
                {
                    setAlert(checkedout.data.message)
                    getcart()
                    await dispatch(userCartPromiseStatus(username))
                }
            }
        }
        catch(error)
        {
            setError(error.message)
        }        
    }

// PAYMENT GATEWAY
async function handle_Payment()
{
    try
    {
        let response = await axios.post('http://localhost:5000/user-api/razorpayorder',usercart)
        let razorpayOrder = response.data
        var options = {
            "key": razorpayOrder.key, // Enter the Key ID generated from the Dashboard
            "amount": razorpayOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Pawscare India Private Ltd",
            "description": "Test Transaction",
            "image": "https://res.cloudinary.com/dozacgfl7/image/upload/v1711878050/logo_hjylkr.png",
            "order_id": razorpayOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response){
                let isVerified = await axios.post('http://localhost:5000/user-api/verifyPayment',response)
                console.log(response)
                if (isVerified.data.message==="PAYMENT VERIFIED SUCCESSFULLY")
                {
                    await checkout(response)
                }
                // window.alert(response.razorpay_payment_id);
                // window.alert(response.razorpay_order_id);
                // window.alert(response.razorpay_signature)
            },            
            "prefill": {
                "name": currentUser.username,
                "email": currentUser.email,
                "contact": currentUser.phonenumber
                // "card": 4315814838719009
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#11c738"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
            <FailedModal show={showModal} onClose={handleModalClose} message={"Your transaction has failed. Please go back and try again."}/>
            // window.alert(response.error.code);
            // window.alert(response.error.description);
            // window.alert(response.error.source);
            // window.alert(response.error.step);
            // window.alert(response.error.reason);
            // window.alert(response.error.metadata.order_id);
            // window.alert(response.error.metadata.payment_id);
    });
        rzp1.open();
    }
    catch(err)
    {
        <FailedModal show={showModal} onClose={handleModalClose} message={err.message} />
    }
}

// useEffect(()=>
// (
//     setShowModal(true)
// ),[])

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
                    <div>
                        <label htmlFor="paymentMode" className='fw-bold fs-5'>Payment Mode:</label>
                        <select id="paymentMode" className='mx-2' value={paymentMode} onChange={handlePaymentModeChange}>
                            <option value="CASH ON DELIVERY(COD)">CASH ON DELIVERY(COD)</option>
                            <option value="ONLINE PAYMENT">ONLINE PAYMENT</option>
                        </select>
                    </div>
                    <div className="row mt-4 d-flex">
                        <div className="btn col-sm-6 mb-3 mb-m-1 order text-start">
                            <NavLink to='/store'>
                                <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
                            </NavLink>
                        </div>
                        <div className="col-sm-6 order text-end">
                        {
                            paymentMode==="CASH ON DELIVERY(COD)"?
                            <button className="btn btn-primary mb-4 btn-lg pl-5 pr-5" onClick={()=>checkout()}>Checkout</button>:
                            <button className="btn btn-primary mb-4 btn-lg pl-5 pr-5" onClick={handle_Payment}>Checkout</button>
                        }
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
