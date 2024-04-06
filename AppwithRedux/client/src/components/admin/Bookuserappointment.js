import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import {useDispatch} from 'react-redux'
import Card from 'react-bootstrap/Card';
import { userselectedDetailsPromiseSlice } from '../../redux/slices/userselectedDetailsSlice';

function Bookuserappointment() {

    let navigate= useNavigate()
    let [error,setError]=useState('')
    let {register,handleSubmit,formState:{errors}}=useForm()
    let [bookingtype,setBookingType]= useState('Existing')
    let [users,setUsers] = useState([])
    let dispatch = useDispatch()
    let [file,setFile]=useState(null)

    function uploadPic(e)
    {
        setFile(e.target.files[0])
    }

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
            if (res.status===201)
            {
                dispatch(userselectedDetailsPromiseSlice(user))
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

    async function openprofile(user)
    {
        dispatch(userselectedDetailsPromiseSlice(user))
        navigate('/admin/userprofile')
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
            {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}

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
                        <tr key={index} className='text-center' >
                            <Card className='m-3'>
                                <Card.Body>
                                    <Card.Title>
                                        <span onClick={()=>openprofile(user)}>
                                        USER:{user.username}
                                        </span>
                                        <span>
                                            <button className='btn btn-success' onClick={()=>bookappointment(user)}>BOOK APPOINTMENT</button>
                                            {/* {booking===true&&</>} */}
                                        </span>
                                    </Card.Title>
                                    <Card.Text>STATUS:{user.accountstatus}</Card.Text>
                                </Card.Body>
                                {/* <Card.Footer>LOCATION:{user.location},DATE&TIME:{user.date}&{user.time}</Card.Footer> */}
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
            <input type='text' className='form-control border-black' id='petname' {...register('petname',{required:true})}></input>
            {errors.petname?.type==='required'&&<p className='text-danger fw-bold text-center'>*PETNAME is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            {/* DOB */}
            <label htmlFor='dob' className='form-label fw-bold'>DATE OF BIRTH:</label>
            <input type='date' id="dob" className='form-control border-black text-center' {...register('dob',{required:true})}></input>
            {errors.dob?.type==='required'&&<p className='text-center text-danger fw-bold'>*DATE OF BIRTH is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            <label className='form-label fw-bold' htmlFor='petanimal'>PET ANIMAL:</label>
            <select className='form-control text-center border-black' id='petanimal' {...register('petanimal',{required:true})}>
                <option value="">--SELECT--</option>
                <option value="DOG">DOG</option>
                <option value="CAT">CAT</option>
                <option value="BIRD">BIRD</option>
                <option value="HAMSTER">HAMSTER</option>
                <option value="OTHER">Other</option>
            </select>
            {errors.petanimal?.type==='required'&&<p className='text-center text-danger fw-bold'>*PET ANIMAL TYPE is required*</p>}
        </div>
        <div className='sm-3 m-3'>
            {/* Previous Health checkup date */}
            <label htmlFor='checkupdate' className='form-label fw-bold'>PREVIOUS DATE OF HEALTH CHECK-UP:</label>
            <input type='date' id="checkupdate" className='form-control border-black text-center' {...register('checkupdate',{required:true})}></input>
            {errors.checkupdate?.type==='required'&&<p className='text-center text-danger fw-bold'>*PREVIOUS HEALTH CHECK-UP DATE is required*</p>}
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
            <div className='sm-3 m-3 '>
                <label className='form-label fw-bold' htmlFor='address'>ADDRESS:</label>
                <textarea className='form-control border-black' type='text' id='address' {...register('address',{required:true})}></textarea>
                {errors.address?.type==='required'&&<p className='fw-bold text-danger text-center'>*ADDRESS is required*</p>}
            </div>

            <div className='sm-3 m-3'>
                <label className='form-label fw-bold' htmlFor='pincode'>PINCODE</label>
                <input className='form-control border-black' type='number' id='pincode' {...register('pincode',{required:true})}></input>
                {errors.pincode?.type==='required'&&<p className='text-danger text-center fw-bold'>*PINCODE is required*</p>}
            </div>
            
        </div>

        <div className='text-center p-2'>
            <button type='submit' className='btn btn-dark'>REGISTER</button>
        </div>

        </form>
    </>
    }
        </div>
    
    </div>
)
}

export default Bookuserappointment
