import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { logOut } from '../redux/slices/userLoginSlice'

function Profile() {

    let navigate=useNavigate()
	let dispatch = useDispatch()
	let {currentUser}=useSelector(state=>state.userLogin)
	let userType = currentUser.userType


    function logout()
    {
        dispatch(logOut())
		sessionStorage.removeItem('token')
        navigate('/getstarted')
    }

return (
    <div>
		{
			userType==='user'?
			<>
			<div className='text-center'>
        </div>
        <div className="container pt-3">
		<div className="main-body">
			<div className="row">
				<div className="col-lg-4">
					<div className="card m-3">
						<div className="card-body">
							<div className="d-flex flex-column align-items-center text-center">
								{/* <img src={currentUser.imageupload} alt={currentUser.petanimal} className="rounded-circle p-1 bg-primary" width="150"/> */}
								<div className="mt-3">
									<h4>{currentUser.username}</h4>
									<p className="text-black mb-1">Owner of {currentUser.petname}</p>
								</div>
                                <button className='btn btn-danger p-2 mt-3 fw-bold' onClick={logout}>LOG OUT</button>
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
                                    <p className='form-control'>{currentUser.username}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Email:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='form-control'>{currentUser.email}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Phone Number:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='form-control'>{currentUser.phonenumber}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Address</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='form-control'>{currentUser.address},{currentUser.pincode}</p>
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
                                    <p className='form-control'>{currentUser.petname}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">ANIMAL:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='form-control'>{currentUser.petanimal}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">DATE OF BIRTH:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='form-control'>{currentUser.dob}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Previous Health Checkup:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='form-control'>{currentUser.checkupdate}</p>
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
                                    {currentUser.appointments.service?
                                    <div>
                                        <p>SERVICE:
                                            <span className='form-control'>{currentUser.appointments.service}</span>
                                        </p>
                                        <p>LOCATION:
                                            <span className='form-control'>{currentUser.appointments.location}</span>
                                        </p>
                                        <p>DATE,TIME:
                                            <span className='form-control'>{currentUser.appointments.date},{currentUser.appointments.time}</span>
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
			</>
			:
			<>
			<div>
				<h1>{currentUser.username}</h1>
				<button className='btn btn-danger p-2 mt-3 fw-bold' onClick={logout}>LOG OUT</button>
			</div>
			</>
		}
        
    </div>
)
}

export default Profile
