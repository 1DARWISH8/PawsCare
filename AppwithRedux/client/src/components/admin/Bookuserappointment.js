import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { userselectedDetailsPromiseSlice } from '../../redux/slices/userselectedDetailsSlice';
import './Bookuserappointment.css'
import Table from 'react-bootstrap/Table'
import Alerts from '../Alerts';

function Bookuserappointment() {

    let navigate= useNavigate()
    let dispatch = useDispatch()

    // Alert
    let [Alert,setAlert] = useState('')
    let [message,setMessage] = useState('')
    let [type,setType] = useState('')

    // Hide Alert after 3 seconds
    const hideAlert = () =>
    {
        setTimeout(()=>
        {
            setAlert(false);
        },3000);
    }


    let [users,setUsers] = useState([])
    let [order,setOrder] = useState('List')

    async function openprofile(user)
    {
        try
        {
            await dispatch(userselectedDetailsPromiseSlice(user))
            navigate('/admin/userprofile')
        }
        catch(err)
        {
            setMessage(err.message)
            setType("failure")
            setAlert(true)
        }
    }

    // GET All THE USERS
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
            setMessage(err.message)
            setType("failure")
            setAlert(true)
        }
    }
    useEffect(()=>getusers,[])


    // Search for Users
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = (e) => 
    {
        setSearchTerm(e.target.value);
        const results = users.filter(user =>
            user.username.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResults(results);
    };
    
    // Book appointment for a user
    async function bookappointment(user)
    {
        try
        {
            await dispatch(userselectedDetailsPromiseSlice(user))
            navigate('/admin/adminbookappointment')
        }
        catch(err)
        {
            setMessage(err.message)
            setType("failure")
            setAlert(true)
        }
    }


return (
    <div>

<Alerts show={Alert} type={type} message={message} onClose={()=>setAlert(false)} />

    <div className=' mt-3'>
        <div className='search'>
            <form className='text-start mx-4'>
                <input
                type="text"
                placeholder="Search by username"
                value={searchTerm}
                onChange={handleChange}/>  
            </form>
            <span className='mx-4 fw-bold'>
                VIEW:
                <button className='listview btn' onClick={()=>(setOrder('List'))}>
                    <i class="fas fa-list"></i>
                </button>
                <button className='cardview btn' onClick={()=>(setOrder('Card'))}>
                    <i class="fas fa-th-large"></i>
                </button>
            </span>
        </div>
{searchResults.length?
    <>
        {
            order==="List"?
            <div class="list w-100">
                <Table striped responsive hover>
                <thead className='text-center'>
                    <tr>
                    <th >Image</th>
                    <th>User Name</th>
                    <th>Account Status</th>
                    <th>Book Appointment</th>
                    <th>Phone</th>
                    </tr>
                </thead>
                <tbody >
                {searchResults.map((user,index)=>(
                    <tr key={index} className='text-center' >
                        <td >
                            <img  src={user.profileImageURL} className='rounded-circle m-1' width="40"/>
                        </td>
                        <td  onClick={()=>openprofile(user)}>
                            <span className='btn'>
                                {user.username}
                            </span></td>
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
                        {
                            user.accountstatus==="ACTIVE"?
                            <td>
                                <button className='btn btn-success' onClick={()=>bookappointment(user)}>BOOK</button>
                            </td>
                            :
                            <td  >
                                <button className='btn btn-success' disabled onClick={()=>bookappointment(user)}>BOOK</button>
                            </td>
                        }
                        
                        <td>+91 {user.phonenumber}</td>
                    </tr>
                ))}
                </tbody>
                </Table>
                <div class="bottom">
                    <div class="showing">
                    <span>Showing {searchResults.length} Results</span>
                    </div>
                </div>
                </div>
            :
            <section id='profile-cards'>
            <div class="row text-center">
            {
            searchResults.map((user,index)=>(
                <div key={index} className="col-md-3 m-5">
                <div className="card profile-card-3 m-3">
                    <div className="background-block">
                        {/* <img src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712649955/paws_qnn5le.jpg" alt="profile-sample1" className="background"/> */}
                    </div>
                    <div className="profile-thumb-block">
                        <img src={user.profileImageURL} alt="profile-image" className="profile"/>
                    </div>
                    <div className="card-content">
                        <h2 className='btn' onClick={()=>openprofile(user)}>
                        {user.username}
                        </h2>
                        <div>
                        <small>
                            STATUS:
                            {
                            user.accountstatus === "ACTIVE"?
                            <span className='m-2 fw-bold text-success'>
                            {user.accountstatus}
                            </span>
                            :
                            <span className='m-2 fw-bold text-danger'>
                            {user.accountstatus}
                            </span>
                            }
                        </small>
                        </div>
                        {/* <div className="icon-block"><a href="#"><i className="fa fa-facebook"></i></a><a href="#"> <i className="fa fa-twitter"></i></a><a href="#"> <i className="fa fa-google-plus"></i></a></div> */}
                        <span >
                            {user.accountstatus==="ACTIVE"?
                            <button className='btn btn-success mt-3' onClick={()=>bookappointment(user)}>BOOK</button>
                            :
                            <button className='btn btn-success mt-3' disabled onClick={()=>bookappointment(user)}>BOOK</button>
                            }
                        </span>
                    </div>
                </div>
                </div>
            ))
            }
            </div>
            <div class="bottom">
                <div class="showing">
                <span>Showing {searchResults.length} Results</span>
                </div>
            </div>
            </section>
        }
        
    </>:
    <>
    <h5>NO USERS TO SHOW</h5>
    </>
    }
    </div>
    </div>
)
}

export default Bookuserappointment
