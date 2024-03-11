// Create a mini express application 

//  import express
const express = require('express')
// create variable to assign express router instance
const adminApp = express.Router()
// import express-async-handler to handle async errors (error handler in server.js cannot handle async errors)
const expressAsyncHandler = require('express-async-handler')
// import req handlers from controllers
const {getadmin,getallappointments,pendingappointments,pendingappointment,cancelledappointments} = require('../Controllers/admin-controller')
// import token verification middleware
const verifytoken = require('../Middlewares/verifytoken')
// import upload and/(or) cloudinary configurations
const {upload} = require('../Middlewares/cloudinaryUpload')
// import cors and use
const cors = require('cors')
adminApp.use(cors(
    {
        'Access-Control-Allow-Origin':'*'
    }
))



// CRUD OPERATIONS

// get admins
adminApp.get('/getadmin',expressAsyncHandler(getadmin))

// GET ALL APPOINTMENTS
adminApp.get('/getallappointments',expressAsyncHandler(getallappointments))

// GET PENDING APPOINTMENTS
adminApp.get('/pendingappointments',expressAsyncHandler(pendingappointments))

// GET PENDING APPOINTMENTS ACCORDING TO THE LOCATION,SERVICE,DATE
adminApp.post('/pendingappointment',expressAsyncHandler(pendingappointment))

// GET CANCELLED APPOINTMENTS
adminApp.get('/cancelledappointments',expressAsyncHandler(cancelledappointments))

module.exports=adminApp;
