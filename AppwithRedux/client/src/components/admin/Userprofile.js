import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { userselectedDetailsPromiseSlice } from '../../redux/slices/userselectedDetailsSlice';
import {Alert} from 'react-bootstrap';

function Userprofile() {

  let navigate=useNavigate()
	let dispatch = useDispatch()
  let {selectedUser} = useSelector(state=>state.userselected)
  let [error,setError] = useState([])
  let user = {...selectedUser}
  let [alert,setAlert] = useState('')

  async function bookappointment()
        {
            // dispatch(userselectedDetailsPromiseSlice(user))
            navigate('/admin/adminbookappointment')
        }

  async function deactivateuser(user)
  {
    try
    {
      user.accountstatus="DEACTIVATED"
      let deactivated = await axios.post('http://localhost:5000/admin-api/changeuserstatus',user)
      if (deactivated)
      {
        setAlert('USER DEACTIVATED')
		dispatch(userselectedDetailsPromiseSlice(deactivated.data.payload))
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
    	user.accountstatus="ACTIVE"
    	let activated = await axios.post('http://localhost:5000/admin-api/changeuserstatus',user)
    	if (activated)
    	{
        	setAlert('USER ACTIVATED')
			dispatch(userselectedDetailsPromiseSlice(activated.data.payload))
    	}
    }
    catch(err)
    {
    	setError(err.message)
    }
  }

const hideAlert = () =>
{
    setTimeout(()=>
    {
        setAlert('');
    },5000);
}

useState(()=>
{
    hideAlert();
},[])



  return (
    <div>
	{error.length!==0&&<p className='fs-3 text-danger'>{error}</p>}
	{alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
		<div className="container pt-3">
	        	<div className="main-body">
	        		<div className="row">
	        			<div className="col-lg-4">
	        				<div className="card m-3">
	        					<div className="card-body">
	        						<div className="d-flex flex-column align-items-center text-center">
	        							{/* <img src={selectedUser.imageupload} alt={selectedUser.petanimal} className="rounded-circle p-1 bg-primary" width="150"/> */}
	        							<div className="mt-3">
	        								<h4>{selectedUser.username}</h4>
	        								<p className="text-black mb-1">Owner of {selectedUser.petdetails[0].petname}</p>
	        							</div>
                            {
                            	selectedUser.accountstatus==="ACTIVE"?
                            	<>
                            	<button className='btn btn-danger' onClick={()=>deactivateuser(user)}>DEACTIVATE USER</button>
                            	<button className='btn btn-primary p-2 m-3 fw-bold' onClick={bookappointment}>BOOK APPOINTMENT</button>
                            	</>
                            	:
                            	<button className='btn btn-success' onClick={()=>activateuser(user)}>ACTIVATE USER</button>
                            }
	        						</div>
	        					</div>
	        				</div>
	        			</div>
	        			<div className="col-lg-8 pt-2">
	        				<div className="card m-3">
	        					<div className="card-body">
                                    <h4 className='text-center fs-5'>USER DETAILS</h4>
	        						<div className="row mb-3">
	        							<div className="col-sm-3">
	        								<h6 className="mb-0">Name:</h6>
	        							</div>
	        							<div className="col-sm-9 text-secondary">
                                            <p className='form-control'>{selectedUser.username}</p>
	        							</div>
	        						</div>
	        						<div className="row mb-3">
	        							<div className="col-sm-3">
	        								<h6 className="mb-0">Email:</h6>
	        							</div>
	        							<div className="col-sm-9 text-secondary">
                                            <p className='form-control'>{selectedUser.email}</p>
	        							</div>
	        						</div>
	        						<div className="row mb-3">
	        							<div className="col-sm-3">
	        								<h6 className="mb-0">Phone Number:</h6>
	        							</div>
	        							<div className="col-sm-9 text-secondary">
                                            <p className='form-control'>{selectedUser.phonenumber}</p>
	        							</div>
	        						</div>
	        						<div className="row mb-3">
	        							<div className="col-sm-3">
	        								<h6 className="mb-0">Address</h6>
	        							</div>
	        							<div className="col-sm-9 text-secondary">
                                            <p className='form-control'>{selectedUser.address[0].addressline},{selectedUser.address[0].pincode}</p>
	        							</div>
	        						</div>
	        					</div>
	        				</div>
	        			</div>
                        <div className="col-lg-8 pt-2">
	        				<div className="card m-3">
	        					<div className="card-body">
                                    <h4 className='text-center fs-5'>PET DETAILS</h4>
	        						<div className="row mb-3">
	        							<div className="col-sm-3">
	        								<h6 className="mb-0">PetName:</h6>
	        							</div>
	        							<div className="col-sm-9 text-secondary">
                                            <p className='form-control'>{selectedUser.petdetails[0].petname}</p>
	        							</div>
	        						</div>
	        						<div className="row mb-3">
	        							<div className="col-sm-3">
	        								<h6 className="mb-0">ANIMAL:</h6>
	        							</div>
	        							<div className="col-sm-9 text-secondary">
                                            <p className='form-control'>{selectedUser.petdetails[0].petanimal}</p>
	        							</div>
	        						</div>
	        						<div className="row mb-3">
	        							<div className="col-sm-3">
	        								<h6 className="mb-0">DATE OF BIRTH:</h6>
	        							</div>
	        							<div className="col-sm-9 text-secondary">
                                            <p className='form-control'>{selectedUser.petdetails[0].dob}</p>
	        							</div>
	        						</div>
	        						<div className="row mb-3">
	        							<div className="col-sm-3">
	        								<h6 className="mb-0">Previous Health Checkup:</h6>
	        							</div>
	        							<div className="col-sm-9 text-secondary">
                                            <p className='form-control'>{selectedUser.petdetails[0].checkupdate}</p>
	        							</div>
	        						</div>
	        					</div>
	        				</div>
	        			</div>
                        <div className="col-lg-4">
	        				<div className="card m-3">
	        					<div className="card-body">
	        						<div className="d-flex flex-column align-items-center text-center">
	        								<h4>Appointment Details</h4>
	        							<div className="mt-3">
                                            {selectedUser.appointments?.service?
                                            <div>
                                                <p>SERVICE:
                                                    <span className='form-control'>{selectedUser.appointments.service}</span>
                                                </p>
                                                <p>LOCATION:
                                                    <span className='form-control'>{selectedUser.appointments.location}</span>
                                                </p>
                                                <p>DATE,TIME:
                                                    <span className='form-control'>{selectedUser.appointments.date},{selectedUser.appointments.time}</span>
                                                </p>
                                            </div>
                                            :
                                            <p className="text-black mb-1">No Appointment has been booked</p>
                                            }
	        							</div>
	        						</div>
	        					</div>
	        				</div>
	        			</div>
	        		</div>
	        	</div>
	        </div>
    </div>
  )
}

export default Userprofile
