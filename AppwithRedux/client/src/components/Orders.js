import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice'
import Accordion from 'react-bootstrap/Accordion';
import {Alert} from 'react-bootstrap';

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
    <div>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }    
            <h2 className='text-center'>ORDERS</h2>
            {orders.length!==0&&
            <div>
                    {orders.map((order,index)=>
                        (
                        <Table striped bordered hover variant="dark" className='m-3' size='sm'>
                        <tbody>
                            <tr key={index}>
                                <td>
                                    <h5 className='m-2'>
                                        ORDER STATUS:
                                            {order.orderstatus==='CANCELLED'&&<span className='text-danger m-2'>{order.orderstatus}</span>}
                                            {order.orderstatus==='DELIVERED'&&<span className='text-success m-2'>{order.orderstatus}</span>}
                                            {order.orderstatus==='ACCEPTED'&&<span className='text-primary m-2'>{order.orderstatus}</span>}
                                            {(order.orderstatus!=='DELIVERED'&&order.orderstatus!=='CANCELLED'&&order.orderstatus!=='ACCEPTED')&&<span className='m-2'>{order.orderstatus}</span>}
                                    </h5>
                                    <p><span className='fw-bold m-2'>ORDERED ON:</span>{order.orderdate}</p>
                                </td>
                                <td>
                                <Accordion >
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>PAYMENT DETAILS:</Accordion.Header>
                                                <Accordion.Body>
                                                <p><span className='fw-bold m-2'>PAYMENT METHOD:</span>{order.paymentmethod}</p>
                                                <p><span className='fw-bold m-2'>PAYMENT STATUS:</span>{order.paymentstatus}</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                            <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header className='bg-dark'>ORDERED PRODUCTS:</Accordion.Header>
                                                <Accordion.Body>
                            {
                                order.orderitems?.map((orderitem,indice)=>
                                <>
                                    <Table hover striped>
                                        <tbody>
                                        <tr key={indice}>
                                    <td>
                                        <span onClick={()=>openproductpage(orderitem)}>
                                            <img src={order.orderitems[indice].image} style={{width:"30%",height:"30%"}}/>
                                            <p>{order.orderitems[indice].productname}</p>
                                        </span>
                                    </td>
                                    <td>
                                        <p><span className='fw-bold'>QUANTITY:</span>{order.orderitems[indice].quantity}</p>
                                        <p><span className='fw-bold'>PRICE:</span>Rs.{order.orderitems[indice].price}</p>
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

                                </td>
                            </tr>
                            <tr>
                                <td>ORDER TOTAL PRICE:</td>
                                <td>Rs.{order.totalprice}</td>
                            </tr>
                            {order.orderstatus!=='CANCELLED'?
                            <tr>
                                <td colSpan={2}><button className='btn btn-danger' onClick={()=>cancelorder(order)}>CANCEL ORDER</button></td>
                            </tr>
                            :
                            <></>
                            }
                        </tbody>
                    </Table>
                    ))}
            </div>
            }
    </div>
  )
}

export default Orders
