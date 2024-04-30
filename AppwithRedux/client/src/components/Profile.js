import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { logOut } from '../redux/slices/userLoginSlice'
import Alert from 'react-bootstrap/Alert';
import './Profile.css'

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
    <section>
		{
			userType==='user'?
			<>
			<div >
			<h3 className='fs-1 p-3 text-center pb-0' id='health'>USER PROFILE</h3>
			<div className="row">
				<div className="col-lg-4">
					<div className="cards m-5 mb-0">
						<div className="card-body">
							<div className="d-flex flex-column align-items-center text-center">
								{
									currentUser.profileImageURL&&
									<img src={currentUser.profileImageURL} alt={currentUser.username} className="rounded-circle p-1 " width="200" height="150"/>
								}
								<div className="nav-link mt-3" >
									<h4 className='fw-bold'>{currentUser.username}</h4>
									<div className="text-black mb-1">Owner of {currentUser.petdetails[0].petname}
									</div>
								</div>
                                <button className='btn btn-danger p-2 mt-3 fw-bold' onClick={logout}>LOG OUT</button>
                                {/* <button className='btn btn-primary p-2 mt-3 fw-bold' >EDIT PROFILE</button> */}
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-8 ">
					<div className="cards m-5 mb-0">
						<div className="card-body m-2">
                            <h4 className='text-center fs-5' id="pawscare">USER DETAILS</h4>
							<div className="row mb-3 mt-4">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Name:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{currentUser.username}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Email:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{currentUser.email}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Phone Number:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{currentUser.phonenumber}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Address:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{currentUser.address[0].addressline}, {currentUser.address[0].district}, {currentUser.address[0].state}, {currentUser.address[0].country},   {currentUser.address[0].pincode}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="cards m-5">
						<div className='card-body'>

                            <h4 className='text-center fs-5' id="pawscare">PET DETAILS</h4>
							<div className="row mb-3 mt-4">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Pet Name:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{currentUser.petdetails[0].petname}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">ANIMAL:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{currentUser.petdetails[0].petanimal}</p>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">DATE OF BIRTH:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{currentUser.petdetails[0].dob}</p>
								</div>
							</div>
							{/* <div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0" id="pawscare">Previous Health Checkup:</h6>
								</div>
								<div className="col-sm-9 text-secondary">
                                    <p className='user-data'>{currentUser.petdetails[0].last_checkup_date}</p>
								</div>
							</div> */}
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
        
    </section>
)
}

export default Profile
