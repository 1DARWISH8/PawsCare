import React from 'react'

function ProductsNotfound({message}) {
  return (
    <div className='my-auto text-center p-3'>
        <h4 className='text-danger' id='health'>OOPS!</h4>
        <h5 id='health'>{message}</h5>
        <img src='https://res.cloudinary.com/dozacgfl7/image/upload/v1714370673/unable_to_find_pa9trp.jpg' width='95%'/>
    </div>
  )
}

export default ProductsNotfound
