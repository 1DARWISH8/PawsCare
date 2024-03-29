import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate,NavLink} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { reFresh } from '../../redux/slices/productDetailsSlice'
import {Alert} from 'react-bootstrap';

function Editproduct() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let [error,setError] = useState('')
    let [file,setFile]=useState(null)
    let dispatch = useDispatch()
    let navigate=useNavigate()
    let {presentItem} = useSelector(state=>state.productdetails)
    let [alert,setAlert] = useState('')

    // console.log(presentItem)
    function uploadPic(e)
    {
        setFile(e.target.files[0])
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

    async function formSubmit(data)
    {
        let _id = presentItem._id
        data = {...data,_id}
        // console.log(data)
        const formData = new FormData();
        formData.append('data',JSON.stringify(data))
        formData.append('image',file)
        try
        {
            let res = await axios.post('http://localhost:5000/admin-api/editproduct',formData)
            // console.log(res)
            if (res.data.message==="Product Edited")
            {
                setAlert('PRODUCT SUCCESSFULLY EDITED')
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

    async function refresh()
    {
        dispatch(reFresh())
        navigate('/admin/managestore')
    }

return (
<div className="container">
{alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
    <h2 className="mt-5 mb-4">Product Registration Form</h2>
    <NavLink className='btn btn-dark' to='/admin/managestore' onClick={refresh}>BACK TO PRODUCTS</NavLink>
    <form onSubmit={handleSubmit(formSubmit)}>
        <div className="mb-3">
            <label htmlFor="productname" className="form-label">Product Name:</label>
            <input type="text" className="form-control" id="productname"  name="productname" defaultValue={presentItem.productname} {...register("productname",{required:true})} />
        </div>
        <div className="mb-3">
            <label htmlFor="productid" className="form-label">Product ID:</label>
            <input type="text" className="form-control" id="productid" name="productid" defaultValue={presentItem.productid} {...register("productid",{required:true})} />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <input type="text" className="form-control" id="description" name="description" defaultValue={presentItem.description} {...register("description",{required:true})} />
        </div>
        <div className="mb-3">
            <label htmlFor="animal" className="form-label">ANIMAL:</label>
            <select className="form-control" id="animal" name="animal" {...register("animal",{required:true})}>
            <option value="">SELECT</option>
            <option value="DOG">DOG</option>
            <option value="CAT">CAT</option>
            <option value="BIRD"> BIRD</option>
            <option value="FISH">FISH</option>
            <option value="GUINEA PIG">GUINEA PIG</option>
            <option value="HAMSTER">HAMSTER</option>
            <option value="TURTLE">TURTLE</option>
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category:</label>
            <select className="form-control" id="category" name="category"  {...register("category",{required:true})}>
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
            <input type="text" className="form-control" id="brand" name="brand" defaultValue={presentItem.brand} {...register("brand",{required:true})} />
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input type="number"className="form-control" id="price" name="price" defaultValue={presentItem.price} {...register("price",{required:true})} />
        </div>
        <div className="sm-3 mb-3">
            <label htmlFor="image" className="form-label">Images:</label>
            <input type="file" className="form-control" id="image" name="image"  onChange={uploadPic} />
        </div>
        {/* <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating:</label>
            <input type="number" className="form-control" id="rating" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" />
        </div> */}
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>  )
}

export default Editproduct
