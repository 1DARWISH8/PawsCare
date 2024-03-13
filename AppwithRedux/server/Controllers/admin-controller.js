//import models
const {User,Admin,Seller,Product, Appointment} = require('../db')
// import bcryptjs for password hashing
const bcryptjs = require('bcryptjs')
// import jsonwebtokens for JWT
const jwt = require('jsonwebtoken')
// import cloudinary middleware for image and other fileupload
const cloudinary = require('../Middlewares/cloudinaryUpload')
// import fs (filesystem) module
const fs = require('fs');
const { Axios } = require('axios');

// get admins
const getadmin = async(req,res)=>
{
    const admins = await Admin.find()
    res.status(200).send({message:"ADMINS",payload:admins})
}

// get all users
const getusers = async(req,res)=>
{
    const users = await User.find()
    res.status(200).send({message:"USERS",payload:users})
}

// deactivate or ACTIVATE user
const changeuserstatus = async(req,res)=>
{
    
    try
    {
        let username = req.body.username
        let account = req.body.accountstatus
        let changed = await User.findOneAndUpdate({username:username},
            {
                $set:
                {
                    "accountstatus":account
                }
            },
            {
                returnOriginal:false
            })
        if (changed)
        {
            res.status(200).send({message:"USER ACCOUNT STATUS UPDATED",payload:changed})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}


// get all appointments
const getallappointments = async(req,res)=>
{
    
    try
    {
        const appointments = await Appointment.find()
        if (appointments)
        {
            res.status(200).send({message:"ALL APPOINTMENTS",payload:appointments})
        }
        else
        {
            res.status(200).send({message:"ERROR IN FETCHING APPOINTMENTS"})
        }
    }
    catch(error)
    {
        res.status(200).send(error.message)
    }
}

// get pending appointments
const pendingappointments = async(req,res)=>
{
    try
    {
        const appointments = await Appointment.find({appointmentstatus:"INCOMPLETE"})
        if (appointments)
        {
            res.status(200).send({message:"PENDING APPOINTMENTS",payload:appointments})
        }
        else
        {
            res.status(200).send({message:"ERROR IN FETCHING APPOINTMENTS"})
        }
    }
    catch(error)
    {
        res.status(200).send(error.message)
    }
}

// GET PENDING APPOINTMENTS ACCORDING TO THE LOCATION,SERVICE,DATE
const pendingappointment = async(req,res)=>
{
    try
    {
        let service = req.body.service
        let location = req.body.location
        let date = req.body.date
        let status = req.body.appointmentstatus
        let appointments = await Appointment.find({service:service,location:location,date:date,appointmentstatus:status})
        if (appointments)
        {
            res.status(200).send({message:"APPOINTMENTS",payload:appointments})
        }
        else
        {
            res.status(200).send({message:"UNABLE IN FETCH APPOINTMENTS"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}


// get all cancelled appointments
const cancelledappointments = async(req,res)=>
{
    try
    {
        const appointments = await Appointment.find({appointmentstatus:"CANCELLED"})
        if (appointments)
        {
            res.status(200).send({message:"PENDING APPOINTMENTS",payload:appointments})
        }
        else
        {
            res.status(200).send({message:"ERROR IN FETCHING APPOINTMENTS"})
        }
    }
    catch(error)
    {
        res.status(200).send(error.message)
    }
}

// get products
const getproducts = async(req,res)=>
{
    try
    {
        let products = await Product.find({status:"ACTIVE"})
        if (products)
        {
            res.status(200).send({message:"PRODUCTS",payload:products})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// add product
const addproduct = async (req,res)=>
{
    try
    {
        let data = JSON.parse(req.body.data)
        console.log(data)

        let added = await Product.create(data)
        if (added)
        {
            res.status(201).send({message:"Product Added",payload:added})
        }
        else
        {
            res.status(200).send({message:"ERROR IN ADDING PRODUCTS"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}


// edit product
// get the exact product data
const getaproduct = async(req,res)=>
{
    try
    {
        let productdata = req.body
        let product = await Product.findOne({_id:productdata._id})
        if (product)
        {
            res.status(200).send({message:"Product",product:product})
        }
        else
        {
            res.status(200).send({message:"UNABLE TO FETCH DATA"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}


// EDIT A PRE-EXISTING PRODUCT
const editproduct =async (req,res)=>
{
    try
    {
        let data = JSON.parse(req.body.data)
        console.log(data)

        let added = await Product.findOneAndUpdate({productid:data.productid},
            {
                $set:
                {
                    
                }
            },
            {})
        if (added)
        {
            res.status(201).send({message:"Product Added",payload:added})
        }
        else
        {
            res.status(200).send({message:"ERROR IN ADDING PRODUCTS"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// DELETE A PRODUCT BY DEACTIVATING 
const deactivateproduct = async(req,res)=>
{
    try
    {
        let data = req.body
        // console.log(req.body)
        let deactivated = await Product.findOneAndUpdate({_id:data._id},
            {
                $set:
                {
                    "status":"INACTIVE"
                }
            },
            {
                returnDocument:false
            })
        if (deactivated)
        {
            res.status(200).send({message:"Product Deactivated"})
        }
        else
        {
            res.status(200).send({message:"ERROR WHILE DEACTIVATION"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// RESTORE A PRODUCT STATUS TO ACTIVE
const activateproduct = async(req,res)=>
{
    try
    {
        let data = req.body
        let activated = await Product.findOneAndUpdate({_id:data._id},
            {
                $set:
                {
                    "status":"ACTIVE"
                }
            },
            {
                returnDocument:false
            })
        if (activated)
        {
            res.status(200).send({message:"Product Activated"})
        }
        else
        {
            res.status(200).send({message:"ERROR WHILE ACTIVATION"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// GET ALL INACTIVE PRODUCTS
const inactiveproducts = async (req,res)=>
{
    try
    {
        let products = await Product.find({status:"INACTIVE"})
        if (products)
        {
            res.status(200).send({message:"ALL INACTIVE PRODUCTS",payload:products})
        }
        else
        {
            res.status(200).send({message:"UNABLE TO FETCH PRODUCTS"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}


module.exports={getadmin,getusers,changeuserstatus,getallappointments,pendingappointments,pendingappointment,cancelledappointments,getproducts,addproduct,getaproduct,editproduct,deactivateproduct,activateproduct,inactiveproducts}
