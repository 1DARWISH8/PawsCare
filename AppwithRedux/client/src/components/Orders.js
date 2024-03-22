import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice'
import Accordion from 'react-bootstrap/Accordion';
import {Alert} from 'react-bootstrap';

function Orders() {

    let {currentUser}=useSelector(state=>state.userLogin)
    let [orders,setOrders] = useState([])
    let [error,setError] = useState('')
    let [orderitems,setOrderitems] = useState([])
    let navigate=useNavigate()
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
                setOrderitems(orders.data.payload[0].orderitems)
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
            {orders.length?
            <div>
                    {orders.map((order,index)=>
                        (
                        <Table striped bordered hover variant="dark" className='m-1' size='sm'>
                        <tbody>
                            <tr key={index}>
                                <td>
                                    <h5 className='m-2'>
                                        ORDER STATUS:
                                            {order.orderstatus==='CANCELLED'&&<p className='text-danger'>{order.orderstatus}</p>}
                                            {order.orderstatus==='DELIVERED'&&<p className='text-success'>{order.orderstatus}</p>}
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
                            {
                                orderitems.map((orderitem,indice)=>
                                <>
                                <tr key={indice}>
                                    <td colSpan={2}>
                                    <Accordion >
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header className='bg-dark'>ORDERED PRODUCTS:</Accordion.Header>
                                                <Accordion.Body>
                                                    <td>
                                                        <span onClick={()=>openproductpage(orderitem)}>
                                                            <img src={orderitem.image} style={{width:"30%",height:"30%"}}/>
                                                            <p>{orderitem.productname}</p>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <p><span className='fw-bold'>QUANTITY:</span>{orderitem.quantity}</p>
                                                        <p><span className='fw-bold'>PRICE:</span>Rs.{orderitem.price}</p>
                                                    </td>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    </td>
                                </tr>
                                </>
                                )
                            }
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
            :
            <></>}
            <tr>
            </tr>
    </div>
  )
}

export default Orders
