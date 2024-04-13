import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom'
import { productDetailsPromiseStatus } from '../../redux/slices/productDetailsSlice'
import {useDispatch} from 'react-redux'
import {Alert} from 'react-bootstrap';
import '../Store.css'

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
      await dispatch(productDetailsPromiseStatus(item))
      navigate('/store/productpage')
    }
    catch(err)
    {
      setError(err.message)
    }
  }

  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const toggleFloatingButton = () => 
  {
    setShowFloatingButton(!showFloatingButton);
  }
  

  return (
    <div>
      <div className='search'>
          <form className='text-start mx-4'>
              <input
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={handleChange}/>  
          </form>
      </div>

  <div className="row">
    {searchResults.map((item,index)=>
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
                <ul className="product-links">
                    {/* <li><a href="#"><i className="fa fa-search"></i></a></li> */}
                    <li>
                      <NavLink className='btn' onClick={()=>edit(item)}><i className="fas fa-pencil-alt"></i></NavLink>
                    </li>
                    <li>
                        <NavLink className='btn' onClick={()=>deleteproduct(item)}><i className="fa fa-trash"></i></NavLink>    
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
  <div className="hover-container">
      <button className="stickyButton" onClick={toggleFloatingButton}>
        <i className="fas fa-plus rotated"></i>
      </button>
      {showFloatingButton && (
      <div  onClick={toggleFloatingButton}>
        <button className="floatingButton1" onClick={addproducts}>
          ADD A PRODUCT
        </button>
        <button className="floatingButton2" onClick={deletedproducts}>
          DELETED PRODUCTS
        </button>
      </div>
      )}
  </div>
</div>
</div>
  )
}

export default Managestore
