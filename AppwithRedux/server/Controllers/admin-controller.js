//import models
const {User,Admin,Seller,Appointment,Appointmentday,Product,Order} = require('../db')
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

// Create appointmentday slots for the current year
async function autoFilldays()
{
    try
    {
        // CHECK IF THE COLLECTION IS ALREADY PREPOPULATED
        const documentcount = await Appointmentday.countDocuments({})
        // console.log(documentcount)
        if (documentcount === 0)
        {
            // Get the current year
            const currentYear = new Date().getFullYear();
            let servicetype = ['HEALTH CHECK UP','GROOMING','TRAINING']
            let locations = ['BANGALORE','CHENNAI','HYDERABAD','VISAKHAPATNAM']
            // loop through locations
            for (let locationcount = 0; locationcount <=3 ; locationcount++)
            {
                // loop through services
                for (let count = 0; count <3; count++)
                {
                    // Loop through all dates in the current year
                    for (let month = 0; month < 12; month++)
                    {
                        // get the date
                        const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
                        // loop through days of the month
                        for (let day = 1; day <= daysInMonth; day++) 
                        {
                            // Generate document for each date
                            let appointment_date = new Date(currentYear, month, day)
                            // console.log(date)
                            // date.setHours(5,30,0,0) //Function to set the time to 00:00:00 hrs
                            const appointment_service = servicetype[count]
                            const appointment_location = locations[locationcount]
                            const slots = generateSlots(); // Function to generate time slots
                            const dayAppointment = new Appointmentday({appointment_date,appointment_service,appointment_location,slots });
                            // Insert document into the collection
                            await dayAppointment.save();
                        }
                    }
                }
            }
            console.log('Day appointments auto-filled successfully');
        }
    }
    
    catch(err)
    {
        console.error('Error auto-filling day appointments:', err);
    }
}


// Function to generate time slots for a day (customize as needed)
function generateSlots() {
    // Example: Generate slots for every hour from 9 AM to 5 PM
    const slots = [];
    for (let hour = 9; hour <= 11; hour++) {
        slots.push({ appointment_time: `${hour}:00 AM`, status: 'available' });
        slots.push({ appointment_time: `${hour}:30 AM`, status: 'available' });
    }
    for (let hour = 1; hour <= 5; hour++) {
        slots.push({ appointment_time: `${hour}:00 PM`, status: 'available' });
        slots.push({ appointment_time: `${hour}:30 PM`, status: 'available' });
    }
    return slots
}

// Run the auto-fill script
autoFilldays();

// GET A EXACT DATE FOR APPOINTMENTS
const getappointmentdate = async(req,res)=>
{
    try
    {

        let service = req.body.service
        let date = req.body.date
        let obtained = await Appointmentday.findOne({date:date,service:service})
        res.status(200).send({message:"DATE AND APPOINTMENT",payload:obtained})
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
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
        // console.log(data)

        let edited = await Product.findOneAndUpdate({_id:data._id},
            {
                $set:data
            },
            {
                returnOriginal:false
            })
        if (edited)
        {
            res.status(200).send({message:"Product Edited",payload:edited})
        }
        else
        {
            res.status(200).send({message:"ERROR IN EDITING PRODUCTS"})
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

// CHANGE PRODUCT STATUS
const updatestock = async(req,res)=>
{
    try
    {
        let data = req.body
        // console.log(data)
        let stockupdated = await Product.findOneAndUpdate({_id:data._id},
            {
                $set:
                {
                    "stock":data.stock
                }
            },
            {
                returnDocument:false
            })
        // console.log(stockupdated)
        if (stockupdated)
        {
            res.status(200).send({message:"Product Stock Updated"})
        }
        else
        {
            res.status(200).send({message:"ERROR WHILE UPDATING STOCK"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
} 


const getorders = async(req,res)=>
{
    try
    {
        let orders = await Order.find()
        if (orders)
        {
            res.status(200).send({message:"ORDERS",payload:orders})
        }
        else
        {
            res.status(200).send({message:"UNABLE TO FETCH ORDERS"})

        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

const editorderstatus = async(req,res)=>
{
    try
    {
        let orderdata = req.body
        let edited = await Order.findOneAndUpdate({_id:orderdata._id},
            {
                $set:
                {
                    "orderstatus":orderdata.orderstatus
                }
            },
            {
                new:true
            })
        if (edited.orderstatus==='ACCEPTED')
        {
            res.status(200).send({message:'ORDER HAS BEEN ACCEPTED',payload:edited})
        }
        else if (edited.orderstatus==='CANCELLED')
        {
            res.status(200).send({message:"ORDER HAS BEEN CANCELLED",payload:edited})
        }
        else if (edited.orderstatus==='IN TRANSIT')
        {
            res.status(200).send({message:"ORDER IS IN TRANSIT",payload:edited})
        }
        else if (edited.orderstatus==='OUT FOR DELIVERY')
        {
            res.status(200).send({message:"ORDER IS OUT FOR DELIVERY",payload:edited})
        }
        else if (edited.orderstatus==='DELIVERED')
        {
            res.status(200).send({message:"ORDER HAS BEEN DELIVERED",payload:edited})
        }
        else
        {
            res.status(200).send({message:'FAILED TO UPDATE ORDER STATUS'})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

module.exports={getadmin,getusers,changeuserstatus,getallappointments,pendingappointments,pendingappointment,cancelledappointments,getproducts,addproduct,getaproduct,editproduct,deactivateproduct,activateproduct,inactiveproducts,updatestock,getappointmentdate,getorders,editorderstatus}
