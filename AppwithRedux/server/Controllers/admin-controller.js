//import models
const {User,Admin,Seller,Appointment,Appointmentday,Product,Order} = require('../db')
// import bcryptjs for password hashing
const bcryptjs = require('bcryptjs')
// import jsonwebtokens for JWT
const jwt = require('jsonwebtoken')
// import cloudinary middleware for image and other fileupload
const {cloudinary} = require('../Middlewares/cloudinaryUpload')
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

const bookappointment = async (req,res)=>
{
    let details = req.body;
    let appointment_date = details.appointment_date 
    // Create a new Date object from the ISO 8601 formatted string
    appointment_date = new Date(appointment_date)
    // Get the date
    appointment_date.setDate(appointment_date.getDate());
    // Use Date methods to get the desired date string format
    details.appointment_date = appointment_date.toDateString() + " " + appointment_date.toTimeString().substring(0, 8) + " GMT+0530 (India Standard Time)";
    // console.log(details)
    let slotbooked = await Appointmentday.findOneAndUpdate(
        {appointment_date:details.appointment_date,appointment_service:details.appointment_service,appointment_location:details.appointment_location,'slots.appointment_time':details.appointment_time},
        {
            $set:
            {
                'slots.$.appointment_status':'booked',
                'slots.$.booked_by':details.username
            }
        },
        {
            new:true
        }
        )
    // console.log(slotbooked)
    if (slotbooked)
    {
        let bookappointment = await Appointment.create(details)
        if(bookappointment)
        {
            res.status(201).send({message:"APPOINTMENT HAS BEEN BOOKED",payload:bookappointment})        
        }
        else
        {
            res.status(200).send({message:"BOOKING ERROR"})
        }
    }
    else
    {
        res.status(200).send({message:"BOOKING ERROR"})
    }
}

// CANCEL APPOINTMENT
const cancelappointment = async(req,res)=>
{
    try
    {
        let details = req.body
        let slotbooked = await Appointmentday.findOneAndUpdate(
            {appointment_date:details.appointment_date,appointment_service:details.appointment_service,appointment_location:details.appointment_location,'slots.appointment_time':details.appointment_time},
            {
                $set:
                {
                    'slots.$.appointment_status':'available',
                    'slots.$.booked_by':'none'
                }
            },
            {
                new:true
            }
            )
            if(slotbooked)
            {
                let bookedappointment = await Appointment.findOneAndUpdate({_id:details._id},
                    {
                        $set:
                        {
                            "appointment_status":"CANCELLED",
                            "cancelled_by":"admin"
                        }
                    },
                    {
                        returnOriginal:false
                    })
            if (bookedappointment)
            {
                res.status(200).send({message:"APPOINTMENT CANCELLED",payload:bookedappointment})
            }
            else
            {
                res.status(200).send({message:"ERROR WHILE CANCELLING APPOINTMENT"})
            }
        }
        
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// APPOINTMENT COMPLETED
const appointmentcompleted = async (req,res)=>
{
    try
    {
        let details = req.body
        let bookedappointment = await Appointment.findOneAndUpdate({_id:details._id},
            {
                $set:
                {
                    "appointment_status":"COMPLETED"
                }
            },
            {
                returnOriginal:false
            })
        if (bookedappointment)
        {
            res.status(200).send({message:"APPOINTMENT IS COMPLETE",payload:bookedappointment})
        }
        else
        {
            res.status(200).send({message:"ERROR WHILE UPDATING APPOINTMENT"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// RESCEHDULE APPOINTMENT
const rescheduleappointment = async (req,res)=>
{
    try
    {
        let details = req.body
        // console.log(details)
        let appointment_date = details.appointment_date 
        // Create a new Date object from the ISO 8601 formatted string
        appointment_date = new Date(appointment_date)
        // Get the date
        appointment_date.setDate(appointment_date.getDate());
        // Use Date methods to get the desired date string format
        details.appointment_date = appointment_date.toDateString() + " " + appointment_date.toTimeString().substring(0, 8) + " GMT+0530 (India Standard Time)";
        let new_appointment_date = details.new_appointment_date 
        // Create a new Date object from the ISO 8601 formatted string
        new_appointment_date = new Date(new_appointment_date)
        // Get the date
        new_appointment_date.setDate(new_appointment_date.getDate());
        // Use Date methods to get the desired date string format
        details.new_appointment_date = new_appointment_date.toDateString() + " " + new_appointment_date.toTimeString().substring(0, 8) + " GMT+0530 (India Standard Time)";
        let appointmentday_unbooked = await Appointmentday.findOneAndUpdate(
            {appointment_date:details.appointment_date,appointment_service:details.appointment_service,appointment_location:details.appointment_location,'slots.appointment_time':details.appointment_time},
            {
                $set:
                {
                    'slots.$.appointment_status':'available',
                    'slots.$.booked_by':'none'
                }
            },
            {
                returnOriginal:true
            }
        )
        if(appointmentday_unbooked)
        {
            let appointmentday_booking = await Appointmentday.findOneAndUpdate(
                {appointment_date:details.new_appointment_date,appointment_service:details.appointment_service,appointment_location:details.appointment_location,'slots.appointment_time':details.new_appointment_time},
                {
                    $set:
                    {
                        'slots.$.appointment_status':'booked',
                        'slots.$.booked_by':details.username
                    }
                },
                {
                    returnOriginal:true
                }
            )
            if (appointmentday_booking)
            {
                let rescheduled_appointment = await Appointment.findOneAndUpdate({_id:details._id},
                {
                    $set:
                    {
                        "appointment_date":details.new_appointment_date,
                        "appointment_time":details.new_appointment_time,
                        "rescheduled_status":"yes",
                    }
                },
                {
                    new:true
                })
                let added_previous_details = await Appointment.findOneAndUpdate({_id:details._id},
                    {
                        $push:
                        {
                            reschedule_details:
                            {
                                previous_appointment_date:details.appointment_date,
                                previous_appointment_time:details.appointment_time
                            }
                        }
                    },
                    {
                        new:true
                    })
                if (rescheduled_appointment)
                {
                    res.status(200).send({message:"APPOINTMENT RESCHEDULED SUCCESSFULLY",payload:rescheduled_appointment})
                }
                else
                {
                    res.status(200).send({message:"FAILED TO RESCHEDULE"})
                }
            }
            else
            {
                res.status(200).send({message:"FAILED TO RESCHEDULE"})
            }
        }
        else
        {
            res.status(200).send({message:"FAILED TO RESCHEDULE"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// get pending appointments
const pendingappointments = async(req,res)=>
{
    try
    {
        const appointments = await Appointment.find({appointment_status:"INCOMPLETE"})
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
        let appointments = await Appointment.find({service:req.body.appointment_service,location:req.body.appointment_location,date:req.body.appointment_date,appointmentstatus:req.body.appointment_status})
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
        const appointments = await Appointment.find({appointment_status:"CANCELLED"})
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
        let product_exists = await Product.findOne({productid:data.productid})
        if (product_exists===null)
        {
            data.discounted_price = Math.round(data.price * ((100 - data.discount_percent) / 100));
            let uploads = [];
            for (const file of req.files) {
                let upload = await cloudinary.uploader.upload(file.path);
                uploads.push({ ImageURL: upload.secure_url });
            }
            let image=uploads
            data = {...data,image}
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
        else
        {
            res.status(200).send({message:"PRODUCT WITH THE PRODUCT ID EXISTS"})
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
        let data = req.body
        data.discounted_price = Math.round(data.price * (100 - data.discount_percent) / 100);
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
                    "order_status":orderdata.order_status
                }
            },
            {
                new:true
            })
        if (edited.order_status==='ACCEPTED')
        {
            res.status(200).send({message:'ORDER HAS BEEN ACCEPTED',payload:edited})
        }
        else if (edited.order_status==='CANCELLED')
        {
            let cancelled = await Order.findOneAndUpdate({_id:orderdata._id},
                {
                    $set:
                    {
                        cancelled_by:"admin"
                    }
                },
                {
                    new:false
                }
            )
            res.status(200).send({message:"ORDER HAS BEEN CANCELLED",payload:edited})
        }
        else if (edited.order_status==='IN TRANSIT')
        {
            res.status(200).send({message:"ORDER IS IN TRANSIT",payload:edited})
        }
        else if (edited.order_status==='OUT FOR DELIVERY')
        {
            res.status(200).send({message:"ORDER IS OUT FOR DELIVERY",payload:edited})
        }
        else if (edited.order_status==='DELIVERED')
        {
            let payment_edited = await Order.findOneAndUpdate({_id:orderdata._id},
                {
                    $set:
                    {
                        "payment_status":"COMPLETE"
                    }
                },
                {
                    new:true
                })
                if (payment_edited)
                {
                    res.status(200).send({message:"ORDER HAS BEEN DELIVERED",payload:edited})
                }
                else
                {
                    res.status(200).send({message:'FAILED TO UPDATE ORDER STATUS'})
                }
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

const getspecificappointments = async (req,res)=>
{
    try
    {
        
        let {service,location}=req.query
        let query = req.originalUrl.split('?')[1]
        let datequery = query.split('&')[0]
        let date = new URLSearchParams(datequery)
        date = decodeURIComponent(date.get('date'))
        date = new Date(date);
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options).replace(/,/g, '');
        date = formattedDate + " 00:00:00 GMT+0530 (India Standard Time)"
        let appointments_data = await Appointmentday.find({appointment_date:date,appointment_service:service,appointment_location:location})
        if(appointments_data)
        {
            res.status(200).send({message:"APPOINTMENTS",payload:appointments_data})
        }
        else
        {
            res.status(200).send({message:"FAILED TO RETRIEVE DATA"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

module.exports={getadmin,getusers,changeuserstatus,getallappointments,bookappointment,cancelappointment,appointmentcompleted,rescheduleappointment,pendingappointments,pendingappointment,cancelledappointments,getproducts,addproduct,getaproduct,editproduct,deactivateproduct,activateproduct,inactiveproducts,updatestock,getappointmentdate,getspecificappointments,getorders,editorderstatus}
