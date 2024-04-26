import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice'
import Accordion from 'react-bootstrap/Accordion';
import {Alert} from 'react-bootstrap';
import './Orders.css';
import ProgressBar from 'react-bootstrap/ProgressBar'

function Orders() {

    // GET THE CURRENT LOGGED-IN USER 
    let {currentUser}=useSelector(state=>state.userLogin)
    // INITIALISE AN ARRAY OF ORDERS
    let [orders,setOrders] = useState([])
    // DECLARE "error" state variable and "setError" Function using setState hook
    let [error,setError] = useState('')
    // Declare "navigate" function to using "useNavigate" hook for navigation through specified routes
    let navigate=useNavigate()
    // Declare "dispatch" function to using "useDispatch" hook from "Redux" to dispatch actions to the Redux store to trigger updates
    let dispatch = useDispatch()
    let [alert,setAlert] = useState('')

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

    const getorders = async()=>
    {
        try
        {
            let orders = await axios.get(`http://localhost:5000/user-api/getorders/${currentUser.username}`)
            // console.log(orders.data.payload)
            if (orders)
            {
                setOrders(orders.data.payload)
            }
            else
            {
                setError(orders.data.message)
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    } 

    useEffect(()=>getorders,[])


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

async function cancelorder(order)
{
    try
    {
        let ordercancel = await axios.post('http://localhost:5000/user-api/cancelorder',order)
        console.log(ordercancel)
        if (ordercancel.data.message === 'ORDER CANCELLED SUCCESSFULLY')
        {
            setAlert(ordercancel.data.message)
            getorders()
        }
        else
        {
            setError(ordercancel.data.message)
        }
    }
    catch(err)
    {
        setError(err.message)
    }
}

return (
    <section>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }    
            <h2 className='text-center fs-1' id='health'>ORDERS</h2>
            {orders.length!==0&&
            <div>
                    {orders.map((order,index)=>
                        (
                            <div key={index} class="p-5">
                                <div className='cards'>
        <div class="card-body">
            <h6>
                <strong>Ordered On:</strong>{order.ordered_on_date}
            </h6>
                <span className='text-end text-dark'>
                    <strong>Total Cost:    </strong>
                    ₹{order.total_price}
                </span>
            <article class="cards">
                <div class="card-bodys row">
                    <div class="col fw-bold"> <strong>Status:</strong> <br/>
                    {order.order_status==='CANCELLED'&&<span className='text-danger m-2'>{order.order_status} 
                    {
                        order.cancelled_by === "user" ?
                        <span className='text-primary mx-1'>
                            by {order.username}
                        </span>
                        :
                        <span className='text-primary mx-1'>
                            by Admin
                        </span>
                    }
                    </span>}
                    {order.order_status==='DELIVERED'&&<span className='text-success m-2 fw-bold'>{order.order_status}</span>}
                    {order.order_status==='ACCEPTED'&&<span className='text-primary m-2 fw-bold'>{order.order_status}</span>}
                    {(order.order_status!=='DELIVERED'&&order.order_status!=='CANCELLED'&&order.order_status!=='ACCEPTED')&&<span className='m-2 fw-bold'>{order.order_status}</span>}
                    </div>
                    <div class="col"> <strong>Payment Status:</strong> <br/>
                        {order.payment_status==='COMPLETE'?
                        <span className='text-success m-2 fw-bold'>{order.payment_status}</span>
                        :
                        <span className='fw-bold'>
                            {order.payment_status}
                        </span>}
                    </div>
                    <div class="col"> <strong>Payment Mode:</strong> <br/>{order.payment_method}</div>
                </div>
            </article>

            {
                order.order_status==="PENDING"&&
                <ProgressBar  className='mt-5' animated now={0} />
            }
            {
                order.order_status==="ACCEPTED"&&
                <ProgressBar  className='mt-5' variant='danger' animated now={13} />
            }
            {
                order.order_status==="IN TRANSIT"&&
                <ProgressBar  className='mt-5' variant='danger' animated now={38} />
            }
            {
                order.order_status==="OUT FOR DELIVERY"&&
                <ProgressBar  className='mt-5' variant='danger' animated now={63} />
            }
            {
                order.order_status==="DELIVERED"&&
                <ProgressBar  className='mt-5' variant='danger' animated now={100} />
            }
            {
                order.order_status==="CANCELLED"&&
                <ProgressBar  className='mt-5' variant='danger' animated now={100} />
            }

            <div class="track">
                {
                    order.order_status==="PENDING"&&
                    <>
                    <div class="step"> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">Order Accepted</span> </div>
                    <div class="step"> <span class="icon"><i class="fas fa-map-marker-alt"></i> </span> <span class="text"> In Transit</span> </div>
                    <div class="step"> <span class="icon"> <i class="fas fa-shipping-fast"></i> </span> <span class="text"> Out for delivery </span> </div>
                    <div class="step"> <span class="icon"> <i class="fas fa-thumbs-up"></i></span> <span class="text">Delivered</span> </div>
                    </>
                }
                {
                    order.order_status==="ACCEPTED"&&
                    <>
                    <div class="step"> <span class="icon-active"> <i class="fa fa-check"></i> </span> <span class="text">Order Accepted</span> </div>
                    <div class="step"> <span class="icon"><i class="fas fa-map-marker-alt"></i> </span> <span class="text"> In Transit</span> </div>
                    <div class="step"> <span class="icon"> <i class="fas fa-shipping-fast"></i> </span> <span class="text"> Out for delivery </span> </div>
                    <div class="step"> <span class="icon"> <i class="fas fa-thumbs-up"></i></span> <span class="text">Delivered</span> </div>
                    </>
                }
                {
                    order.order_status==="IN TRANSIT"&&
                    <>
                    <div class="step"> <span class="icon-active"> <i class="fa fa-check"></i> </span> <span class="text">Order Accepted</span> </div>
                    <div class="step"> <span class="icon-active"><i class="fas fa-map-marker-alt"></i> </span> <span class="text"> In Transit</span> </div>
                    <div class="step"> <span class="icon"> <i class="fas fa-shipping-fast"></i> </span> <span class="text"> Out for delivery </span> </div>
                    <div class="step"> <span class="icon"> <i class="fas fa-thumbs-up"></i></span> <span class="text">Delivered</span> </div>
                    </>
                }
                {
                    order.order_status==="OUT FOR DELIVERY"&&
                    <>
                    <div class="step"> <span class="icon-active"> <i class="fa fa-check"></i> </span> <span class="text">Order Accepted</span> </div>
                    <div class="step"> <span class="icon-active"><i class="fas fa-map-marker-alt"></i> </span> <span class="text"> In Transit</span> </div>
                    <div class="step"> <span class="icon-active"> <i class="fas fa-shipping-fast"></i> </span> <span class="text"> Out for delivery </span> </div>
                    <div class="step"> <span class="icon"> <i class="fas fa-thumbs-up"></i></span> <span class="text">Delivered</span> </div>
                    </>
                }
                {
                    order.order_status==="DELIVERED"&&
                    <>
                    <div class="step"> <span class="icon-active"> <i class="fa fa-check"></i> </span> <span class="text">Order Accepted</span> </div>
                    <div class="step"> <span class="icon-active"><i class="fas fa-map-marker-alt"></i> </span> <span class="text"> In Transit</span> </div>
                    <div class="step"> <span class="icon-active"> <i class="fas fa-shipping-fast"></i> </span> <span class="text"> Out for delivery </span> </div>
                    <div class="step"> <span class="icon-active"> <i class="fas fa-thumbs-up"></i></span> <span class="text">Delivered</span> </div>
                    </>
                }
                {
                    order.order_status==="CANCELLED"&&
                    <>
                    <div class="step"> <span class="icon"> <i class="fas fa-times"></i>
                    </span> <span class="text">Order Cancelled</span> </div>
                    </>
                }
            </div>
            <hr/>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>ORDER ITEMS:</Accordion.Header>
                        <Accordion.Body>
                        {
                            order.order_items?.map((orderitem,indice)=>
                            <>
                                <Table hover>
                                    <tbody>
                                        <tr key={indice}>
                                            <td>
                                                <span onClick={()=>openproductpage(orderitem)}>
                                                    <img src={orderitem.image[0].ImageURL} style={{width:"30%",height:"30%"}}/>
                                                    <p>{orderitem.productname}</p>
                                                </span>
                                            </td>
                                            <td>
                                                <p><span className='fw-bold'>QUANTITY:</span>{orderitem.quantity}</p>
                                                <p><span className='fw-bold'>PRICE:</span>Rs.{orderitem.discounted_price}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>
                            )
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
                {
                    order.order_status!=='CANCELLED'&&
                    <div className='text-end'>
                        <hr/>
                        <button className='btn btn-danger' onClick={()=>cancelorder(order)}>CANCEL ORDER</button>
                    </div>
                }
            </div>
        </div>

</div>
                    ))}
            </div>
            }
    </section>
  )
}

export default Orders
