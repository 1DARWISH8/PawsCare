import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Card from 'react-bootstrap/Card';
import userselectedDetailsSlice, { userselectedDetailsPromiseSlice } from '../../redux/slices/userselectedDetailsSlice';

function Bookuserappointment() {

    let navigate= useNavigate()
    let [error,setError]=useState('')
    // let {register,handleSubmit,formState:{errors}}=useForm()
    let [bookingtype,setBookingType]= useState('Existing')
    let [users,setUsers] = useState([])
    let dispatch = useDispatch()


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
        
        const settype = (x) =>
        {
            setBookingType(x)
        }
        
        async function bookappointment(user)
        {
            dispatch(userselectedDetailsPromiseSlice(user))
            navigate('/admin/adminbookappointment')
        }


        return (
    <div>
        <div className='text-center'>
            <button className='m-3 btn btn-primary' onClick={()=>settype("Existing")}>EXISTING USER</button>
            <button className='m-3 btn btn-secondary' onClick={()=>settype('New')}>NEW USER</button>
        </div>

        <div className='text-center'>
            { bookingtype==='Existing'?
                <>
                    <input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={handleChange}/>

{searchResults.length?
    <>
        <table>
            <tbody>
                {
                    searchResults.map((user,index)=>(
                        <tr key={index} className='text-center'>
                            <Card className='m-3'>
                                <Card.Body>
                                    <Card.Title>
                                        USER:{user.username}
                                        <span>
                                            <button className='btn btn-success' onClick={()=>bookappointment(user)}>BOOK APPOINTMENT</button>
                                            {/* {booking===true&&</>} */}
                                        </span>
                                    </Card.Title>
                                    <Card.Text>STATUS:{user.accountstatus}</Card.Text>
                                </Card.Body>
                                <Card.Footer>LOCATION:{user.location},DATE&TIME:{user.date}&{user.time}</Card.Footer>
                            </Card>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </>:
    <>
    <h5>NO USERS TO SHOW</h5>
    </>
    }
    </>:
    <></>
            }
                </div>
    
    </div>
)
}

export default Bookuserappointment
