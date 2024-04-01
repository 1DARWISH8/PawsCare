import React from 'react'
import logo from '../images/pawscarelogo.png'
// import styled from 'styled-components'


// let backgroundImage = 'url("https://img.freepik.com/free-vector/frame-with-dogs-vector-white-background_53876-127700.jpg")';

// let Background = styled.div`
// background-image: ${backgroundImage};
// background-size: cover;
// background-position: center;
// width: 100vw;
// height: 100vh;
// position: relative;
// `;

// const Content = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   text-align: center;
//   color: white;
// `;

function Contact() {
  return (
    <div>
      <div className='card-group p-5'>
      <div className='card border-0' >
        <div className='card-body justify-content-center text-center'>
          <h3>CONTACT US</h3>
          <img src={logo} alt='logo'></img>
        </div>
      </div>
      <div className='card border-0'style={{width:'300px',Height:'500px'}} >
        <div className='card-body pt-5'>
          <h5>PHONE:</h5>
          <p>+91 85984 49030 (BANGALORE)</p>
          <p>+91 93829 29239 (CHENNAI) </p>
          <p>+91 48833 98437 (DELHI)</p>
          <p>+91 95436 64365 (HYDERABAD) </p>
          <h6>WRITE TO US:</h6>
          <a className='fw-bold' href='#'>pawscare@gmail.com</a>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Contact
