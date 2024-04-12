import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { productDetailsPromiseStatus } from '../../redux/slices/productDetailsSlice'

function Deletedproduct() {

  let [products,setProducts]=useState([])
  let [error,setError] =useState('')
  let navigate = useNavigate()
  let dispatch = useDispatch()

  async function viewproducts()
  {
    try
    {
      let products = await axios.get('http://localhost:5000/admin-api/inactiveproducts')
      if (products)
      {
        setProducts(products.data.payload)
        // console.log(products.data.payload)
      }
    }
    catch(err)
    {
      setError(err.message)
    }
  }

  useEffect(()=>viewproducts,[])

  async function restoreproduct(item)
  {
    try
    {
      let restored = await axios.post('http://localhost:5000/admin-api/activateproduct',item)
      if (restored)
      {
        navigate('/admin/managestore')
      }
    }
    catch(err)
    {
      setError(err.message)
    }
  }

  async function edit(item)
    {
      // console.log(item)
      try
      {
        await dispatch(productDetailsPromiseStatus(item))
        navigate('/admin/editproduct')
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
    <>
    <NavLink className='btn btn-dark m-4' to='/admin/managestore'>BACK TO PRODUCTS</NavLink>
    <div className="row">
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
                    {/* <li><a href="#"><i className="fa fa-search"></i></a></li> */}
                    <li>
                      <NavLink className='btn' onClick={()=>edit(item)}><i className="fas fa-pencil-alt"></i></NavLink>
                    </li>
                    <li>
                        <NavLink className='btn' onClick={()=>restoreproduct(item)}><i className="fa fa-undo"></i></NavLink>    
                    </li>
                </ul>
                {/* <a href="" className="add-to-cart text-start">IN STOCK:</a> */}
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
</div>
</>
)
}

export default Deletedproduct
