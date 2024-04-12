import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {NavLink, useNavigate} from 'react-router-dom'
import {Alert} from 'react-bootstrap';

const Addproducts = () => {
    let {register,handleSubmit,formState:{errors}}=useForm()
        let [error,setError] = useState('')
        let [file,setFile]=useState(null)
        let navigate=useNavigate()
        let [alert,setAlert] = useState('')
        
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


        function uploadPic(e)
    {
        setFile(e.target.files[0])
    }
    
    async function formSubmit(data)
    {
        const formData = new FormData();
        formData.append('data',JSON.stringify(data))
        formData.append('image',file)
        let discounted_price = 0
        data = {...data,discounted_price}
        try
        {
            let res = await axios.post('http://localhost:5000/admin-api/addproduct',formData)
            if (res.status===201)
            {
                navigate('/admin/managestore')
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
<div className="containers m-5">
    {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
    <NavLink className='btn btn-dark' to='/admin/managestore'>BACK TO PRODUCTS</NavLink>
    <h2 className="mt-5 mb-4">ADD A PRODUCT</h2>
    <form onSubmit={handleSubmit(formSubmit)}>
        <div className="mb-3">
            <label htmlFor="productname" className="form-label">Product Name:</label>
            <input type="text" className="form-control" id="productname" name="productname" {...register("productname",{required:true})} />
        </div>
        <div className="mb-3">
            <label htmlFor="productid" className="form-label">Product ID:</label>
            <input type="text" className="form-control" id="productid" name="productid" {...register("productid",{required:true})} />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea type="text" className="form-control" id="description" name="description" {...register("description",{required:true})} />
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
            <option value="GUINEA PIG">GUINEA PIG</option>
            <option value="HAMSTER">HAMSTER</option>
            <option value="TURTLE">TURTLE</option>
            <option value="OTHER">OTHER</option>
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <select className="form-control" id="category" name="category" {...register("category",{required:true})}>
            <option value="">SELECT</option>
            <option value="Food">Food</option>
            <option value="Treats">Treats</option>
            <option value="Toy"> Toy</option>
            <option value="Health">Health</option>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="brand" className="form-label">Brand:</label>
            <input type="text" className="form-control" id="brand" name="brand" {...register("brand",{required:true})} />
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input type="number"className="form-control" id="price" name="price" min={1} {...register("price",{required:true})} />
        </div>
        <div className="mb-3">
            <label htmlFor="discount_percent" className="form-label">Discount Percent:</label>
            <input type="number"className="form-control" min={0} max={99} id="discount_percent" name="discount_percent" placeholder='0'{...register("discount_percent",{required:true,min:0,max:99})} />
        </div>
        <div className="sm-3 mb-3">
            <label htmlFor="image" className="form-label">Images:</label>
            <input type="file" className="form-control" id="image" name="image" onChange={uploadPic} />
        </div>
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
