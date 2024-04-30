import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {NavLink, useNavigate} from 'react-router-dom'
import Alerts from '../Alerts';

function Addproducts () 
{
    let {register,handleSubmit,formState:{errors}}=useForm()
    let [message,setMessage] = useState('')
    let [Alert,setAlert] = useState(false)
    let [type,setType] = useState('')
    let [files,setFiles]=useState(null)
    let navigate=useNavigate()

const hideAlert = () =>
{
    setTimeout(()=>
    {
        setAlert(false);
    },3000);
}



    function uploadPic(e)
    {
        setFiles(e.target.files)
    }

    async function formSubmit(data)
    {
        const formData = new FormData();
        formData.append('data',JSON.stringify(data))
        // Append each file to FormData
        for (let i = 0; i < files.length; i++) 
        {
            formData.append(`images`, files[i]);
        }
        let discounted_price = 0
        data = {...data,discounted_price}
        try
        {
            let res = await axios.post('http://localhost:5000/admin-api/addproduct',formData)
            if (res.status===201)
            {
                setMessage(res.data.message)
                setType('exists')
                setAlert(true)
                hideAlert()
                navigate('/admin/managestore')
            }
            else
            {
                setMessage(res.data.message)
                setType("failure")
                setAlert(true)
            }
        }
        catch(err)
        {
            setMessage(err.message)
            setType("failure")
            setAlert(true)
        }
    }

return (
<div className="containers m-5">
    
    <Alerts show={Alert} type={type} message={message} onClose={()=>setAlert(false)} />

    <NavLink className='btn btn-dark' to='/admin/managestore'>BACK TO PRODUCTS</NavLink>
    <h2 className="mt-5 mb-4">ADD A PRODUCT</h2>
    <form onSubmit={handleSubmit(formSubmit)}>
        <div className="mb-3">
            <label htmlFor="productname" className="form-label">Product Name:</label>
            <input type="text" className="form-control" id="productname" name="productname" {...register("productname",{required:true})} />
            {errors.productname?.type==='required'&&<p className='text-danger fw-bold text-center'>*Product Name is required*</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="productid" className="form-label">Product ID:</label>
            <input type="text" className="form-control" id="productid" name="productid" {...register("productid",{required:true})} />
            {errors.productid?.type==='required'&&<p className='text-danger fw-bold text-center'>*ProductId is required*</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea type="text" className="form-control" id="description" name="description" {...register("description",{required:true})} />
            {errors.description?.type==='required'&&<p className='text-danger fw-bold text-center'>*Product Description is required*</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="animal" className="form-label">ANIMAL:</label>
            <select className="form-control" id="animal" name="animal" {...register("animal",{required:true})}>
            <option value="">SELECT</option>
            <option value="DOG">DOG</option>
            <option value="CAT">CAT</option>
            <option value="DOG & CAT">DOG & CAT</option>
            <option value="BIRD"> BIRD</option>
            <option value="FISH">FISH</option>
            <option value="HAMSTER">HAMSTER</option>
            <option value="TURTLE">TURTLE</option>
            <option value="OTHER">OTHER</option>
            </select>
            {errors.animal?.type==='required'&&<p className='text-danger fw-bold text-center'>*Animal Type is required*</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <select className="form-control" id="category" name="category" {...register("category",{required:true})}>
            <option value="">SELECT</option>
            <option value="Food">Food</option>
            <option value="Treats">Treats</option>
            <option value="Toys"> Toys</option>
            <option value="Health">Health</option>
            <option value="Clothing">Clothing</option>
            <option value="Grooming">Grooming</option>
            <option value="Essentials">Essentials</option>
            <option value="Accessories">Accessories</option>
            </select>
            {errors.category?.type==='required'&&<p className='text-danger fw-bold text-center'>*Category is required*</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="brand" className="form-label">Brand:</label>
            <input type="text" className="form-control" id="brand" name="brand" {...register("brand",{required:true})} />
            {errors.brand?.type==='required'&&<p className='text-danger fw-bold text-center'>*Brand is required*</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input type="number"className="form-control" id="price" name="price" min={1} {...register("price",{required:true})} />
            {errors.price?.type==='required'&&<p className='text-danger fw-bold text-center'>*Product Price is required*</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="discount_percent" className="form-label">Discount Percent:</label>
            <input type="number"className="form-control" min={0} max={99} id="discount_percent" name="discount_percent" placeholder='0'{...register("discount_percent",{required:true,min:0,max:99})} />
            {errors.discount_percent?.type==='required'&&<p className='text-danger fw-bold text-center'>*Discount Percent is required*</p>}
        </div>
        <div className="sm-3 mb-3">
            <label htmlFor="images" className="form-label">Images:</label>
            <input type="file" id="images" name="images" onChange={uploadPic} multiple/>
        </div>
        {files===null&&<p className='text-center text-danger fw-bold'>*Product Images are required*</p>}
        {/* <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating:</label>
            <input type="number" className="form-control" id="rating" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" />
        </div> */}
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
);
};

export default Addproducts;
