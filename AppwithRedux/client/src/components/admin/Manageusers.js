import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';

function Manageusers() {

  let [users,setUsers] = useState('')
  let [error,setError] = useState('')

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
      setError(err)
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
      setError(err)
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
      }     
    }
    catch(err)
    {
      setError(err.message)
    }
  }

  useEffect(()=>getusers,[])


  return (
    <div>USERS
      {users.length?
      <>
        <table>
            <tbody>
                {
                    users.map((user,index)=>(
                        <tr key={index}>
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
      <h5>NO USERS TO SHOW</h5>
      </>
        }
    </div>
  )
}

export default Manageusers
