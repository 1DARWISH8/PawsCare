import React, {useEffect,useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { productDetailsPromiseStatus } from '../redux/slices/productDetailsSlice' 

function Store() {

  let navigate = useNavigate()
  let [products,setProducts]=useState([])
  let [error,setError] =useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function tocart()
  {
    // if()
    // {
    //   navigate('/store/cart')
    // }
    // else
    // {
    //   alert("SIGN UP / LOG IN TO ORDER")
    //   navigate('/getstarted')
    // }
  }

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

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const results = products.filter(product =>
    product.productname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
};

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

      <div className='container pt-2'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
            {searchResults.map((item,index)=>
            (
                <div className='col pt-3 pb-3'  key={index}>
                    <div className='card' style={{height:'500px'}}>
                        <img src={item.image} className='card-img-top' style={{width:'auto',height:'250px'}} alt={item.name}/>
                        <div className='card-body'>
                            <h5 className='card-title'>{item.productname}</h5>
                            <p className='card-text'>Rs.{item.price}</p>
                            <span>
                            <NavLink className='btn btn-success' >ADD TO CART</NavLink>    
                            <button className='btn btn-danger' >HEART</button>    
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
