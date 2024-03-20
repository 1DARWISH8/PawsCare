import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';

function Productpage() {

    let dispatch = useDispatch()
    let {presentItem} = useSelector(state=>state.productdetails)
    let {currentUser}=useSelector(state=>state.userLogin)
    let [alert,setAlert] = useState('')
    let [error,setError] =useState('')


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


return (
    <div className="container-fluid">
        {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
        {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
            <div className="cart">
                <div className="row row1">
                    <div className="col-md-4">
                        <img src={presentItem.image} width="100%" id="ProductImg" alt="Product" />
                        <div className="small-imgs">
                            <img src={presentItem.image} width="10%" className="small-img" alt="Product" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h1 className="product-title">{presentItem.productname}</h1>
                        <div className="reviews">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <i className="far fa-star"></i>
                            <p></p>
                        </div>
                        <div className="itemprice m-1">
                            Rs.{presentItem.price}
                        </div>
                        <div className="row">
                            <div className="col-md-4 qty">
                                <h5>Quantity:<span className='text-dark'>1</span></h5>
                            </div>
                        </div>
                        <div className="buttons">
                            <div className="row">
                                <div className="col-md-6">
                                <button className='btn btn-success m-1' onClick={()=>addtocart(presentItem)}>ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                        <div id="product" className="product-inf">
                            <span className="active"><a href="#Description" className='text-dark fw-bold'>Product Description:</a></span>
                            <div className="tabs-content">
                                <div id="Description">
                                    <p className='text-dark'>{presentItem.description}</p>
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
