// Create a mini express application 

//  import express
const express = require('express')
// create variable to assign express router instance
const adminApp = express.Router()
// import express-async-handler to handle async errors (error handler in server.js cannot handle async errors)
const expressAsyncHandler = require('express-async-handler')
// import req handlers from controllers
const {getadmin,getusers,changeuserstatus,getallappointments,bookappointment,cancelappointment,appointmentcompleted,rescheduleappointment,pendingappointments,pendingappointment,cancelledappointments,getproducts,addproduct,getaproduct,editproduct,deactivateproduct,activateproduct,inactiveproducts,updatestock,getappointmentdate,getspecificappointments,getorders,editorderstatus} = require('../Controllers/admin-controller')
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

// BOOK APPOINTMENT
adminApp.post('/bookappointment',expressAsyncHandler(bookappointment))

// GET PENDING APPOINTMENTS
adminApp.get('/pendingappointments',expressAsyncHandler(pendingappointments))

// GET PENDING APPOINTMENTS ACCORDING TO THE LOCATION,SERVICE,DATE
adminApp.post('/pendingappointment',expressAsyncHandler(pendingappointment))

// CANCEL APPOINTMENTS
adminApp.post('/cancelappointment',expressAsyncHandler(cancelappointment))

// APPOINTMENT COMPLETED
adminApp.post('/appointmentcompleted',expressAsyncHandler(appointmentcompleted))

// RESCHEDULE APPOINTMENT
adminApp.post('/rescheduleappointment',expressAsyncHandler(rescheduleappointment))

// GET CANCELLED APPOINTMENTS
adminApp.get('/cancelledappointments',expressAsyncHandler(cancelledappointments))

// GET PRODUCTS
adminApp.get('/getproducts',expressAsyncHandler(getproducts))

// ADD PRODUCT
adminApp.post('/addproduct',upload.array('images'),expressAsyncHandler(addproduct))

// EDIT PRODUCT
// get the exact product details
adminApp.post('/getaproduct',expressAsyncHandler(getaproduct))
adminApp.post('/editproduct',expressAsyncHandler(editproduct))

// DELETE A PRODUCT BY DEACTIVATING IT
adminApp.post('/deactivateproduct',expressAsyncHandler(deactivateproduct))

// RESTORE A PRODUCT BY ACTIVATING IT
adminApp.post('/activateproduct',expressAsyncHandler(activateproduct))

// GET INACTIVE PRODUCTS
adminApp.get('/inactiveproducts',expressAsyncHandler(inactiveproducts))

// CHANGE STOCK STATUS OF PRODUCT
adminApp.post('/updatestock',expressAsyncHandler(updatestock))

// POST AND GET DATE APPOINTMENT
adminApp.post('/getappointmentdate',expressAsyncHandler(getappointmentdate))

// GET APPOINTMENT ACCORDING TO LOCATION, SERVICE AND DATE
adminApp.get('/getspecificappointments',expressAsyncHandler(getspecificappointments))

// MANAGE ORDERS

// GET ORDERS ACCORDING TO THE STATUS
adminApp.get('/getorders',expressAsyncHandler(getorders))

// EDIT ORDER STATUS BY POST
adminApp.patch('/editorderstatus',expressAsyncHandler(editorderstatus))

module.exports=adminApp;
