// Create a mini express application 

//  import express
const express = require('express')
// create variable to assign express router instance
const adminApp = express.Router()
// import express-async-handler to handle async errors (error handler in server.js cannot handle async errors)
const expressAsyncHandler = require('express-async-handler')
// import req hanlders from user controller
const {} = require('../Controllers/admin-controller')
// import token verification middleware
const verifytoken = require('../Middlewares/verifytoken')
// import upload and/(or) cloudinary configurations
const {upload} = require('../Middlewares/cloudinaryUpload')


// CRUD OPERATIONS

module.exports=adminApp;
