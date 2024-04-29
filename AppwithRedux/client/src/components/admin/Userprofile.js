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
    <section>
	{error.length!==0&&<p className='fs-3 text-danger'>{error}</p>}
	{alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
	<div className="pt-3">
		<div className="main-body">
			<div className="row">
				<div className="col-lg-4">
					<div className="car m-3">
						<div className="card-body">
							<div className="d-flex flex-column align-items-center text-center">
								{
									selectedUser.profileImageURL&&
									<img src={selectedUser.profileImageURL} alt={selectedUser.username} className="rounded-circle p-1 " width="200" height="150"/>
								}
								<div className="nav-link mt-3" >
									<h4 className='fw-bold'>{selectedUser.username}</h4>
									<div className="text-black mb-1">Owner of {selectedUser.petdetails[0].petname}
									</div>
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
					<div className="car m-3">
						<div className="card-body">
                            <h4 className='text-center fs-5' id="pawscare">USER DETAILS</h4>
							<div className="row mb-3 mt-4">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Name:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{selectedUser.username}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Email:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{selectedUser.email}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Phone Number:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{selectedUser.phonenumber}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Address:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{selectedUser.address[0].addressline}, {selectedUser.address[0].district}, {selectedUser.address[0].state}, {selectedUser.address[0].country},   {selectedUser.address[0].pincode}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
                <div className="pt-2">
					<div className=" m-3 ">
                            <h4 className='text-center fs-5 mt-5' id="pawscare">PET DETAILS</h4>
							<div className="row mb-3 mt-4">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Pet Name:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{selectedUser.petdetails[0].petname}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">ANIMAL:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{selectedUser.petdetails[0].petanimal}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">DATE OF BIRTH:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{selectedUser.petdetails[0].dob}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Previous Health Checkup:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{selectedUser.petdetails[0].last_checkup_date}</p>
								</div>
							</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    </section>
  )
}

export default Userprofile
