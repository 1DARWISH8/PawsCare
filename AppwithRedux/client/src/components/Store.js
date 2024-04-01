import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 
import {Alert} from 'react-bootstrap';
import {} from './Store.css'

function Store() {

  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [products,setProducts]=useState([])
  let [error,setError] =useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let {currentUser}=useSelector(state=>state.userLogin)
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
        // console.log(products.data.payload)
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

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const results = products.filter(product =>
    product.productname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
};

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
      dispatch(productDetailsPromiseStatus(item))
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

      <div className='text-center'>
                <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={handleChange}
        />
      </div>

      {error.length!==0&& <p className='fw-bold text-center text-danger border-0'>{error}</p>}
      {alert.length!==0 && <Alert variant={'dark'} onClose={()=>setAlert('')}>{alert}</Alert> }
      <div className='container pt-2'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
            {searchResults.map((item,index)=>
            (
                <div className='col pt-3 pb-3'  key={index}>
                    <div className='card' style={{height:'500px'}}>
                        {
                          item.stock === 'In Stock' ?
                          <img src={item.image} className='card-img-top' style={{width:'auto',height:'250px'}} alt={item.name} onClick={()=>openproductpage(item)}/>
                          :
                          <div className="product-card">
                            <img src={item.image} className='card-img-top' style={{width:'auto',height:'250px'}} alt={item.name} onClick={()=>openproductpage(item)}/>
                            <div className={`text-overlay 'out-of-stock'}`}>
                              <p>{'Out of Stock'}</p>
                            </div>
                          </div>
                        }
                        <div className='card-body'>
                            <h5 className='card-title' onClick={()=>openproductpage(item)}>{item.productname}</h5>
                            <p className='card-text'>Rs.{item.price}</p>
                            <span>
                            {
                              item.stock === 'In Stock'?
                              <button className='btn btn-success m-1' onClick={()=>addtocart(item)}>ADD TO CART</button>
                              :
                              <button className='btn btn-success m-1' disabled={true} onClick={()=>addtocart(item)}>ADD TO CART</button>
                            }
                            {/* {
                              checkwishlist(item)?
                              <button className='btn' onClick={()=>removefromwishlist(item)} ><span className='text-danger'><i class="bi bi-heart-fill"></i></span></button>    
                              :
                              <button className='btn' onClick={()=>addtowishlist(item)} ><span className='text-danger'><i class="bi bi-heart"></i></span></button>    
                            } */}
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

export default Store
