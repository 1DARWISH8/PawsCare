import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';
import './Store.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Store() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [products,setProducts]=useState([])
  let [error,setError] =useState('')
  // const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let {currentUser,loginStatus}=useSelector(state=>state.userLogin)
  let [alert,setAlert] = useState('')
  let [wishlist,setWishlist] = useState([])


  async function viewproducts()
  {
    try
    {
      let products = await axios.get('http://localhost:5000/user-api/getproducts')
      if (products)
      {
        setProducts(products.data.payload)
        setSearchResults(products.data.payload)
      }
    }
    catch(err)
    {
      setError(err.message)
    }
  }


  useEffect(()=>viewproducts,[])

async function getwishlist()
{
    try
    {
        let products = await axios.get(`http://localhost:5000/user-api/getwishlist/${currentUser.username}`)
        // console.log(products)
        if (products)
        {
            setWishlist(products.data.payload)
        }
    }
    catch(err)
    {
        setError(err.message)
    }
}

useEffect(()=>getwishlist,[])

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

//   const handleChange = (e) => {
//     setSearchTerm(e.target.value);
//     const results = products.filter(product =>
//     product.productname.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setSearchResults(results);
// };

// async function checkwishlist(item)
// {
//   try
//   {
//     let present = wishlist.find(product => product._id === item._id && product.name === item.productname) !== undefined;
//     console.log(wishlist)
//     console.log(present)
//     return present

//   }
//   catch(err)
//   {
//     setError(err.message)  
//   }
// }

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

  async function addtowishlist(item)
  {
    try
    {
      let username=currentUser.username;
      item = {...item,username}
      console.log(item)
      let addtowishlist = await axios.post('http://localhost:5000/user-api/addtowishlist',item)
      console.log(addtowishlist)
      if (addtowishlist.data.message === "PRODUCT ADDED TO WISHLIST")
      {
        setAlert('PRODUCT ADDED TO WISHLIST')
        viewproducts()
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
        viewproducts()
      }    }
    catch(err)
    {
      setError(err.message)
    }
  }

  return (
    <div>
      {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
      {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
      
      
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
    </div>
  )
  {/* {
    checkwishlist(item)?
    <button className='btn' onClick={()=>removefromwishlist(item)} ><span className='text-danger'><i class="bi bi-heart-fill"></i></span></button>    
    :
    <button className='btn' onClick={()=>addtowishlist(item)} ><span className='text-danger'><i class="bi bi-heart"></i></span></button>    
  } */}
}

export default Store
