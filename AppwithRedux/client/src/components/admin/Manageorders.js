import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../../redux/slices/productDetailsSlice';
import Accordion from 'react-bootstrap/Accordion';
import {Alert} from 'react-bootstrap';
import '../Orders.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { userselectedDetailsPromiseSlice } from '../../redux/slices/userselectedDetailsSlice';

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
      filteredOrders = filteredOrders.filter(order => order.order_status.toLowerCase() === searchInput.toLowerCase());
    } else if (searchBy === 'Username') {
      filteredOrders = filteredOrders.filter(order => order.username.toLowerCase() === searchInput.toLowerCase());
    } else if (searchBy === 'Date') {
filteredOrders = filteredOrders.filter(order => order.order_date.includes(searchInput)); // Assuming date format is included in order.date
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
    return sortOrder === 'oldest' ? filteredOrders.sort((a, b) => new Date(a.order_date) - new Date(b.order_date)) :
    filteredOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
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
        order.order_status=status
        let orderstatus = await axios.patch('http://localhost:5000/admin-api/editorderstatus',order)
        if ((orderstatus.data.message === 'ORDER HAS BEEN CANCELLED' || orderstatus.data.message === 'ORDER HAS BEEN ACCEPTED'
        || orderstatus.data.message === 'ORDER IS IN TRANSIT' || orderstatus.data.message === 'ORDER IS OUT FOR DELIVERY' || orderstatus.data.message === 'ORDER HAS BEEN DELIVERED'))
        {
            setAlert(orderstatus.data.message)
            getorders()
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

async function openprofile(user)
    {
        try
        {
            await dispatch(userselectedDetailsPromiseSlice(user))
            navigate('/admin/userprofile')
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
        <select value={searchBy} onChange={handleSelectChange} className='m-3'>
            <option value="">Select search criteria</option>
            <option value="Orderstatus">Order Status</option>
            <option value="Username">Username</option>
            <option value="Date">Date</option>
            <span className='text-start'>
            
            </span>
        </select>
        {renderFormInputs()}
        {filteredOrders.length!==0&&
        <div>
            <select value={sortOrder} onChange={handleSortChange} className='m-3'>
                <option value="oldest">Oldest to Newest</option>
                <option value="newest">Newest to Oldest</option>
            </select>
                {filteredOrders.map((order,index)=>
                    (
                        <div key={index} class="p-5">
                            <div className='cards'>
    <div class="card-body">
        <h6>
            <strong>Ordered On:</strong>{order.ordered_on_date}
        </h6>
        <strong>Ordered by:</strong>
        <span id='health' className='btn' onClick={()=>openprofile(order)}>
            {order.username}   
        </span>
        <span>
            <div>
                <strong>Total Cost:    </strong>
                ₹{order.total_price}
            </div>
        </span>
                
        <article class="cards">
            <div class="card-bodys row">
                <div class="col"> <strong>Status:</strong> <br/>
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
                    {order.order_status==='DELIVERED'&&<span className='text-success m-2'>{order.order_status}</span>}
                    {order.order_status==='ACCEPTED'&&<span className='text-primary m-2'>{order.order_status}</span>}
                    {(order.order_status!=='DELIVERED'&&order.order_status!=='CANCELLED'&&order.order_status!=='ACCEPTED')&&<span className='m-2'>{order.order_status}</span>}
                </div>
                <div class="col"> <strong>Payment Status:</strong> <br/>{order.payment_status}</div>
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
                                            <p><span className='fw-bold'>PRICE:</span>Rs.{orderitem.price}</p>
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
            {/* {
                order.orderstatus!=='CANCELLED'&&
                <div className='text-end'>
                    <hr/>
                    <button className='btn btn-danger' >CANCEL ORDER</button>
                </div>
            } */}

                <div>
                        {(order.order_status!=='CANCELLED' && order.order_status!=='DELIVERED')&&
                            <button className='btn btn-danger m-2' onClick={()=>editorderstatus(order,'CANCELLED')}>CANCEL ORDER</button>
                        }
                        {
                            order.order_status==='PENDING'&&
                            <button className='btn btn-success m-2' onClick={()=>editorderstatus(order,'ACCEPTED')}>ACCEPT ORDER</button>
                        }
                        {
                            order.order_status==='ACCEPTED'&&
                            <button className='btn btn-success m-2' onClick={()=>editorderstatus(order,'IN TRANSIT')}>ORDER IS IN TRANSIT</button>
                        }
                        {
                            order.order_status==='IN TRANSIT'&&
                            <button className='btn btn-success m-2' onClick={()=>editorderstatus(order,'OUT FOR DELIVERY')}>ORDER IS OUT FOR DELIVERY</button>
                        }
                        {
                            order.order_status==='OUT FOR DELIVERY'&&
                            <button className='btn btn-success m-2' onClick={()=>editorderstatus(order,'DELIVERED')}>DELIVERED</button>
                        }
                </div>
        </div>
    </div>

</div>
                ))}
        </div>
        }
</section>
)
}

export default Manageorders
