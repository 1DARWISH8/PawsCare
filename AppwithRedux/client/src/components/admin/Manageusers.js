import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { userselectedDetailsPromiseSlice } from '../../redux/slices/userselectedDetailsSlice';
import {useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import Spinner from 'react-bootstrap/Spinner';
import './Manageusers.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Manageusers() {

  let [users,setUsers] = useState('')
  let [error,setError] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let dispatch = useDispatch()
  let navigate= useNavigate()
  let {register,handleSubmit,setValue,formState:{errors}}=useForm()
  let [bookingtype,setBookingType]= useState('Existing')
  let [file,setFile]=useState(null)

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
        try
        {
            await dispatch(userselectedDetailsPromiseSlice(user))
            navigate('/admin/userprofile')
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    const [showFloatingButton, setShowFloatingButton] = useState(false);

  const toggleFloatingButton = () => 
  {
    setShowFloatingButton(!showFloatingButton);
  }

        const settype = (x) =>
        {
            setBookingType(x)
        }

        function uploadPic(e)
        {
            setFile(e.target.files[0])
        }

        const [selectedState, setSelectedState] = useState('');

    const indianStates = [
    { name: 'Andhra Pradesh', districts: ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'Y.S.R. Kadapa'] },
    { name: 'Karnataka', districts: ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'] },
    { name: 'Kerala', districts: ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'] },
    { name: 'Tamil Nadu', districts: ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'] },
    { name: 'Telangana', districts: ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal–Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Ranga Reddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'] }];

    const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    // Clear the city field when state changes
    setValue('city', '');
  };

        async function formSubmit(data)
        {
            // store in local api
            let userType = 'user'
            data={userType,...data}
            let user = data
            // console.log(data)
            const formData = new FormData();
            formData.append('data',JSON.stringify(data))
            formData.append('userpic',file)
            try
            {
                let res = await axios.post('http://localhost:5000/user-api/registeruser',formData)
                console.log(res)
            res.status(201).send({message:"USER CREATED",payload:user})
            if (res.data.message==="USER CREATED")
                {
                    await dispatch(userselectedDetailsPromiseSlice(user))
                    settype('Existing')
                    navigate('/admin/userprofile')
                }
                else
                {
                    setError(res.data.message)
                }
            }
            catch(err)
            {
                setError(err.message)
            }
        }

  return (
    <div>
      {error.length!==0&&<p>{error}</p>}

      { 
      bookingtype==='Existing'?
      <>
        <div className='search'>
          <form className='text-start mt-4 mx-4'>
            <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleChange}/>  
          </form>
        </div>
        {searchResults.length?
        <>
        <section>
        <div class="row text-center">
        {
          searchResults.map((user,index)=>(
            <div key={index} className="col-md-3 m-5">
            <div className="card profile-card-3 m-3">
                <div className="background-block">
                    {/* <img src="https://res.cloudinary.com/dozacgfl7/image/upload/v1712649955/paws_qnn5le.jpg" alt="profile-sample1" className="background"/> */}
                </div>
                <div className="profile-thumb-block">
                    <img src={user.profileImageURL} alt="profile-image" className="profile"/>
                </div>
                  <div className="card-content">
                    <h2 className='btn' onClick={()=>openprofile(user)}>
                      {user.username}
                    </h2>
                    <div>
                      <small>
                        STATUS:
                        {
                          user.accountstatus === "ACTIVE"?
                          <span className='m-2 fw-bold text-success'>
                          {user.accountstatus}
                          </span>
                          :
                          <span className='m-2 fw-bold text-danger'>
                          {user.accountstatus}
                          </span>
                        }
                      </small>
                    </div>
                    {/* <div className="icon-block"><a href="#"><i className="fa fa-facebook"></i></a><a href="#"> <i className="fa fa-twitter"></i></a><a href="#"> <i className="fa fa-google-plus"></i></a></div> */}
                    <span >
                        {user.accountstatus==="ACTIVE"?
                        <button className='btn btn-danger mt-3' onClick={()=>deactivateuser(user)}>DEACTIVATE USER</button>
                        :
                        <button className='btn btn-success mt-3' onClick={()=>activateuser(user)}>ACTIVATE USER</button>
                        }
                    </span>
                </div>
              </div>
    		</div>
          ))
        }
        </div>
        </section>						
      </>:
      <>
      {/* <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}
      <div className='text-center m-5 fw-bold'>
        <h5>NO USERS TO SHOW</h5>
      </div>
      </>
        }
        <div className="hover-container">
      <button className="stickyButton" onClick={toggleFloatingButton}>
        <i className="fas fa-plus rotated"></i>
      </button>
      {showFloatingButton && (
        <div  onClick={toggleFloatingButton}>
          <button className="floatingButton" onClick={()=>settype('New')}>
            Create User
          </button>
        </div>
      )}
    </div>
    </>
    :
    <>
      <form className='col-sm-6 mx-auto m-3 p-2' onSubmit={handleSubmit(formSubmit)}>
        <h1 className='text-center fs-3 text-decoration-underline'>REGISTRATION</h1>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}

        {/* USER DETAILS FORM */}
        <h5 className='text-center fw-bold pt-5'>USER DETAILS</h5>
        <div className='sm-3 m-3'>
            {/* username */}
            <label htmlFor='username' className='form-label fw-bold' >USERNAME:</label>
            <input type='text' className='form-control border-black' id='username' {...register('username',{required:true})}></input>
            {errors.username?.type==='required'&&<p className='text-danger fw-bold text-center'>*USERNAME is required*</p>}
        </div>
        
        <div className='sm-3 m-3'>
            {/* password */}
            <label htmlFor='password' className='form-label fw-bold' >PASSWORD:</label>
            <input type='password' className='form-control border-black' id='password' {...register('password',{required:true})}></input>
            {errors.password?.type==='required'&&<p className='text-center text-danger fw-bold'>*PASSWORD is required*</p>}
        </div>

        <div className='sm-3 m-3'>
            {/* email */}
            <label htmlFor='email' className='form-label fw-bold' >EMAIL ADDRESS:</label>
            <input type='email' id='email' className='form-control border-black' {...register('email',{required:true})}></input>
            {errors.email?.type==='required'&&<p className='text-center text-danger fw-bold'>*EMAIL is required*</p>}
        </div>

        <div className='sm-3 m-3'>
            {/* USER DISPLAY PICTURE */}
            <label htmlFor='userpic' className='form-label fw-bold'>PROFILE IMAGE:</label>
            <input id='userpic' type='file' name='userpic' className='form-control border-black' onChange={uploadPic}/>
        </div>


        {/* PET DETAILS FORM */}
        <div >
            <h5 className='text-center fw-bold pt-3'>PET DETAILS</h5>
        {/* <div className='sm-3 m-3 '>
        <label htmlFor='petpic' className=' form-label fw-bold'>UPLOAD PET IMAGE:</label> */}
        {/* <input type='file' accept='image/*' id='imageupload' className='form-control' {...register('imageupload')}></input> */}
        {/* <input type='file' id='petpic' className='form-control border-black' onChange={uploadPic}></input>
        </div> */}
        <div className='sm-3 m-3'>
            <label htmlFor='petname' className='form-label fw-bold' >PETNAME:</label>
            <input type='text' className='form-control border-black' id='petname' {...register('petdetails.petname',{required:true})}></input>
            {errors.petdetails?.petname?.type==='required'&&<p className='text-danger fw-bold text-center'>*PETNAME is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            {/* DOB */}
            <label htmlFor='dob' className='form-label fw-bold'>DATE OF BIRTH:</label>
            <input type='date' id="dob" className='form-control border-black text-center' {...register('petdetails.dob',{required:true})}></input>
            {errors.petdetails?.dob?.type==='required'&&<p className='text-center text-danger fw-bold'>*DATE OF BIRTH is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            <label className='form-label fw-bold' htmlFor='petanimal'>PET ANIMAL:</label>
            <select className='form-control text-center border-black' id='petanimal' {...register('petdetails.petanimal',{required:true})}>
                <option value="">--SELECT--</option>
                <option value="DOG">DOG</option>
                <option value="CAT">CAT</option>
                <option value="BIRD">BIRD</option>
                <option value="HAMSTER">HAMSTER</option>
                <option value="OTHER">Other</option>
            </select>
            {errors.petdetails?.petanimal?.type==='required'&&<p className='text-center text-danger fw-bold'>*PET ANIMAL TYPE is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            {/* Previous Health checkup date */}
            <label htmlFor='last_checkup_date' className='form-label fw-bold'>PREVIOUS DATE OF HEALTH CHECK-UP:</label>
            <input type='date' id="last_checkup_date" className='form-control border-black text-center' {...register('petdetails.last_checkup_date',{required:true})}></input>
            {errors.petdetails?.last_checkup_date?.type==='required'&&<p className='text-center text-danger fw-bold'>*PREVIOUS HEALTH CHECK-UP DATE is required*</p>}
        </div>
        </div>



{/* COMMUNICATION DETAILS */}

        <div>
            <h5 className='text-center fw-bold pt-3'>COMMUNICATION DETAILS</h5>
            <div className='sm-3 m-3 '>
                <label className='form-label fw-bold' htmlFor='phonenumber'>PHONE NUMBER:</label>
                <input className='form-control border-black' type='tele' {...register('phonenumber',{required:true})}></input>
                {errors.phonenumber?.type==='required'&&<p className='fw-bold text-danger text-center'>*PHONE NUMBER is required*</p>}
            </div>
            {/* ADDRESS DETAILS */}
            <div className='sm-3 m-3 '>
            <h5 className='text-center fw-bold pt-3'>ADDRESS DETAILS</h5>
                <label className='form-label fw-bold' htmlFor='state'>STATE:</label>
                <select className='form-control border-black' id="state" {...register("address.state",{required:true})} onChange={handleStateChange}>
                    <option value="">Select State</option>
                        {indianStates.map((state, index) => (
                            <option key={index} value={state.name}>
                                    {state.name}
                            </option>
                        ))}
                </select>
                {errors.address?.state?.type==='required'&&<p className='fw-bold text-danger text-center'>*ADDRESS is required*</p>}
            </div>

            <div className='sm-3 m-3 '>
                <label className='form-label fw-bold' htmlFor='district'>DISTRICT:</label>
                {/* <textarea className='form-control border-black' type='text' id='address' {...register('address.addressline',{required:true})}></textarea> */}
                <select className='form-control border-black' id="district" {...register("address.district")}>
                    <option value="">Select City</option>
                        {selectedState &&
                            indianStates.find((state) => state.name === selectedState).districts.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                    ))}
                </select>
                {errors.address?.district?.type==='required'&&<p className='fw-bold text-danger text-center'>*ADDRESS is required*</p>}
            </div>

            <div className='sm-3 m-3 '>
                <label className='form-label fw-bold' htmlFor='street'>ADDRESS LINE:</label>
                <textarea className='form-control border-black' type='text' id='address' {...register('address.addressline',{required:true})}></textarea>
                {errors.address?.addressline?.type==='required'&&<p className='fw-bold text-danger text-center'>*ADDRESS is required*</p>}
            </div>
            <div className='sm-3 m-3'>
                <label className='form-label fw-bold' htmlFor='pincode'>PINCODE</label>
                <input className='form-control border-black' type='number' id='pincode' {...register('address.pincode',{required:true})}></input>
                {errors.address?.pincode?.type==='required'&&<p className='text-danger text-center fw-bold'>*PINCODE is required*</p>}
            </div>
        </div>

        <div className='text-center p-2'>
            <button type='submit' className='btn btn-dark'>REGISTER</button>
        </div>

        </form>
    </>
}
    
    </div>
  )
}

export default Manageusers
