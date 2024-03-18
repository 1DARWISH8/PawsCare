//import models
const {User,Admin,Seller,Appointment,Appointmentday,Product,Order} = require('../db')
// import bcryptjs for password hashing
const bcryptjs = require('bcryptjs')
// import jsonwebtokens for JWT
const jwt = require('jsonwebtoken')
// import cloudinary middleware for image and other fileupload
// const {cloudinary} = require('../Middlewares/cloudinaryUpload')
// import fs (filesystem) module
const fs = require('fs');

// get users
const getusers = async(req,res)=>
{
    const users = await User.find()
    res.status(201).send({message:"USERS",payload:users})
}

// get a user BY username
const getuser = async(req,res)=>
{
    let user = req.body
    // console.log(req.body)
    const updateduser = await User.findOne({username:user.username})
    // console.log(updateduser)
    res.status(200).send({message:"USER",payload:updateduser})
}

// REGISTER USER
const registerUser = async(req,res)=>
{
    // console.log(req.body)
    // const userdata = req.body
    // console.log(userdata.userType)
    const userdata = JSON.parse(req.body.data)
    let userType = userdata.userType
    
    if (userdata.userType==='user')
    {
        let userexits = await User.findOne({username:userdata.username})
        if (userexits===null)
        {
            let hashedpassword = await bcryptjs.hash(userdata.password,5)
            userdata.password = hashedpassword;
            // upload the image into cloudinary
            // let upload = await cloudinary.uploader.upload(req.file.path);
            // userdata.profileImageURL = upload.url;
            let user = await User.create(userdata)
            // remove image from local user
            // fs.unlink(req.file.path,err=>
            //     {
            //         if(err)
            //         {
            //             throw err
            //         }
            //     })
            res.status(201).send({message:"USER CREATED",payload:user})
        }
        else
        {
            res.status(200).send({message:"USERNAME ALREADY EXISTS"})
        }
    }
    else if (userType==="admin")
    {
        console.log("in else if")
        let adminexists = await Admin.findOne({username:userdata.username})
        if (adminexists===null)
        {
            let hashedpassword = await bcryptjs.hash(userdata.password,5)
            userdata.password=hashedpassword;

            let admin = await Admin.create(userdata)
            res.status(201).send({message:"ADMIN PROFILE CREATED",payload:admin})
        }
        else
        {
            res.status(200).send({message:"ADMIN ALREADY REGISTERED!"})
        }
    }
    // else if (userType==='seller')
    // {
    //     let sellerexists = await Seller.findOne({username:userdata.username})
    //     if (sellerexists===null)
    //     {
    //         let hashedpassword = await bcryptjs.hash(userdata.password,5)
    //         userdata.password=hashedpassword
    //         let seller = await Seller.create(userdata)
    //         res.status(201).send({message:"SELLER PROFILE CREATED",payload:seller})
    //     }
    //     else
    //     {
    //         res.status(200).send({message:"SELLER ALREADY REGISTERED!"})
    //     }
    // }
}


// LOGIN USER
const userLogin = async(req,res)=>
{
    // get user login credentials
    let userCred = req.body;
    // check for data in db
    let userType = req.body.userType
    if (userType==="user")
    {
        let userExistsinDB = await User.findOne({username:userCred.username})
        if (userExistsinDB===null)
        {
            res.status(200).send({message:"INVALID USERNAME"})
        }
        else
        {
            let result = await bcryptjs.compare(userCred.password,userExistsinDB.password)
            if (result)
            {
                let signedToken = jwt.sign({username:userExistsinDB.username},process.env.SECRET_KEY,{expiresIn:300})
                res.status(200).send({message:"SUCCESSFUL LOGIN",token:signedToken,user:userExistsinDB})
            }
            else
            {
                res.status(200).send({message:"INCORRECT PASSWORD"})
            }
        }
    }
    else if (userType==="admin")
    {
        let adminExistsinDB = await Admin.findOne({username:userCred.username})
        if (adminExistsinDB===null)
        {
            res.status(200).send({message:"INVALID USERNAME"})
        }
        else
        {
            let result = await bcryptjs.compare(userCred.password,adminExistsinDB.password)
            if (result)
            {
                let signedToken = jwt.sign({username:adminExistsinDB.username},process.env.SECRET_KEY,{expiresIn:300})
                res.status(200).send({message:"SUCCESSFUL LOGIN",token:signedToken,user:adminExistsinDB})
            }
            else
            {
                res.status(200).send({message:"INCORRECT PASSWORD"})
            }
        }
    }
    // else
    // {
    //     let sellerExistsinDB = await Seller.findOne({username:userCred.username})
    //     if (sellerExistsinDB===null)
    //     {
    //         res.status(200).send({message:"INVALID USERNAME"})
    //     }
    //     else
    //     {
    //         let result = await bcryptjs.compare(userCred.password,sellerExistsinDB.password)

    //         if (result)
    //         {
    //             let signedToken = jwt.sign({username:sellerExistsinDB.username},process.env.SECRET_KEY,{expiresIn:300})
    //             res.status(200).send({message:"SUCCESSFUL LOGIN",token:signedToken,user:sellerExistsinDB})
    //         }
    //         else
    //         {
    //             res.status(200).send({message:"INCORRECT PASSWORD"})
    //         }
    //     }
    // }
}

// USER BOOKING APPOINTMENT
const bookAppointment = async(req,res)=>
{
    let details = req.body;
    let bookappointment = await Appointment.create(details)
    if (bookappointment)
    {
        res.status(201).send({message:"APPOINTMENT IS BOOKED",payload:bookappointment})
    }
    else
    {
        res.status(200).send({message:"UNABLE TO BOOK"})
    }
}

// SEE ALL APPOINTMENTS
const appointments = async(req,res)=>
{
    let username = req.body.username;
    let appointmentdetails = await Appointment.find({username:username})
    if (appointmentdetails)
    {
        res.status(200).send({message:"USER APPOINTMENTS",payload:appointmentdetails})
    }
    else
    {
        res.status(200).send({message:"Unable to retrieve appointments"})
    }
}

// EDIT APPOINTMENT STATUS
const editappointment = async(req,res)=>
{
    try
    {
        let username = req.body.username
        let _id = req.body._id
        let update = req.body.appointmentstatus
        let appointment = await Appointment.findOneAndUpdate({username:username,_id:_id},
            {
                $set:{
                    "appointmentstatus":update
                    }
            },
            {
                returnOriginal:false
            })
        if (appointment)
        {
            res.status(200).send({message:"APPOINTMENT SUCCESSFULLY EDITED",payload:appointment})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}



//STORE
const getproducts = async(req,res)=>
{
    try
    {
        let products = await Product.find({status:"ACTIVE"})
        if (products !== null)
        {
            res.status(200).send({message:"PRODUCTS",payload:products})
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


module.exports={getuser,getusers,registerUser,userLogin,bookAppointment,appointments,editappointment,getproducts}
