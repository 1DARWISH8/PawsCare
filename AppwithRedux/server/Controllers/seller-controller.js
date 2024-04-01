//import models
const {User,Admin,Seller,Product} = require('../db')
// import bcryptjs for password hashing
const bcryptjs = require('bcryptjs')
// import jsonwebtokens for JWT
const jwt = require('jsonwebtoken')
// import cloudinary middleware for image and other fileupload
const {cloudinary} = require('../Middlewares/cloudinaryUpload')
// import fs (filesystem) module
const fs = require('fs');

// get sellers
const getseller = async(req,res)=>
{
    const sellers = await Seller.find()
    res.status(201).send({message:"SELLERS",payload:sellers})
}


module.exports={getseller}
