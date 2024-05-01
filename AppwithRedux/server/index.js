// import express 
const express = require('express')
// assign instance of express to app variable
const app = express()
// connect to react app
// 'path' a core module to manipulate file path
const path = require('path')
// import cors
const cors = require('cors')

// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// } 

app.use(cors({
origin:["https://paws-care.vercel.app/"],

methods:["POST","GET","PUT","DELETE"],
credentials:true
}))

// join paths 
// express.static middleware to serve static files
app.use(express.static(path.join(__dirname,'../build')))
// configure environment variables
require('dotenv').config()
// add body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// add cors to app
// app.use(allowCors)

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
