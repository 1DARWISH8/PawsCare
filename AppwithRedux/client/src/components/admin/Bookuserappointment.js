import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import SearchUser from './SearchUser';


function Bookuserappointment() {

    let navigate= useNavigate()
    let [error,setError]=useState('')
    let {register,handleSubmit,formState:{errors}}=useForm()

    let [users,setUsers] = useState([])


    async function getusers()
    {
        try
        {
        users = await axios.get('http://localhost:5000/admin-api/getusers')
        if (users)
        {
            setUsers(users.data.payload)
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

return (
    <div>
    <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleChange}
    />
    <ul>
        {searchResults.map(user => (
        
            <li>{user.id}{user.username}</li>))}
    </ul>
    </div>
)
}

export default Bookuserappointment
