import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';
import { useNavigate,NavLink } from 'react-router-dom'


function Productpage() {

    let dispatch = useDispatch()
    let {presentItem} = useSelector(state=>state.productdetails)
    let {currentUser}=useSelector(state=>state.userLogin)
    let [alert,setAlert] = useState('')
    let [error,setError] =useState('')
    let navigate = useNavigate()
    let item = {...presentItem}

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

function edit(item)
    {
      // console.log(item)
        dispatch(productDetailsPromiseStatus(item))
        navigate('/admin/editproduct')
    }

    async function deleteproduct(item)
    {
        try
        {
            let deactivatedproduct = await axios.post('http://localhost:5000/admin-api/deactivateproduct',item)
            if (deactivatedproduct)
            {
                setAlert(deactivatedproduct.data.message)
                dispatch(productDetailsPromiseStatus(item))
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    }

async function restoreproduct(item)
{
    try
    {
        let restored = await axios.post('http://localhost:5000/admin-api/activateproduct',item)
        if (restored)
        {
            setAlert(restored.data.message)
            dispatch(productDetailsPromiseStatus(item))
        }
    }
    catch(err)
    {
        setError(err.message)
    }
}

async function incrementQuantity(item)
    {
        try
        {
            item.quantity += 1
            let increased = await axios.post('http://localhost:5000/user-api/editquantity',item)
            if (increased)
            {
                dispatch(productDetailsPromiseStatus(item))
            }
        }
        catch(err)
        {
            setError(err.message)
        }
        
    };
    async function decrementQuantity(item) 
    {
        try
        {
            if (item.quantity !== 1)
            {
                item.quantity -= 1
                let decreased = await axios.post('http://localhost:5000/user-api/editquantity',item)
                if (decreased)
                {
                    dispatch(productDetailsPromiseStatus(item))
                }
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    };

async function updatestock(item)
{
    try
    {
        if (item.stock === 'In Stock')
        {
            item.stock = 'Out of Stock'
            // console.log(item)
            let stockupdated = await axios.post('http://localhost:5000/admin-api/updatestock',item)
            // console.log(stockupdated)
            if (stockupdated)
            {
                setAlert('PRODUCT STOCK UPDATED')
                dispatch(productDetailsPromiseStatus(item))
            }
        else
        {
            setError(stockupdated.message)
        }
    }
    else
    {
        item.stock = 'In Stock'
        let stockupdated = await axios.post('http://localhost:5000/admin-api/updatestock',item)
        if (stockupdated)
        {
            setAlert('PRODUCT STOCK UPDATED')
            dispatch(productDetailsPromiseStatus(item))
        }
        else
        {
            setError(stockupdated.message)
        }
    }
    }
    catch(err)
    {
        setError(err.message)
    }
}


return (
    <div className="container-fluid">
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
            <div className="cart">
                <div className="row row1">
                    <div className="col-md-4">
                        <img src={item.image} width="100%" id="ProductImg" alt="Product" />
                        <div className="small-imgs">
                            <img src={item.image} width="10%" className="small-img" alt="Product" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h1 className="product-title">{item.productname}</h1>
                        <div className="reviews">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <i className="far fa-star"></i>
                            <p></p>
                        </div>
                        <div className="itemprice m-1">
                            Rs.{item.price}
                        </div>
                        <div className="row">
                            <div className="col-md-4 qty">
                                <h5>Quantity:<span className='text-dark'>1</span></h5>
                            </div>
                        </div>
                        <div className="buttons">
                            <div className="row">
                                <div className="col-md-6">
                                    {
                                        currentUser.usertype === 'user' ?
                                        <>
                                            <button className='btn btn-success m-1' onClick={()=>addtocart(item)}>ADD TO CART</button>
                                        </>
                                        :
                                        <>
                                            <NavLink className='btn btn-success m-3' onClick={()=>edit(item)}>EDIT</NavLink>
                                            {
                                                item.status === 'ACTIVE' ? 
                                                <button className='btn btn-danger' onClick={()=>deleteproduct(item)}>DELETE</button> 
                                                :
                                                <button className='btn btn-danger' onClick={()=>restoreproduct(item)}>RESTORE</button> 
                                            }
                                            {
                                                item.stock === 'In Stock' ?
                                                <p className='fw-bold m-1'> CHANGE STOCK TO:
                                                    <button className='btn btn-warning m-2' onClick={()=>updatestock(item)}> Out of Stock</button>
                                                </p>
                                                :
                                                <p className='fw-bold m-1'> CHANGE STOCK TO:
                                                    <button className='btn btn-warning m-2' onClick={()=>updatestock(item)}>In Stock</button>
                                                </p>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div id="product" className="product-inf">
                            <span className="active"><a href="#Description" className='text-dark fw-bold'>Product Description:</a></span>
                            <div className="tabs-content">
                                <div id="Description">
                                    <p className='text-dark'>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Productpage
