import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Card from 'react-bootstrap/Card';


function Checkappointments() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let [appointmentsdata,setAppointmentsdata] = useState('')
  let [error,setError] = useState('')

  async function formSubmit(data)
  {
    console.log(data)
    let appointments = await axios.post('http://localhost:5000/admin-api/pendingappointment',data)
    console.log(appointments)
    appointmentsdata = appointments.data.payload
    console.log(appointmentsdata)
    setAppointmentsdata(appointmentsdata)
  }

  async function cancelappointment(appointment)
    {
        try
        {
            appointment.appointmentstatus="CANCELLED"
            let cancelled = await axios.post('http://localhost:5000/user-api/editappointment',appointment)
            console.log(cancelled)
        }
        catch(err)
        {
            setError(err.message)
        }
    }

  async function appointmentcompleted(appointment)
    {
        try
        {
            appointment.appointmentstatus="COMPLETE"
            console.log("first")
            let complete= await axios.post('http://localhost:5000/user-api/editappointment',appointment)
            console.log(complete)
        }
        catch(err)
        {
            setError(err.message)
        }
    }

  return (
    <div className='text-center'>
      <span >
        <form onSubmit={handleSubmit(formSubmit)}>
          <label htmlFor='service' className='fw-bold m-2'>SERVICE:</label>
          <select id='service' {...register('service',{required:true})}>
          <option value=''>SELECT</option>
          <option value='HEALTH CHECK UP'>HEALTH CHECK UP</option>
          <option value='GROOMING'>GROOMING</option>
          <option value='TRAINING'>TRAINING</option>
          </select>
          <label htmlFor='location' className='fw-bold m-2'>LOCATION:</label>
          <select id='location' {...register('location',{required:true})}>
          <option value=''>SELECT</option>
          <option value='BANGALORE'>BANGALORE</option>
          <option value='CHENNAI'>CHENNAI</option>
          <option value='DELHI'>DELHI</option>
          <option value='HYDERABAD'>HYDERABAD</option>
          </select>
          <label htmlFor='appointmentstatus' className='fw-bold m-2'>STATUS:</label>
          <select id='appointmentstatus' {...register('appointmentstatus',{required:true})}>
          <option value=''>SELECT</option>
          <option value='COMPLETE'>COMPLETE</option>
          <option value='PENDING'>PENDING</option>
          <option value='CANCELLED'>CANCELLED</option>
          </select>
          <label className='fw-bold m-2' htmlFor='date'>SELECT DATE:</label>
          <input type='date' id='date' {...register('date',{required:true})}></input>
          <button className='btn btn-secondary m-2' type='submit'>Search</button>
        </form>
      </span>

      {appointmentsdata.length?
      <>
        <table>
            <tbody>
                {
                    appointmentsdata.map((appointment,index)=>(
                        <tr key={index}>
                            <Card className='m-3'>
                                <Card.Body>
                                    <Card.Title>
                                        SERVICE:{appointment.service}
                                        <span>
                                            {appointment.appointmentstatus!=="CANCELLED"?
                                            <>
                                            <button className='btn btn-danger' onClick={()=>cancelappointment(appointment)}>CANCEL</button>
                                            <button className='btn btn-success' onClick={()=>appointmentcompleted(appointment)}>COMPLETED</button>
                                            </>:
                                            <></>
                                            }
                                        </span>
                                        USER:{appointment.username}
                                    </Card.Title>
                                    <Card.Text>STATUS:{appointment.appointmentstatus}</Card.Text>
                                </Card.Body>
                                <Card.Footer>APPOINTMENT LOCATION:{appointment.location},DATE&TIME:{appointment.date}&{appointment.time}</Card.Footer>
                            </Card>
                        </tr>
                    ))
                }
            </tbody>
        </table>
      </>:
      <>
      <h5>NO APPOINTMENTS TO SHOW</h5>
      </>
        }
    </div>
  )
}

export default Checkappointments
