import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom'

function Deletedproduct() {

  let [products,setProducts]=useState([])
  let [error,setError] =useState('')
  let navigate = useNavigate()

  async function viewproducts()
  {
    try
    {
      let products = await axios.get('http://localhost:5000/admin-api/inactiveproducts')
      if (products)
      {
        setProducts(products.data.payload)
        console.log(products.data.payload)
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

  return (
    <div>
      <div className='container pt-2'>
      <NavLink className='btn btn-dark' to='/admin/managestore'>BACK TO PRODUCTS</NavLink>
    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
    {products.map((item,index)=>
    (
        <div className='col pt-3 pb-3'  key={index}>
            <div className='card' style={{height:'500px'}}>
                <img src={item.image} className='card-img-top' style={{width:'auto',height:'250px'}} alt={item.name}/>
                <div className='card-body'>
                    <h5 className='card-title'>{item.productname}</h5>
                    <p className='card-text'>Rs.{item.price}</p>
                    <button className='btn btn-danger' onClick={()=>restoreproduct(item)}>RESTORE</button>    
                </div>
            </div>
        </div>
    ))}
    </div>
</div>
</div>
)
}

export default Deletedproduct
