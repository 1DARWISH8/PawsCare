import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { BiCalendar } from 'react-icons/bi';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './Dashboard.css'
import { Table } from 'react-bootstrap'
import { userselectedDetailsPromiseSlice } from '../../redux/slices/userselectedDetailsSlice'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Dashboard() {

  let dispatch = useDispatch()
  let [error,setError] = useState([])
  let navigate= useNavigate()
  const [searchResults, setSearchResults] = useState([]);
  let [users,setUsers] = useState('')
  let [appointmentsdata,setAppointmentsdata] = useState('')
  let [seeappointmentsdata,setSeeappointmentsdata] = useState('')
  let [products,setProducts]=useState([])
  let [orders,setOrders] = useState([])
  let [totalcost,setTotalcost]=useState()
  let [deliveries,setDeliveries]=useState()
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedService, setService] = useState('HEALTH CHECK UP');
  const [selectedLocation, setLocation] = useState('BANGALORE');

    // Function to handle date change
    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
    };

  async function getusers()
  {
    try
    {
      users = await axios.get('http://localhost:5000/admin-api/getusers')
      if (users)
      {
        setUsers(users.data.payload)
        setSearchResults(users.data.payload)
      }     
    }
    catch(err)
    {
      setError(err.message)
    }
  }

  async function openprofile(user)
    {
      if(user.booked_by!=='')
      {
        let username = user.booked_by
        user = {...user,username}
      }
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

  async function getallappointments()
  {
    try
    {
      let appointments = await axios.get('http://localhost:5000/admin-api/getallappointments')
      setAppointmentsdata(appointments.data.payload)
    }
    catch(err)
    {
      setError(err.message)
    }
  }

  async function viewproducts()
  {
    try
    {
      let products = await axios.get('http://localhost:5000/user-api/getallproducts')
      if (products)
      {
        setProducts(products.data.payload)
      }
    }
    catch(err)
    {
      setError(err.message)
    }
  }

  async function getorders()
    {
    try
        {
            let orders = await axios.get(`http://localhost:5000/admin-api/getorders`)
            setOrders(orders.data.payload)
            if (orders)
            {
              let orders_data = orders.data.payload
              if(orders_data.length>0)
              {
                let total_cost = 0
                let successful_deliveries = 0
                for (let order of orders_data)
                {
                  total_cost += order.total_price
                  if (order.order_status==='DELIVERED')
                  {
                    successful_deliveries += 1
                  }
                }
                setTotalcost(total_cost)
                setDeliveries(successful_deliveries)              
              }
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

    
    useEffect(()=>getusers,[])
    useEffect(()=>getallappointments,[])
    useEffect(()=>viewproducts,[])
    useEffect(()=>getorders,[])

    useEffect(()=>
    {      
      // retrieve slots according to the inputs
      get_specific_appointments(selectedService,selectedLocation,selectedDate)
    },[selectedService,selectedLocation,selectedDate])

  async function Manage_users()
  {
    navigate('/admin/manageusers')
  }

  async function Manage_appointments()
  {
    navigate('/admin/checkappointment')
  }
  async function Manage_store()
  {
    navigate('/admin/managestore')
  }
  async function Manage_orders()
  {
    navigate('/admin/manageorders')
  }


  async function get_specific_appointments(selectedService,selectedLocation,selectedDate)
  {
    try
    {
      let appointments = await axios.get(`http://localhost:5000/admin-api/getspecificappointments?date=${selectedDate}&location=${selectedLocation}&service=${selectedService}`)
      if (appointments.data.message==="APPOINTMENTS")
      {
        setSeeappointmentsdata(appointments.data.payload[0].slots)
      }
      else
      {
        setError(appointments.data.message)
      }
    }
    catch(err)
    {
      setError(err.message)
    }
  }

return (
    <div className='container-fluid'>
    <section id="minimal-statistics">


    <div className="row mt-4">

        <div className="col-xl-3 col-sm-6 col-12 p-3"> 
        <OverlayTrigger
                      key={'bottom'}
                      placement={'bottom'}
                      overlay={
                        <Tooltip id={`tooltip-users`}>
                          Manage <strong>Users</strong>.
                        </Tooltip>
                      }
                      >
                          <div className="card-btn l-bg-cherry" onClick={Manage_users}>
            <div className="card-body fw-bold" id='cardtitle'>
                <div className="row align-items-center">
                <div className="col-auto">
                  <i className="bi bi-person fs-1" id='person'></i>
                </div>
                <div className='col text-end'>
                    <h3>{users.length}</h3>
                      <span>
                        USERS
                      </span>
                </div>
            </div>
            </div>
        </div>
        </OverlayTrigger>
    </div>

    <div className="col-xl-3 col-sm-6 col-12 p-3">
        <OverlayTrigger
          key={'bottom'}
          placement={'bottom'}
          overlay=
          {
            <Tooltip id={`tooltip-users`}>
              Manage <strong>Appointments</strong>.
            </Tooltip>
          }
        >
        <div className="card-btn l-bg-green-dark" onClick={Manage_appointments}>
                <div className="card-body" id='cardtitle'>
                <div className="row align-items-center">
                    <div className="col-auto">
                        <BiCalendar className="fs-1" id='appointment-calendar'/>
                    </div>
                    <div className="col text-end">
                            <h3>{appointmentsdata.length}</h3>
                            <span>APPOINTMENTS</span>
                    </div>
                </div>
            </div>
        </div>
      </OverlayTrigger>
    </div>

    <div className="col-xl-3 col-sm-6 col-12 p-3"> 
        <div className="card-btn l-bg-green-dark" onClick={Manage_store}>
        <OverlayTrigger
                      key={'bottom'}
                      placement={'bottom'}
                      overlay={
                        <Tooltip id={`tooltip-users`}>
                          Manage <strong>Store</strong>.
                        </Tooltip>
                      }
                      >
            <div className="card-body" id='cardtitle'>
                <div className="row align-items-center">
                    <div className="col-auto">
                        <i className="bi bi-box fs-1" id='product-box'></i>                    </div>
                    <div className='col'>
                        <div className="text-end">
                            <h3>{products.length}</h3>
                            <span>PRODUCTS</span>
                        </div>
                    </div>
                </div>
            </div>
            </OverlayTrigger>
        </div>
    </div>


    <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="card-btn l-bg-cherry" onClick={Manage_orders}>
        <OverlayTrigger
                      key={'bottom'}
                      placement={'bottom'}
                      overlay={
                        <Tooltip id={`tooltip-users`}>
                          Manage <strong>Orders</strong>.
                        </Tooltip>
                      }
                      >
            <div className="card-body" id='cardtitle'>
                <div className="row align-items-center">
                    <div className="col-auto">
                        <i className="bi bi-cart fs-1" id='cart'></i>                    
                    </div>
                    <div className="col">
                        <div className="text-end">
                            <h3>{orders.length}</h3>
                            <span>ORDERS PLACED</span>
                        </div>
                    </div>
                </div>
            </div>
        </OverlayTrigger>
        </div>
    </div>
</div>


<div className="row">

    <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="cards l-bg-green-dark">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="text-start">
                            <h3>4</h3>
                            <span>STATES</span>
                        </div>
                    </div>
                    <div className="col-auto">
                        <i className="bi bi-geo fs-1"></i>                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="col-xl-3 col-sm-6 col-12 p-3"> 
        <div className="cards l-bg-cherry">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <i className="bi bi-truck fs-1"></i>                    </div>
                    <div className='col'>
                        <div className="text-end">
                            <h3>{deliveries}</h3>
                            <span>ORDERS DELIVERED</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="cards l-bg-cherry">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="text-start">
                            <h3><i class="bi bi-currency-rupee">{totalcost}</i></h3>
                            <span>GROSS SALES</span>
                        </div>
                    </div>
                    <div className="col-auto">
                      <i class="bi bi-currency-rupee fs-1" id='rupee'></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

      <div className="col-xl-3 col-sm-6 col-12 p-3">
        <div className="cards l-bg-orange">
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="media-body text-left">
                  <h3 className="primary">423</h3>
                  <span>Support Tickets</span>
                </div>
                <div className="align-self-center">
                  <i className="icon-support primary font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  </section>
  
  <section id="stats-subtitle">
  {/* <div className="row">
    <div className="col-12 mt-3 mb-1">
      <h4 className="text-uppercase">Statistics With Subtitle</h4>
      <p>Statistics on minimal cards with Title Sub Title.</p>
    </div>
  </div> */}

  <div className="row">

  <div className="col-xl-6 col-md-12 p-4">
      <div className="cards overflow-hidden">
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch">
              <div className="align-self-center">
                <i className="icon-speech warning font-large-2 mr-2"></i>
              </div>
              <div className="media-body">
                <h4 className='fs-3 p-2' id='health'>Appointments</h4>
                <form>
                  <label className='fw-bold p-2'>Service:</label>
                  <select  value={selectedService} onChange={(e) => setService(e.target.value)}>
                    <option value='HEALTH CHECK UP'>HEALTH CHECK UP</option>
                    <option value='GROOMING'>GROOMING</option>
                    <option value='TRAINING'>TRAINING</option>
                  </select>
                  <label className='fw-bold p-2'>Location:</label>
                  <select  value={selectedLocation} onChange={(e) => setLocation(e.target.value)}>
                    <option value='BANGALORE'>BANGALORE</option>
                    <option value='CHENNAI'>CHENNAI</option>
                    <option value='HYDERABAD'>HYDERABAD</option>
                    <option value='VISAKHAPATNAM'>VISAKHAPATNAM</option>
                  </select>
                  <label className='fw-bold p-2'>Date:</label>
                  <input type='date' value={selectedDate} onChange={handleDateChange}></input>
                </form>
              </div>
              <div className="align-self-center">
                {
                  seeappointmentsdata.length!==0?
                  <>
                    <Table striped responsive hover>
                      <thead>
                          <tr>
                          <th >Time Slot</th>
                          <th>Status</th>
                          <th className='text-center'>BOOKED BY USER</th>
                          </tr>
                      </thead>
                      <tbody >
                      {seeappointmentsdata.map((appointment,index)=>(
                          <tr key={index}>
                              <td >
                                {appointment.appointment_time}
                              </td>
                              <td>
                                  {
                                    appointment.appointment_status==="available"?
                                    <span className='text-uppercase text-primary'>
                                      {appointment.appointment_status}
                                    </span>
                                    :
                                    <span className='text-uppercase text-success fw-bold
                                    '>
                                      {appointment.appointment_status}
                                    </span>
                                  }
                              </td>
                              <td className='text-center'>
                                {
                                appointment.booked_by==='none'
                                  ?
                                  <span >--
                                  </span>
                                  :
                                  <span className='btn p-0 fw-bold' onClick={()=>openprofile(appointment)} style={{color:'#b40404'}}>
                                    {appointment.booked_by}
                                  </span>}
                              </td>
                          </tr>
                      ))}
                      </tbody>
                      </Table>
                  </>
                  :
                  <>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-xl-6 col-md-12 p-4">
      <div className="cards overflow-hidden">
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch">
              <div className="align-self-center">
                <i className="icon-pencil primary font-large-2 mr-2"></i>
              </div>
              <div className="media-body">
                <h4 className='fs-3 p-2' id='health'>Users</h4>
              </div>
              <Table striped responsive hover>
        <thead>
            <tr>
            <th >Image</th>
            <th>User Name</th>
            <th>Pet</th>
            <th className='text-center'>Account Status</th>
            </tr>
        </thead>
        <tbody >
        {searchResults.map((user,index)=>(
            <tr key={index}>
                <td >
                    <img  src={user.profileImageURL} className='rounded-circle m-1' width="40"/>
                </td>
                <td  onClick={()=>openprofile(user)}>
                    <span className='btn'>
                        {user.username}
                    </span></td>
                <td>
                  {user.petdetails[0].petname}
                </td>
                {
                    user.accountstatus==="ACTIVE"?
                    <td id='active-status' >
                        <button>
                        {user.accountstatus}
                        </button>
                    </td>
                    :
                    <td id='inactive-status' >
                        <button>
                        {user.accountstatus}
                        </button>
                    </td>
                }
            </tr>
        ))}
        </tbody>
        </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</section>
    </div>
  )
}

export default Dashboard
