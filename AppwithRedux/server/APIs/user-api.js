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
const {getuser,getusers,registerUser,userLogin,bookAppointment,appointments,editappointment,getproducts,cart,addcartproduct,removecartproduct,editquantity,order,getorders,cancelorder,getwishlist,addtowishlist,removefromwishlist,inwishlist} = require('../Controllers/user-controller')

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

// GET ALL APPOINTMENTS
userApp.post('/appointments',expressAsyncHandler(appointments))

// Edit Appointment
userApp.post('/editappointment',expressAsyncHandler(editappointment))

// STORE

// get all products
userApp.get('/getproducts',expressAsyncHandler(getproducts))

// CART
// GET THE CART Products
userApp.get('/cart/:username',expressAsyncHandler(cart))
// Add product to cart
userApp.post('/addcartproduct',expressAsyncHandler(addcartproduct))
// Remove product from cart
userApp.post('/removecartproduct',expressAsyncHandler(removecartproduct))
// EDIT PRODUCT QUANTITY
userApp.post('/editquantity',expressAsyncHandler(editquantity))

// ORDER
userApp.post('/order',expressAsyncHandler(order))
// GET ORDER
userApp.get('/getorders/:username',expressAsyncHandler(getorders))
// CANCEL ORDER
userApp.post('/cancelorder',expressAsyncHandler(cancelorder))

// WISHLIST
// GET WISHLIST
userApp.get('/getwishlist/:username',expressAsyncHandler(getwishlist))
//ADD TO WISHLIST
userApp.post('/addtowishlist',expressAsyncHandler(addtowishlist))
// REMOVE FROM WISHLIST
userApp.post('/removefromwishlist',expressAsyncHandler(removefromwishlist))
// CHECK IF ITEM IN USER WISHLIST
userApp.post('/inwishlist',expressAsyncHandler(inwishlist))

module.exports=userApp;
