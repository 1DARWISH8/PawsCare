// useContext hook is imported to change 
import React, { useContext } from 'react'

import { userLoginContext } from '../contexts/userLoginContext'

function Healthcard() {

    let [currentUser]=useContext(userLoginContext)
    
return (
    <div className='container'>
            <div className='row justify-content-center align-items-center' >
        <div className='col-12'>
            <div className=' card bg-success m-5  g-0 text-center'>
            <div >
                <img src={currentUser.imageupload} className='img-fluid rounded-circle m-2' width="150" height="150" alt='PET'/>
            </div>
                <div className='card-body text-light fw-bold '>
                    <p>PETNAME:<span className='text-black m-2'>{currentUser.petname}</span></p>
                    <p>Previous health checkup was on <span className='fw-bold text-black m-1'>"{currentUser.checkupdate}"</span></p>
                    {currentUser.date?<p>Next appointment has been booked for <span className='text-black'>"{currentUser.date}"</span></p>:
                        <p className='text-warning'>Schedule {currentUser.petname}'s next health checkup in the next 2 months</p>
                    }
                </div>
            </div>
        </div>
    </div>
    </div>
)
}

export default Healthcard
