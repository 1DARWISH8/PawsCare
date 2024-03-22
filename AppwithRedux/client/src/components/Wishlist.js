import React, {useEffect,useState} from 'react'
import {useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';

function Wishlist() {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [products,setProducts]=useState([])
    let [error,setError] =useState('')
    let {currentUser}=useSelector(state=>state.userLogin)
    let [alert,setAlert] = useState('')

async function getwishlist()
{
    try
    {
        let products = await axios.get(`http://localhost:5000/user-api/getwishlist/${currentUser.username}`)
        // console.log(products)
        if (products)
        {
            setProducts(products.data.payload)
        }
    }
    catch(err)
    {
        setError(err.message)
    }
}

useEffect(()=>getwishlist,[])

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

async function addtocart(item)
{
    try
    {
        let username=currentUser.username;
        item = {...item,username}
        let added = await axios.post('http://localhost:5000/user-api/addcartproduct',item)
        // console.log(added)
        if (added.data.message === "PRODUCT ADDED TO CART")
        {
            setAlert('PRODUCT ADDED')
        }
        else if (added.data.message === "ITEM ALREADY IN CART")
        {
            setAlert('PRODUCT ALREADY IN CART')
        }
    }
    catch(err)
    {
        setError(err.message)
    }
}

async function openproductpage(item)
{
    try
    {
        dispatch(productDetailsPromiseStatus(item))
        navigate('/store/productpage')
    }
    catch(err)
    {
        setError(err.message)
    }
}


async function removefromwishlist(item)
{
    try
    {
        let username=currentUser.username;
        item = {...item,username}
        let removedfromwishlist = await axios.post('http://localhost:5000/user-api/removefromwishlist',item)
        // console.log(removedfromwishlist)
        if (removedfromwishlist.data.message === "PRODUCT REMOVED FROM WISHLIST")
        {
            setAlert('PRODUCT REMOVED FROM WISHLIST')
            getwishlist()
        }    
    }
    catch(err)
    {
        setError(err.message)
    }
}

return (
    <div>
        <h1 className='text-center'>WISHLIST</h1>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
        <div className='container pt-2'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
            {products.map((item,index)=>
            (
                <div className='col pt-3 pb-3'  key={index}>
                    <div className='card' style={{height:'500px'}}>
                        <img src={item.image} className='card-img-top' style={{width:'auto',height:'250px'}} alt={item.name} onClick={()=>openproductpage(item)}/>
                        <div className='card-body'>
                            <h5 className='card-title' onClick={()=>openproductpage(item)}>{item.productname}</h5>
                            <p className='card-text'>Rs.{item.price}</p>
                            <span>
                            <button className='btn btn-success' onClick={()=>addtocart(item)}>ADD TO CART</button>    
                            <button className='btn' onClick={()=>removefromwishlist(item)} ><span className='text-danger'><i class="bi bi-heart-fill"></i></span></button>    
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
)
}

export default Wishlist
