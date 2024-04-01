import React from 'react'
import Header from './components/Header'
import {Outlet} from 'react-router-dom'
import Footer from './components/Footer'

function Rootlayout() {
  return (
    <div>
        <div>
            <Header/>
        </div>
        <div style={{minHeight:'82vh'}}>
            <Outlet/>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default Rootlayout
