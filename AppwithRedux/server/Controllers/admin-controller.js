//import models
const {User,Admin,Seller,Product} = require('../db')
// import bcryptjs for password hashing
const bcryptjs = require('bcryptjs')
// import jsonwebtokens for JWT
const jwt = require('jsonwebtoken')
// import cloudinary middleware for image and other fileupload
const cloudinary = require('../Middlewares/cloudinaryUpload')
// import fs (filesystem) module
const fs = require('fs');

// get admins
const getadmin = async(req,res)=>
{
    const admins = await Admin.find()
    res.status(201).send({message:"ADMINS",payload:admins})
}

module.exports={getadmin}
