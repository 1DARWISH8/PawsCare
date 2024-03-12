// Create a mini express application 

//  import express
const express = require('express')
// create variable to assign express router instance
const adminApp = express.Router()
// import express-async-handler to handle async errors (error handler in server.js cannot handle async errors)
const expressAsyncHandler = require('express-async-handler')
// import req handlers from controllers
const {getadmin,getusers,changeuserstatus,getallappointments,pendingappointments,pendingappointment,cancelledappointments,getproducts,addproduct,getaproduct,editproduct,deactivateproduct,activateproduct,inactiveproducts} = require('../Controllers/admin-controller')
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

// get ALL USERS
adminApp.get('/getusers',expressAsyncHandler(getusers))

// deactivate user using post
adminApp.post('/changeuserstatus',expressAsyncHandler(changeuserstatus))

// GET ALL APPOINTMENTS
adminApp.get('/getallappointments',expressAsyncHandler(getallappointments))

// GET PENDING APPOINTMENTS
adminApp.get('/pendingappointments',expressAsyncHandler(pendingappointments))

// GET PENDING APPOINTMENTS ACCORDING TO THE LOCATION,SERVICE,DATE
adminApp.post('/pendingappointment',expressAsyncHandler(pendingappointment))

// GET CANCELLED APPOINTMENTS
adminApp.get('/cancelledappointments',expressAsyncHandler(cancelledappointments))

// GET PRODUCTS
adminApp.get('/getproducts',expressAsyncHandler(getproducts))

// ADD PRODUCT
adminApp.post('/addproduct',upload.single('image'),expressAsyncHandler(addproduct))

// EDIT PRODUCT
// get the exact product details
adminApp.post('/getaproduct',expressAsyncHandler(getaproduct))
adminApp.post('/editproduct',upload.single('image',expressAsyncHandler(editproduct)))

// DELETE A PRODUCT BY DEACTIVATING IT
adminApp.post('/deactivateproduct',expressAsyncHandler(deactivateproduct))

// RESTORE A PRODUCT BY ACTIVATING IT
adminApp.post('/activateproduct',expressAsyncHandler(activateproduct))

// GET INACTIVE PRODUCTS
adminApp.get('/inactiveproducts',expressAsyncHandler(inactiveproducts))

module.exports=adminApp;
