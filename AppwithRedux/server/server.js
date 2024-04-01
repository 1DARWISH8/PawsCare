// import express 
const express = require('express')
// assign instance of express to app variable
const app = express()
// connect to react app
// 'path' a core module to manipulate file path
const path = require('path')
// join paths 
// express.static middleware to serve static files
app.use(express.static(path.join(__dirname,'../build')))
// configure environment variables
require('dotenv').config()
// add body parsing middleware
app.use(express.json())

// import apis
const userApp = require('./APIs/user-api');
const adminApp = require('./APIs/admin-api')
const sellerApp = require('./APIs/seller-api')

// Forward json request to corresponding api handlers
app.use('/user-api',userApp)
app.use('/admin-api',adminApp)
app.use('/seller-api',sellerApp)

// Error Handler
app.use((err,req,res,next)=>
{
    console.error(err.stack)
    res.status(500).send({message:"Internal Server Error",payload:err.message})
})

// assign port number
const PORT = process.env.PORT||5000

// app listening to changes
app.listen(PORT,()=>console.log(`Web server is listening on PORT ${PORT}`))
