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


// GET BOOKING SLOTS INFORMATION
const getallslots = async(req,res)=>
{
    try
    {
        let query = req.originalUrl.split('?')[1]
        let datequery = query.split('&')[0]
        let date = new URLSearchParams(datequery)
        date = decodeURIComponent(date.get('date'))
        let [beforeGMT,afterGMT]=date.split("GMT")
        afterGMT= afterGMT.trim()
        date=`${beforeGMT}GMT+${afterGMT}`;
        console.log(req.query)
        // console.log(date)
        let {service,location} = req.query
        let slots = await Appointmentday.findOne({appointment_date:date,appointment_service:service,appointment_location:location})
        // console.log(slots)
        if (slots)
        {
            res.status(200).send({message:"TIMESLOTS",payload:slots.slots})
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

// CART

// GET CART PRODUCTS
const cart = async(req,res)=>
{
    let username = req.params.username
    let cartproducts = await User.findOne({username:username})
    if (cartproducts!==null)
    {
        res.status(200).send(cartproducts.cart)
    }
    else
    {
        res.status(200).send({message:"ERROR IN GETTING PRODUCTS"})
    }
}

// ADD a product to cart
const addcartproduct = async (req,res)=>
{
    try
    {
        let productdata = req.body
        // console.log(productdata)
        let user = await User.findOne({username:productdata.username})
        let cartproduct = user.cart.find(product=>product._id.equals(productdata._id))
        if (cartproduct)
        {
            res.status(200).send({message:'ITEM ALREADY IN CART'})
        }
        else
        {
            let addedtocart = await User.findOneAndUpdate({username:productdata.username},
                {
                    $push:
                    {
                        "cart":productdata
                    }
                },
                {
                    returnOriginal: false
                })
            if (addedtocart)
            {
                res.status(200).send({message:"PRODUCT ADDED TO CART",payload:addedtocart})
            }
            else
            {
                res.status(200).send({message:"PRODUCT COULDN'T ADDED TO CART"})
            }
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// REMOVE CART PRODUCT
const removecartproduct = async (req,res)=>
{
    try
    {
        let productdata = req.body
        // console.log(productdata)
        let deletedproduct = await User.findOneAndUpdate({username:productdata.username},
            {
                $pull:
                {
                    cart:
                    {
                        productid:productdata.productid
                    }
                }
            },
            {
                returnOriginal: false
            }
        )
        // console.log(deletedproduct)
        if (deletedproduct)
        {
            res.status(200).send({message:"PRODUCT IS DELETED FROM CART",payload:deletedproduct})
        }
        else
        {
            res.status(200).send({message:"FAILED TO DELETE CART ITEM"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// EDIT QUANTITY
const editquantity = async (req,res)=>
{
    try
    {
        let request = req.body
        const updatedcart = await User.findOneAndUpdate(
            // Find the user and the nested cart item by their IDs
            { username: request.username, 'cart._id': request._id },
            // Update the quantity of the nested cart item
            { $set: { 'cart.$.quantity': request.quantity } }, 
            { new: true } // To return the updated document
        );
        if (updatedcart)
        {
            res.status(200).send({message:"Quantity updated",payload:updatedcart})
        }
        else
        {
            res.status(200).send({message:"Quantity couldn't be updated"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// CREATE ORDER
const order = async(req,res)=>
{
    try
    {
        let orderdetails = req.body
        // console.log(orderdetails)
        const ordered = await Order.create(orderdetails)
        // console.log(ordered)
        if (ordered)
        {
            let user = await User.findOneAndUpdate({username:req.body.username},
                {
                    $set:
                    {
                        cart:[]
                    }
                },
                {
                    new:false
                })
            if (user)
            {
                res.status(201).send({message:"ORDER PLACED",payload:ordered})
            }
            else
            {
                res.status(200).send({message:"UNABLE TO EMPTY CART"})
            }
        }
        else
        {
            res.status(200).send({message:"UNABLE TO PLACE ORDER"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}


// GET A USER ORDER
const getorders = async(req,res)=>
{
    try
    {
        let username = req.params.username
        let orders = await Order.find({username:username})
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

const cancelorder = async(req,res)=>
{
    try
    {
        let order = req.body
        let cancelled = await Order.findOneAndUpdate({_id:order._id},
            {
                $set:
                {
                    orderstatus:"CANCELLED"
                }
            },
            {
                new:false
            })
        if (cancelled)
        {
            res.status(200).send({message:"ORDER CANCELLED SUCCESSFULLY",payload:cancelled})
        }
        else
        {
            res.status(200).send({message:"UNABLE TO CANCEL ORDER"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}


// WISHLIST

// GET WISHLIST
const getwishlist = async (req,res)=>
{
    try
    {
        let username = req.params.username
        let user = await User.findOne({username:username})
        if (user)
        {
            res.status(200).send({message:"WISHLIST",payload:user.wishlist})
        }
        else
        {
            res.status(200).send({message:"UNABLE TO FETCH WISHLIST"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}

// ADD TO WISHLIST
const addtowishlist = async (req,res)=>
{
    try
    {
        let productdata = req.body
        let addedtowishlist = await User.findOneAndUpdate({username:productdata.username},
            {
                $push:
                {
                    "wishlist":productdata
                }
            },
            {
                returnOriginal:false
            })
        // console.log(addedtowishlist)
        if (addedtowishlist)
        {
            res.status(201).send({message:"PRODUCT ADDED TO WISHLIST",payload:addedtowishlist})
        }
        else
        {
            res.status(200).send({message:"FAILED TO ADD IN WISHLIST"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
} 

// REMOVE FROM WISHLIST
const removefromwishlist = async (req,res)=>
{
    try
    {
        let productdata = req.body
        let removed = await User.findOneAndUpdate({username:productdata.username},
            {
                $pull:
                {
                    wishlist:
                    {
                        productid:productdata.productid
                    }
                }
            },
            {
                returnOriginal:false
            })
        if (removed)
        {
            res.status(200).send({message:"PRODUCT REMOVED FROM WISHLIST",payload:removed})
        }
        else
        {
            res.status(200).send({message:"FAILED TO DELETE"})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
} 

const inwishlist = async(req,res)=>
{
    try
    {
        let productdata = req.body
        let user = await User.findOne({username:productdata.username})
        let wishlistproduct = user.wishlist.find(product=>product._id.equals(productdata._id))
        if (wishlistproduct)
        {
            res.status(200).send({message:'PRODUCT IN WISHLIST'})
        }
        else
        {
            res.status(200).send({message:'PRODUCT NOT IN WISHLIST'})
        }
    }
    catch(err)
    {
        res.status(200).send(err.message)
    }
}


module.exports={getuser,getusers,registerUser,userLogin,bookAppointment,appointments,editappointment,getallslots,getproducts,cart,addcartproduct,removecartproduct,editquantity,order,getorders,cancelorder,getwishlist,addtowishlist,removefromwishlist,inwishlist}
