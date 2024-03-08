// Create a mini express application 

//  import express
const express = require('express')
// create variable to assign express router instance
const userApp = express.Router()
// import express-async-handler to handle async errors (error handler in server.js cannot handle async errors)
const expressAsyncHandler = require('express-async-handler')

// import token verification middleware
const verifytoken = require('../Middlewares/verifytoken')
// import upload and/(or) cloudinary configurations
const {upload} = require('../Middlewares/cloudinaryUpload')
// import cors and use
const cors = require('cors')
userApp.use(cors(
    {
        'Access-Control-Allow-Origin':'*'
    }
))

// import req handlers from controllers
const {getuser,getusers,registerUser,userLogin,bookAppointment} = require('../Controllers/user-controller')

// CRUD OPERATIONS

// get user
userApp.get('/getusers',expressAsyncHandler(getusers))

//get specific user details 
userApp.post('/getuser',expressAsyncHandler(getuser))

// CREATE A USER IN USER COLLECTION OF PAWSCARE
userApp.post('/registeruser',upload.single('pic'),expressAsyncHandler(registerUser))

// USER LOGIN
userApp.post('/login',expressAsyncHandler(userLogin))

// USER BOOKING APPOINTMENT
userApp.post('/bookappointment',expressAsyncHandler(bookAppointment))

module.exports=userApp;
