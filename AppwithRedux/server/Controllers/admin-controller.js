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

// get admins
const getadmin = async(req,res)=>
{
    const admins = await Admin.find()
    res.status(201).send({message:"ADMINS",payload:admins})
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

module.exports={getadmin,getallappointments,pendingappointments,cancelledappointments}
