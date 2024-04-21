import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';
import './Store.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Shop() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [alert,setAlert] = useState('')
    let [error,setError] =useState('')
    let {petproducts}=useSelector(state=>state.petProducts)
    let {currentUser,loginStatus}=useSelector(state=>state.userLogin)


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
        await dispatch(productDetailsPromiseStatus(item))
        navigate('/store/productpage')
    }
    catch(err)
    {
        setError(err.message)
    }
}
return (
    <div>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }

    <section>
    <div className="row">
    {petproducts.map((item,index)=>
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
                {
                    item.discount_percent===0
                    ?
                    <>
                    </>
                    :
                    <span className="product-discount-label">-{item.discount_percent}%</span>
                }
                {/* <ul className="product-links">
                    <li>
                      <NavLink className='btn' onClick={()=>edit(item)}><i className="fas fa-pencil-alt"></i></NavLink>
                    </li>
                    <li>
                        <NavLink className='btn' onClick={()=>deleteproduct(item)}><i className="fa fa-trash"></i></NavLink>    
                    </li>
                </ul> */}
                {
                    (item.stock === 'In Stock' && loginStatus === true)?
                    <button className='add-to-cart' onClick={()=>addtocart(item)}>ADD TO CART</button>
                    :
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Login to "ADD TO CART"</Tooltip>}>
                        <button className='add-to-cart-disabled' disabled={true} onClick={()=>addtocart(item)}>ADD TO CART</button>
                    </OverlayTrigger>
                }
                {/* <a href="" className="add-to-cart">ADD TO CART</a> */}
            </div>
            <div className="product-content" >
                <h3 className="title" onClick={()=>openproductpage(item)}>
                    <div className='btn' >
                    {item.productname}
                    </div>
                </h3>
                <div className="price">₹{item.discounted_price} 
                  {
                    item.discount_percent===0?
                    <>
                    </>
                    :
                    <span>₹{item.price}</span>
                  }
                </div>
            </div>
        </div>
    </div>
  ))}
        </div>
        </section>
    </div>
  )
}

export default Shop
