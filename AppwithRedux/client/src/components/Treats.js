import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { userLoginContext } from '../contexts/userLoginContext'
import { useNavigate } from 'react-router-dom'
import './Store.css'


function Treats() {

    let [,,userLoginStatus,,,,cart,setCart]=useContext(userLoginContext)
    let navigate = useNavigate()

    let [treats,setTreats]=useState([])
    let treatdata = async ()=> 
    {
        let treatproducts = await axios.get(`http://localhost:4000/Treats`)
        setTreats(treatproducts.data)
    };
    useEffect(()=>{
        treatdata();
    },[]);

    function addtocart(item)
    {
        console.log(item)
        if(userLoginStatus===false)
        {
            alert("SIGN UP/LOGIN TO ORDER")
            navigate('/getstarted')
        }
        else
        {
            let newcart = [...cart,item]
            setCart(newcart)
        }
    }

return (
    <div>
        <p className='text-center fw-bold' id='headertext'>
            We offer a delightful range of treats curated with love to cater to every pet's unique needs.
        </p>
        <div className='container pt-2'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
            {treats.map((item,index)=>
            (
                <div className='col pt-3 pb-3'  key={index}>
                    <div className='card' style={{height:'500px'}}>
                        <img src={item.image} className='card-img-top' style={{width:'auto',height:'250px'}} alt={item.name}/>
                        <div className='card-body'>
                            <h5 className='card-title'>{item.name}</h5>
                            <p className='card-text'>Rs.{item.price}</p>
                            <button className='btn btn-success' onClick={()=>{addtocart(item)}}>
                                Add to cart
                            </button>    
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
)
}

export default Treats
