import React, {useEffect,useState} from 'react'
import {useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { userCartPromiseStatus } from '../redux/userCartSlice'

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
            await dispatch(userCartPromiseStatus(username))
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
        await dispatch(productDetailsPromiseStatus(item))
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
        
    <section>
        <div className='row'>
            {products.length>0&&
            <>
            {products.map((item,index)=>
            (
            <div className="col-md-3 col-sm-6 mt-4">
            <div key={index} className="product-grid">
                <div className="product-image">
                    <a href="#" className="image">
                    {
                        item.stock === "In Stock"?
                        <div>
                        <img key={index} onClick={()=>openproductpage(item)} src={item.image[0].ImageURL}/>
                        </div>
                        :
                        <div>
                        <img key={index} onClick={()=>openproductpage(item)} src={item.image[0].ImageURL}/>
                        <div className={`stock-overlay 'out-of-stock'}`}>
                            <p className='fw-bold'>{'Out of Stock'}</p>
                        </div>
                        </div>
                    }
                    </a>
                    <span className="product-discount-label">-{item.discount_percent}%</span>
                    <ul className="product-links">
                        <li>
                        <NavLink className='btn text-danger' onClick={()=>removefromwishlist(item)}><i class="bi bi-heart-fill"></i></NavLink>
                        </li>
                        {/* <li>
                            <NavLink className='btn' onClick={()=>deleteproduct(item)}><i className="fa fa-trash"></i></NavLink>    
                        </li> */}
                    </ul>
                {
                    item.stock === 'In Stock'?
                    <button className='add-to-cart' onClick={()=>addtocart(item)}>ADD TO CART</button>
                    :
                    <button className='add-to-cart-disabled' disabled={true} onClick={()=>addtocart(item)}>ADD TO CART</button>
                }
                    {/* <a href="" className="add-to-cart">ADD TO CART</a> */}
                </div>
                <div className="product-content" onClick={()=>openproductpage(item)}>
                    <h3 className="title">
                    <div className='btn' >
                    {item.productname}
                    </div>
                    </h3>
                    <div className="price">₹{item.discounted_price} <span>₹{item.price}</span></div>
                </div>
            </div>
        </div>
            ))}
            </>
            }
        </div>
    </section>
    </div>
)
}

export default Wishlist
