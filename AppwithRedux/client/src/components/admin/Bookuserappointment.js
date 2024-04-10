import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import {useDispatch} from 'react-redux'
import Card from 'react-bootstrap/Card';
import { userselectedDetailsPromiseSlice } from '../../redux/slices/userselectedDetailsSlice';
import './Bookuserappointment.css'
import Table from 'react-bootstrap/Table'

function Bookuserappointment() {

    let navigate= useNavigate()
    let [error,setError]=useState('')
    let [users,setUsers] = useState([])
    let dispatch = useDispatch()

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
    
    useEffect(()=>getusers,[])


    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        const results = users.filter(user =>
            user.username.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResults(results);
        };
        
        async function bookappointment(user)
        {
            try
            {
                await dispatch(userselectedDetailsPromiseSlice(user))
                navigate('/admin/adminbookappointment')
            }
            catch(err)
            {
                setError(err.message)
            }
        }


        return (
    <div>
            {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}

        

        <div className='text-center mt-3'>
                <div className='search'>
                    <form className='text-start mx-4'>
                        <input
                        type="text"
                        placeholder="Search by username"
                        value={searchTerm}
                        onChange={handleChange}/>  
                    </form>
                </div>
{searchResults.length?
    <>
        <div class="list w-100">
        
        <Table striped responsive hover>
        <thead>
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
                <td>
                    <button className='btn btn-success' onClick={()=>bookappointment(user)}>BOOK</button>
                </td>
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
