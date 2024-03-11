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

module.exports={getadmin,getusers,changeuserstatus,getallappointments,pendingappointments,pendingappointment,cancelledappointments}
