import React, { useEffect, useState } from 'react'
import './Cart.css'
import axios from 'axios'
import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';
import { userCartPromiseStatus } from '../redux/userCartSlice'


function Cart() {

    let {currentUser}=useSelector(state=>state.userLogin)
    let navigate=useNavigate()
    let dispatch = useDispatch()
    let [cart,setCart] = useState([])
    let [error,setError] = useState('')
    let [alert,setAlert] = useState('')
    let [total,setTotal] = useState(0)
    
    const getcart = async()=>
    {
        let cartproducts = await axios.get(`http://localhost:5000/user-api/cart/${currentUser.username}`)
        if (cartproducts.data.message==="RETRIEVED USER-CART")
        {
            setCart(cartproducts.data.payload)
        }
        else
        {
            setError(cartproducts.data.message)
        }
    }
    useEffect(()=>getcart,[])

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

// console.log(cart[0].stock)

    async function incrementQuantity(item)
    {
        try
        {
            item.quantity += 1
            let increased = await axios.post('http://localhost:5000/user-api/editquantity',item)
            if (increased)
            {
                getcart()
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
                    getcart()
                }
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    };

    async function removeitem(item)
    {
        try
        {
            // console.log(item)
            let username = currentUser.username
            item = {...item,username}
            let productdeleted = await axios.post('http://localhost:5000/user-api/removecartproduct',item)
            if (productdeleted.data.message === "PRODUCT IS DELETED FROM CART")
            {
                getcart()
                await dispatch(userCartPromiseStatus(username))
            }
            else
            {
                setError(productdeleted.data.message)
            }
        }
        catch(err)
        {
            setError(err.message)
        }
    }

    async function checkout(user,cart,sum)
    {
        try
        {
            let username = user.username
            let phonenumber = user.phonenumber
            let address = user.address
            let totalprice = sum
            let orderitems = cart
            let order = {username,phonenumber,address,orderitems,totalprice}
            // console.log(order)
            let checkedout = await axios.post('http://localhost:5000/user-api/order',order)
            // console.log(checkedout)
            if(checkedout)
            {
                setAlert(checkedout.data.message)
                getcart()
            }
        }
        catch(error)
        {
            setError(error.message)
        }        
    }

    async function get_total()
    {
        try
        {
            let total_price = 0
            for (const item of cart)
            {
                total_price += item.discounted_price * item.quantity
            }
            setTotal(total_price)
        }
        catch(err)
        {

        }
    }

    useEffect(()=>
{get_total()},[cart])

return (
    <>
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }

        {
            cart.length>0?
            <section className=" m-3">
                    <div className="row w-100">
                        <div className="col-lg-12 col-md-12 col-12">
                            <h3 className="display-5 mb-2 text-center">Cart</h3>
                            <p className="mb-5 text-center">
                                <i className="text-info font-weight-bold">{cart.length}</i> items in your cart</p>
                            <table id="shoppingCart" className="table table-condensed table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <th style={{ width: '60%' }}>Product</th>
                                        <th   className='text-center' style={{ width: '10%' }}>Price</th>
                                        <th className='text-center' style={{ width: '20%' }}>Quantity</th>
                                        <th style={{ width: '8%' }}>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cart.map((item,index)=>
            (
                    
                    <tr key={index}>
                    <td data-th="Product">
                                <div className="row">
                                    <div className="col-md-3 text-left">
                                        <img src={item.image[0].ImageURL} alt="" className="img-fluid d-none d-md-block rounded mb-2 shadow "/>
                                    </div>
                                    <div className="col-md-9 text-start mt-sm-2 btn" id='product_name' onClick={()=>openproductpage(item)}>
                                        <h4>{item.productname}</h4>
                                    </div>
                                </div>
                            </td>
                            <td data-th="Price" className='text-center p-3'>₹{item.discounted_price}</td>
                            <td data-th="Quantity">
                                <div className='text-center'>
                                    <button className='btn btn-dark m-2' onClick={()=>decrementQuantity(item)}>-</button>
                                    <span >{item.quantity}</span>
                                    <button className='btn btn-dark m-2' onClick={()=>incrementQuantity(item)}>+</button>
                                </div>
                            </td>
                            <td className="actions pt-3 px-3">
                                    <button className="btn btn-dark border-secondary bg-danger btn-md mb-2" onClick={()=>removeitem(item)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                            </td>
                </tr>
            ))}
                                </tbody>
                            </table>
                            <div className='text-end'>
                                <h4>Subtotal:</h4>
                                <h1>₹{total}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 d-flex">
                        <div className="btn col-sm-6 mb-3 mb-m-1 order text-start">
                            <NavLink to='/store'>
                                <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
                            </NavLink>
                        </div>
                        <div className="col-sm-6 order text-end">
                            <a href="catalog.html" className="btn btn-primary mb-4 btn-lg pl-5 pr-5">Checkout</a>
                        </div>
                    </div>
            </section>
            :
            <>
                <h3 className='mt-4'>CART IS EMPTY</h3>
                <div className="text-center">
                    <NavLink to='/store' className="btn btn-dark">
                        <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
                    </NavLink>
                </div>
            </>
}




    {/* <div >
        <div>
        {cart.length ? 
        <table className='table table-responsive table-hover'>
            {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
                <h2 >CART</h2>
        <tbody>
        {cart.map((item,index)=>
        (
                <tr key={index}>
                <td onClick={()=>openproductpage(item)}>
                    {
                        item.stock === 'In Stock' ?
                        <img src={item.image[0].ImageURL} style={{width:"50%",height:"50%"}} onClick={()=>openproductpage(item)}/>
                        :
                        <div className="product-card">
                            <img src={item.image[0].ImageURLe} style={{width:"50%",height:"50%"}} onClick={()=>openproductpage(item)}/>
                            <div className={`text-overlay 'out-of-stock'}`}>
                            <p>{'Out of Stock'}</p>
                            </div>
                        </div>
                    }

                    <p onClick={()=>openproductpage(item)}>{item.productname}</p>
                </td>
                <td className='text-center'>
                    <div>
                        <button className='btn btn-dark m-0' onClick={()=>decrementQuantity(item)}>-</button>
                        <span className='m-2'>{item.quantity}</span>
                        <button className='btn btn-dark m-0' onClick={()=>incrementQuantity(item)}>+</button>
                    </div>
                    Rs.{item.price}
                    <div className='text-white'>{sum+=(parseInt(item.price)*item.quantity)}</div>
                </td>
                <td className='text-end'>
                <button className='btn text-danger' onClick={()=>removeitem(item)}><span className="material-symbols-outlined">
                    delete
                </span></button>
                </td>
            </tr>
        ))}
        <tr className='text-end'>
            <td></td>
            <td>Total Price:<span className='fw-bold'>Rs.{sum}</span></td>
            <td>
            <button className='btn btn-success ' onClick={()=>checkout(currentUser,cart,sum)}>CHECKOUT</button>
            </td>
        </tr>
        </tbody>
        </table>:
        <>
            <h1 className='text-center m-3'>..CART IS EMPTY..</h1>
            <p className='fw-bold text-center'>ADD ITEMS TO CART</p>
        </>}
        
        </div>
        
    </div> */}
</>
)
}

export default Cart
