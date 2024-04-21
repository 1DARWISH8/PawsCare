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

function Dashboard() {

  let dispatch = useDispatch()
  let [error,setError] = useState([])
  let navigate= useNavigate()
  const [searchResults, setSearchResults] = useState([]);
  let [users,setUsers] = useState('')
  let [appointmentsdata,setAppointmentsdata] = useState('')
  let [products,setProducts]=useState([])
  let [orders,setOrders] = useState([])
  let [totalcost,setTotalcost]=useState()
  let [deliveries,setDeliveries]=useState()

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
            // console.log(orders.data.payload)
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
                  total_cost += order.totalprice
                  if (order.orderstatus==='DELIVERED')
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
                            <h3>156</h3>
                            <span>LOCATIONS</span>
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
                      <i class="bi bi-currency-rupee fs-1" id='rupee'></i>                   </div>
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
    <div className="col-xl-12 col-md-12 p-4">
      <div className="cards overflow-hidden">
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch">
              <div className="align-self-center">
                <i className="icon-pencil primary font-large-2 mr-2"></i>
              </div>
              <div className="media-body">
                <h4 className='fw-bold'>Users
                </h4>
                {/* <span>Monthly blog posts</span> */}
              </div>
              {/* <div className="align-self-center">
                <h1>18,000</h1>
              </div> */}
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

    {/* <div className="col-xl-6 col-md-12 p-2">
      <div className="card">
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch">
              <div className="align-self-center">
                <i className="icon-speech warning font-large-2 mr-2"></i>
              </div>
              <div className="media-body">
                <h4>Total Comments</h4>
                <span>Monthly blog comments</span>
              </div>
              <div className="align-self-center"> 
                <h1>84,695</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col-xl-6 col-md-12 p-2">
      <div className="card">
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch">
              <div className="align-self-center">
                <h1 className="mr-2">$76,456.00</h1>
              </div>
              <div className="media-body">
                <h4>Total Sales</h4>
                <span>Monthly Sales Amount</span>
              </div>
              <div className="align-self-center">
                <i className="icon-heart danger font-large-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-xl-6 col-md-12 p-2">
      <div className="card">
        <div className="card-content">
          <div className="card-body cleartfix">
            <div className="media align-items-stretch">
              <div className="align-self-center">
                <h1 className="mr-2">$36,000.00</h1>
              </div>
              <div className="media-body">
                <h4>Total Cost</h4>
                <span>Monthly Cost</span>
              </div>
              <div className="align-self-end">
              <FontAwesomeIcon icon={faWallet} className="success" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
</section>
    </div>
  )
}

export default Dashboard
