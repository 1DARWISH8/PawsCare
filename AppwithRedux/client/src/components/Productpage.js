import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';
import { useNavigate,NavLink } from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Carousel } from 'react-bootstrap';

function Productpage() {

    let dispatch = useDispatch()
    let {presentItem} = useSelector(state=>state.productdetails)
    let {currentUser,loginStatus}=useSelector(state=>state.userLogin)
    let [alert,setAlert] = useState('')
    let [error,setError] =useState('')
    let navigate = useNavigate()
    let item = {...presentItem}
    let [wishlist,setWishlist] = useState([])
    let [exits,setExistence] = useState(false)
    // let discounted_price = item.price - ((item.price * item.discount_percent)/100)

async function addtocart(item)
{
    try
    {
        let username=currentUser.username;
        item = {...item,username}
        console.log(item)
        let added = await axios.post('http://localhost:5000/user-api/addcartproduct',item)
        console.log(added)
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

async function getwishlist()
{
    try
    {
        let products = await axios.get(`http://localhost:5000/user-api/getwishlist/${currentUser.username}`)
        // console.log(products)
        if (products)
        {
            setWishlist(products.data.payload)
            checkwishlist(item)
        }
    }
    catch(err)
    {
        setError(err.message)
    }
}

useEffect(()=>getwishlist,[])

async function checkwishlist(item)
{
    try
    {
        let username = currentUser.username
        item = {...item,username}
        let inwishlist = await axios.post('http://localhost:5000/user-api/inwishlist',item)
        if (inwishlist.data.message==="PRODUCT IN WISHLIST")
        {
            setExistence(true)
            dispatch(productDetailsPromiseStatus(item))    
        }
        else
        {
            setExistence(false)
        }
    }
    catch(err)
    {
        setError(err.message)
    }
}



async function addtowishlist(item)
{
try
{
    let username=currentUser.username;
    item = {...item,username}
    // console.log(item)
    let addtowishlist = await axios.post('http://localhost:5000/user-api/addtowishlist',item)
    if (addtowishlist.data.message === "PRODUCT ADDED TO WISHLIST")
    {
        setAlert('PRODUCT ADDED TO WISHLIST')
        setExistence(true)
        dispatch(productDetailsPromiseStatus(item))    
    }
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
    // console.log(added)
    if (removedfromwishlist.data.message === "PRODUCT REMOVED FROM WISHLIST")
    {
        setAlert('PRODUCT REMOVED FROM WISHLIST')
        setExistence(false)
        dispatch(productDetailsPromiseStatus(item))    
    }    
}
catch(err)
{
    setError(err.message)
}
}

async function edit(item)
    {
        try
        {
            await dispatch(productDetailsPromiseStatus(item))
            navigate('/admin/editproduct')
        }
        catch(Err)
        {
            setError(Err.message)
        }
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
    <section className="container-fluid">
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
            <div className="cart">
                <div className="row row1">
                    <div className="col-md-4">
                        {
                            item.stock === 'In Stock' ?
                            <div className='product-card'>
                                <Carousel variant='dark'>
                                    {item.image.map((item_image,index)=>(
                                        <Carousel.Item>
                                            <img key={index} src={item_image.ImageURL} width="100%" id="ProductImg" alt={item.name} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                            :
                            <div className="product-card">
                                <Carousel variant='dark'>
                                    {item.image.map((item_image,index)=>(
                                        <Carousel.Item>
                                            <img key={index} src={item_image.ImageURL} width="100%" id="ProductImg" alt={item.name} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <div className={`text-overlay 'out-of-stock'}`}>
                                    <p className='fw-bold'>{'Out of Stock'}</p>
                                </div>
                            </div>
                        }
                        <div className="small-imgs">
                            {item.image.map((image,index)=>(
                                <img key={index} src={image.ImageURL} width="10%" className="small-img m-2" alt="Product" />
                            ))}
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
                        <div className="itemprice m-1 fw-bold">
                            <div className='text-success'>
                            <span className='text-decoration-line-through'>
                                MRP.{item.price}
                            </span>
                            <span className='mx-3'>
                                {item.discount_percent}% OFF
                            </span>
                            </div>
                            <span className='fs-3'>
                                Rs.{item.discounted_price}
                            </span>
                        </div>
                        <div className="row">
                            <div className="col-md-4 qty mx-1 ">
                                <h5 className='fw-bold'>
                                        Quantity:
                                    <span className='text-dark mx-1'>
                                        1
                                    </span></h5>
                            </div>
                        </div>
                        <div className="buttons">
                            <div className="row">
                                <div className="col-md-6">
                                    {
                                        loginStatus===true?
                                        <>
                                        {
                                            currentUser.userType === 'user' ?
                                            <>
                                                {
                                                    item.stock === 'In Stock'?
                                                    <button className='btn btn-success m-1' onClick={()=>addtocart(item)}>ADD TO CART</button>
                                                    :
                                                    <button className='btn btn-success m-1' disabled={true} onClick={()=>addtocart(item)}>ADD TO CART</button>
                                                }
                                                {
                                                    exits?
                                                    <button className='btn' onClick={()=>removefromwishlist(item)} ><span className='text-danger'><i class="bi bi-heart-fill"></i></span></button>    
                                                    :
                                                    <button className='btn' onClick={()=>addtowishlist(item)} ><span className='text-danger'><i class="bi bi-heart"></i></span></button> 
                                                }
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
                                                    <span>
                                                        <button className='btn btn-warning m-2' onClick={()=>updatestock(item)}> Out of Stock</button>
                                                    </span>
                                                    </p>
                                                    :
                                                    <p className='fw-bold m-1'> CHANGE STOCK TO:
                                                        <button className='btn btn-warning m-2' onClick={()=>updatestock(item)}>In Stock</button>
                                                    </p>
                                                }
                                            </>
                                        }
                                        </>
                                        :
                                        <>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Login to "ADD TO CART"</Tooltip>}>
                                            <span className="d-inline-block">
                                                <button className='btn btn-success m-1' disabled={true} style={{ pointerEvents: 'none' }} onClick={()=>addtocart(item)}>ADD TO CART</button>
                                            </span>
                                            </OverlayTrigger>
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Login to "ADD TO WISHLIST"</Tooltip>}>
                                            <span className="d-inline-block">
                                                <button className='btn' disabled={true} onClick={()=>addtowishlist(item)} ><span className='text-danger'><i class="bi bi-heart"></i></span></button> 
                                            </span>
                                            </OverlayTrigger>
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
        </section>
  )
}

export default Productpage
