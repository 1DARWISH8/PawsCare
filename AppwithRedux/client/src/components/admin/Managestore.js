import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom'
import { productDetailsPromiseStatus } from '../../redux/slices/productDetailsSlice'
import {useDispatch,useSelector} from 'react-redux'
import {Alert} from 'react-bootstrap';

function Managestore() 
{
  let [products,setProducts]=useState([])
  let [error,setError] =useState('')
  let navigate = useNavigate()
  let dispatch = useDispatch()
  // let {productSelected,errorMessage} = useSelector(state=>state.productdetails)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let [alert,setAlert] = useState('')
  
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

  async function viewproducts()
  {
    try
    {
      let products = await axios.get('http://localhost:5000/admin-api/getproducts')
      if (products)
      {
        setProducts(products.data.payload)
        setSearchResults(products.data.payload)
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

  
  useEffect(()=>viewproducts,[])
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const results = products.filter(product =>
      product.productname.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(results);
    };
    
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
          navigate('/admin/deletedproducts')
        }
      }
      catch(err)
      {
        setError(err.message)
      }
    }

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
        viewproducts()
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
        viewproducts()
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
  

  return (
    <div>
      <button className='btn btn-primary m-3' onClick={addproducts}>ADD PRODUCTS</button>
      <button className='btn btn-primary m-3' onClick={deletedproducts}>DELETED PRODUCTS</button>
      

        <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={handleChange}
        />


      <div className='container pt-2'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
            {searchResults.map((item,index)=>
            (
                <div className='col pt-3 pb-3'  key={index}>
                    <div className='card' style={{height:'500px'}}>
                        <img src={item.image} className='card-img-top' style={{width:'auto',height:'250px'}} alt={item.name} onClick={()=>openproductpage(item)}/>
                        <div className='card-body'>
                            <h5 className='card-title'>{item.productname}</h5>
                            <p className='card-text'>Rs.{item.price}</p>
                            <span>
                            <NavLink className='btn btn-success m-3' onClick={()=>edit(item)}>EDIT</NavLink>    
                            <button className='btn btn-danger' onClick={()=>deleteproduct(item)}>DELETE</button>    
                            </span>
                            <div className='text-center'>
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
                            </div>
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
