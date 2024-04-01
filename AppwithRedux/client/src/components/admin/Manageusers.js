import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import {useDispatch} from 'react-redux'
import { userselectedDetailsPromiseSlice } from '../../redux/slices/userselectedDetailsSlice';
import {useNavigate} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';

function Manageusers() {

  let [users,setUsers] = useState('')
  let [error,setError] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let dispatch = useDispatch()
  let navigate= useNavigate()



  async function deactivateuser(user)
  {
    try
    {
      user.accountstatus = "DEACTIVATED"
      let deactivated = await axios.post('http://localhost:5000/admin-api/changeuserstatus',user)
      if (deactivated)
      {
        getusers()
      }
    }
    catch(err)
    {
      setError(err.message)
    }
  }

  async function activateuser(user)
  {
    try
    {
      user.accountstatus = "ACTIVE"
      let activated = await axios.post('http://localhost:5000/admin-api/changeuserstatus',user)
      if (activated)
      {
        getusers()
      }
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

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const results = users.filter(user =>
    user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
};

async function openprofile(user)
    {
        dispatch(userselectedDetailsPromiseSlice(user))
        navigate('/admin/userprofile')
    }

  return (
    <div>
      {error.length!==0&&<p>{error}</p>}
      <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleChange}
        />
      {searchResults.length?
      <>
        <table>
            <tbody>
                {
                    searchResults.map((user,index)=>(
                        <tr key={index} onClick={()=>openprofile(user)}>
                            <Card className='m-3'>
                                <Card.Body>
                                    <Card.Title>
                                        USER:{user.username}
                                        <span>
                                            {user.accountstatus==="ACTIVE"?
                                            <button className='btn btn-danger' onClick={()=>deactivateuser(user)}>DEACTIVATE</button>
                                            :
                                            <button className='btn btn-success' onClick={()=>activateuser(user)}>ACTIVATE</button>
                                            }
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
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
      <h5>NO USERS TO SHOW</h5>
      </>
        }
    </div>
  )
}

export default Manageusers
