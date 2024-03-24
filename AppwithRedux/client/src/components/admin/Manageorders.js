import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../../redux/slices/productDetailsSlice';
import Accordion from 'react-bootstrap/Accordion';
import {Alert} from 'react-bootstrap';

function Manageorders() {

    let {currentUser}=useSelector(state=>state.userLogin)
    let [orders,setOrders] = useState([])
    let [error,setError] = useState('')
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

const [searchBy, setSearchBy] = useState(''); // State to store the selected dropdown value
const [searchInput, setSearchInput] = useState('Pending'); // State to store the input value for search
const [sortOrder, setSortOrder] = useState('oldest');

// Handler function to update the selected dropdown value
const handleSelectChange = (event) => {
    setSearchBy(event.target.value);
    setSearchInput(event.target.value === 'Orderstatus' ? 'Pending' : ''); // Clear the search input when dropdown value changes
};

// Handler function to update the search input value
const handleInputChange = (event) => {
  setSearchInput(event.target.value);
};

  // Handler function to update the sorting order
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Function to filter orders based on the selected criteria
  const filterOrders = () => {
    let filteredOrders = orders;
    if (searchBy === 'Orderstatus') {
      filteredOrders = filteredOrders.filter(order => order.orderstatus.toLowerCase() === searchInput.toLowerCase());
    } else if (searchBy === 'Username') {
      filteredOrders = filteredOrders.filter(order => order.username.toLowerCase() === searchInput.toLowerCase());
    } else if (searchBy === 'Date') {
filteredOrders = filteredOrders.filter(order => order.orderdate.includes(searchInput)); // Assuming date format is included in order.date
    }
    return filteredOrders;
  };

// Function to render form inputs based on the selected dropdown value
const renderFormInputs = () => {
  switch (searchBy) {
    case 'Orderstatus':
      return (
        <select value={searchInput} onChange={handleInputChange}>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Accepted">Accepted</option>
            <option value="In transit">In transit</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
        </select>
      );
    case 'Username':
      return (
        <input type="text" value={searchInput} onChange={handleInputChange} placeholder="Enter username" />
      );
      case 'Date':
        return (
          <input type="date" value={searchInput} onChange={handleInputChange} />
        );
    default:
      return null;
  }
};

  // Function to sort orders by date
  const sortOrders = (filteredOrders) => {
    return sortOrder === 'oldest' ? filteredOrders.sort((a, b) => new Date(a.date) - new Date(b.date)) :
    filteredOrders.sort((a, b) => new Date(b.orderdate) - new Date(a.orderdate));
      };

  // Filtered and sorted orders based on search criteria
  const filteredOrders = sortOrders(filterOrders());

// GET ORDERS ACCORDING TO THEIR ORDER STATUS
async function getorders()
    {
    try
        {
            let orders = await axios.get(`http://localhost:5000/admin-api/getorders`)
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

async function editorderstatus(order,status)
{
    try
    {
        order.orderstatus=status
        // console.log(order)
        let orderstatus = await axios.patch('http://localhost:5000/admin-api/editorderstatus',order)
        // console.log(orderstatus)
        if ((orderstatus.data.message === 'ORDER HAS BEEN CANCELLED' || orderstatus.data.message === 'ORDER HAS BEEN ACCEPTED'
        || orderstatus.data.message === 'ORDER IS IN TRANSIT' || orderstatus.data.message === 'ORDER IS OUT FOR DELIVERY' || orderstatus.data.message === 'ORDER HAS BEEN DELIVERED'))
        {
            setAlert(orderstatus.data.message)
            // getorders()
        }
        else
        {
            setError(orderstatus.data.message)
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
        <select value={searchBy} onChange={handleSelectChange}>
            <option value="">Select search criteria</option>
            <option value="Orderstatus">Order Status</option>
            <option value="Username">Username</option>
            <option value="Date">Date</option>
        </select>
        {renderFormInputs()}
        {filteredOrders.length!==0?
            <div>
                <select value={sortOrder} onChange={handleSortChange}>
                    <option value="oldest">Oldest to Newest</option>
                    <option value="newest">Newest to Oldest</option>
                </select>
                    {filteredOrders.map((order,index)=>
                        (
                        <Table striped bordered hover variant="dark" className='m-3' size='sm'>
                        <tbody>
                            <tr key={index}>
                                <td>
                                    <h4 className='m-1'>ORDER PLACED BY:<span className='fw-bold'>{order.username}</span></h4>
                                    <h5 className='m-2'>
                                        ORDER STATUS:
                                            {order.orderstatus==='CANCELLED'&&<span className='text-danger m-2'>{order.orderstatus}</span>}
                                            {order.orderstatus==='DELIVERED'&&<span className='text-success m-2'>{order.orderstatus}</span>}
                                            {(order.orderstatus!=='DELIVERED'&&order.orderstatus!=='CANCELLED')&&<span className='m-2'>{order.orderstatus}</span>}
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
                            <tr className='table table-dark text-end'>
                                <td>
                                    {
                                        (order.orderstatus!=='CANCELLED' && order.orderstatus!=='DELIVERED')&&
                                        <h5 className='m-3'>CHANGE ORDER STATUS:</h5>
                                    }
                                </td>
                                <td >
                                    
                                    {(order.orderstatus!=='CANCELLED' && order.orderstatus!=='DELIVERED')&&
                                        <button className='btn btn-danger m-2' onClick={()=>editorderstatus(order,'CANCELLED')}>CANCEL ORDER</button>
                                    }
                                    {
                                        order.orderstatus==='PENDING'&&
                                        <button className='btn btn-success m-2' onClick={()=>editorderstatus(order,'ACCEPTED')}>ACCEPT ORDER</button>
                                    }
                                    {
                                        order.orderstatus==='ACCEPTED'&&
                                        <button className='btn btn-success m-2' onClick={()=>editorderstatus(order,'IN TRANSIT')}>ORDER IS IN TRANSIT</button>
                                    }
                                    {
                                        order.orderstatus==='IN TRANSIT'&&
                                        <button className='btn btn-success m-2' onClick={()=>editorderstatus(order,'OUT FOR DELIVERY')}>ORDER IS OUT FOR DELIVERY</button>
                                    }
                                    {
                                        order.orderstatus==='OUT FOR DELIVERY'&&
                                        <button className='btn btn-success m-2' onClick={()=>editorderstatus(order,'DELIVERED')}>DELIVERED</button>
                                    }
                                    
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    ))}
            </div>
            :
            <><h5>NO ORDERS TO SHOW</h5></>
            }
    </div>
)
}

export default Manageorders
