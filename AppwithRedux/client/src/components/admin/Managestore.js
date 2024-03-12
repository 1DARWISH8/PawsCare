import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom'

function Managestore() 
{
  let [products,setProducts]=useState([])
  let [error,setError] =useState('')
  let navigate = useNavigate()
  
  async function viewproducts()
  {
    try
    {
      let products = await axios.get('http://localhost:5000/admin-api/getproducts')
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

  function addproducts()
  {
    navigate('/admin/addproduct')
  }
  function deletedproducts()
  {
    navigate('/admin/deletedproducts')
  }

  function edit(item)
  {

  }

  async function deleteproduct(item)
  {
    try
    {
      let deactivatedproduct = await axios.post('http://localhost:5000/admin-api/deactivateproduct',item)
      if (deactivatedproduct)
      {
        navigate('/admin/deletedproducts')
      }
    }
    catch(err)
    {
      setError(err.message)
    }
  }

  useEffect(()=>viewproducts,[])
  
  return (
    <div>
      <button className='btn btn-primary m-3' onClick={addproducts}>ADD PRODUCTS</button>
      <button className='btn btn-primary m-3' onClick={deletedproducts}>DELETED PRODUCTS</button>

      <div className='container pt-2'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
            {products.map((item,index)=>
            (
                <div className='col pt-3 pb-3'  key={index}>
                    <div className='card' style={{height:'500px'}}>
                        <img src={item.image} className='card-img-top' style={{width:'auto',height:'250px'}} alt={item.name}/>
                        <div className='card-body'>
                            <h5 className='card-title'>{item.productname}</h5>
                            <p className='card-text'>Rs.{item.price}</p>
                            <span>
                            <button className='btn btn-success' onClick={()=>edit(item)}>EDIT</button>    
                            <button className='btn btn-danger' onClick={()=>deleteproduct(item)}>DELETE</button>    
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

export default Managestore
