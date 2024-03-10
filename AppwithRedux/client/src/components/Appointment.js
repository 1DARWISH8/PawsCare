import React, { useContext, useEffect, useState } from 'react'
import { userLoginContext } from '../contexts/userLoginContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Appointment() {

    let navigate= useNavigate()
    let {currentUser}=useSelector(state=>state.userLogin)
    // let [currentUser,setCurrentUser]=useContext(userLoginContext)
    let [error,setError]=useState('')
    // let {register,handleSubmit,formState:{errors}}=useForm()
    // let [booking,setBooking]=useState(true)
    let [appointmentsdata,setAppointmentsdata]=useState('')
    // let appointmentsdata
    // console.log(booking)


    async function getappointments()
    {
        try
        {
            // setBooking(false)
            appointmentsdata  = await axios.post('http://localhost:5000/user-api/appointments',currentUser)
            appointmentsdata = appointmentsdata.data.payload
            setAppointmentsdata(appointmentsdata)
            console.log(appointmentsdata)
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    async function bookappointment()
    {
        navigate('/home/bookappointment')
    }

    useEffect(()=>(getappointments),[])

    async function cancelappointment(appointment)
    {
        try
        {
            appointment.appointmentstatus="CANCELLED"
            let cancelled = await axios.post('http://localhost:5000/user-api/editappointment',appointment)
            console.log(cancelled)
            getappointments()
        }
        catch(err)
        {
            setError(err.message)
        }
    }

return (
    <div>
        <button className='btn btn-warning' onClick={bookappointment}>BOOK APPOINTMENTS</button>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {appointmentsdata.length&&
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
                                            </>:
                                            <></>
                                            }
                                        </span>
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
        }
    </div>
)
}

export default Appointment
