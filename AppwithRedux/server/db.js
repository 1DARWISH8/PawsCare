// import mongoose
const mongoose = require('mongoose')
require('dotenv').config()

// connect to the local MongoDB database
const DB_URL = process.env.LOCAL_DB_URL;
// connect to the MongoDB Atlas
// const DB_URL = process.env.ATLAS_DB_URL;

// connect to the database using promise handlers
// mongoose.connect(DB_URL) //returns a promise
// .then(()=>console.log("Connected to DB")) //Promise handler
// .catch(err=>console.log(err))

// Connect to MongoDB using async/await
async function connecttoMongoDB()
{
    try
    {
        await mongoose.connect(DB_URL)
        console.log("Connected to DB");
    }
    catch(error)
    {
        console.error("Error connecting to MongoDB:",error);
    }
}

connecttoMongoDB()
// CREATE SCHEMAS

// Create User Schema
const userSchema = new mongoose.Schema(
    {
        accountstatus:
        {
            type:String,
            default:"ACTIVE"
        },
        userType:String,
        username:
        {
            type:String,
            required:[true,"USERNAME IS REQUIRED"]
        },
        password:
        {
            type:String,
            required:[true,"PASSWORD IS REQUIRED"]
        },
        email:
        {
            type:String,
            required:[true,"EMAIL IS REQUIRED"]
        },
        phonenumber:
        {
            type:Number,
            required:[true,"PHONE NUMBER IS REQUIRED"]
        },
        userpic:
        {
            type:String
        },
        registration_date:
        {
            type:Date,
            default: Date.now
        },
        petdetails:
        [{

            petname:
            {
                type:String,
                required:[true,"PETNAME IS REQUIRED"]
            },
            dob:
            {
                type:String,
                required:[true,"PETNAME IS REQUIRED"]
            },
            petanimal:
            {
                type:String,
                required:[true,"PETANIMAL IS REQUIRED"]
            },
            last_checkup_date:
            {
                type:String
            }
        }],
        address:
        [{
            addressline:
            {
                type:String,
                required:true,
            },
            district:
            {
                type:String,
                required:true,
            },
            state:
            {
                type:String,
                required:true,
            },
            country:
            {
                type:String,
                default:'INDIA'
            },
            pincode:
            {
                type:Number,
                required:true,
            }
        }],
        cart:
        [{
            productname:String,
            productid:String,
            username:String,
            quantity:
            {
                type:Number,
                default:1
            },
            price:Number,
            stock:
            {
                type:String,
                default:"In Stock",
                enum:['In Stock','Out of Stock']
            },
            image:
            {
                type:String,
            }
        }],
        wishlist:
        [
            {
                productname:String,
                productid:String,
                status:String,
                description:String,
                animal:String,
                category:String,
                brand:String,
                price:Number,
                stock:String,
                image:String,
            }
        ]
    }
)

// Create Admin Schema
const adminSchema = new mongoose.Schema(
    {
        userType:String,
        username:
        {
            type:String,
            required:[true,"USERNAME IS REQUIRED"]
        },
        password:
        {
            type:String,
            required:[true,"PASSWORD IS REQUIRED"]
        },
        email:
        {
            type:String,
            required:[true,"EMAIL IS REQUIRED"]
        },
        userpic:
        {
            type:String
        },
        registration_date:
        {
            type:Date,
            default: Date.now
        }
    }
)

// Create Seller Schema
const sellerSchema = new mongoose.Schema(
    {
        userType:String,
        username:
        {
            type:String,
            required:[true,"USERNAME IS REQUIRED"]
        },
        password:
        {
            type:String,
            required:[true,"PASSWORD IS REQUIRED"]
        },
        email:
        {
            type:String,
            required:[true,"EMAIL IS REQUIRED"]
        },
        userpic:
        {
            type:String
        },
        registration_date:
        {
            type:Date,
            default: Date.now
        },
        company:
        {
            type:String,
            required:[true,"COMPANY IS REQUIRED"]
        }
    }
)

// CREATE APPOINTMENT SCHEMA
const appointmentSchema = new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:[true,"USERNAME IS REQUIRED"]
        },
        petname:
        {
            type:String,
            required:[true,"PETNAME IS REQUIRED"]
        },
        appointment_service:
        {
            type:String,
            required:[true,"SERVICE TYPE IS REQUIRED"]
        },
        appointment_location:
        {
            type:String,
            required:[true,"SERVICE LOCATION IS REQUIRED"]
        },
        appointment_date:
        {
            type:Date,
            required:[true,"APPOINTMENT DATE IS REQUIRED"]
        },
        appointment_time_slot:
        {
            type:String,
            required:[true,"APPOINTMENT TIME IS REQUIRED"]
        },
        appointment_booked_on:
        {
            type:Date,
            default: Date.now
        },
        appointment_status:
        {
            type:String,
            default:"PENDING",
            enum:['PENDING',"COMPLETE"]
        }
    }
)

// DAY APPOINTMENT SCHEMA TO KEEP TRACK OF APPOINTMENTS
const appointmentDaySchema = new mongoose.Schema(
    {
        appointment_date:
        {
            type:String,
            required:true
        },
        appointment_service:
        {
            type:String,
            required:true,
            enum:['HEALTH CHECK UP','GROOMING','TRAINING']
        },
        appointment_location:
        {
            type:String
        },
        slots:
        [
            {
                appointment_time:
                {
                    type:String,
                    required:true
                },
                appointment_status:
                {
                    type:String,
                    enum:['available','booked'],
                    default:'available'
                }
            }
        ]
    }
)

// CREATE PRODUCT SCHEMA
const productSchema = new mongoose.Schema(
    {
        productname:
        {
            type:String,
            required:[true,"PRODUCTNAME IS REQUIRED"]
        },
        productid:
        {
            type:String,
            required:[true,"ID IS REQUIRED"]
        },
        status:
        {
            type:String,
            default:"ACTIVE",
            enum:['ACTIVE','INACTIVE']
        },
        description:
        {
            type:String,
            required:[true,"DESCRIPTION IS REQUIRED"]
        },
        animal:
        {
            type:String,
            required:[true,"ANIMAL IS REQUIRED"]
        },
        category:
        {
            type:String,
            required:[true,"CATEGORY IS REQUIRED"]
        },
        brand:
        {
            type:String,
            required:[true,"BRAND IS REQUIRED"]
        },
        price:
        {
            type:Number,
            required:[true,"PRICE IS REQUIRED"]
        },
        stock:
        {
            type:String,
            default:"In Stock",
            enum:['In Stock','Out of Stock']
        },
        image:
        {
            type:String,
        }
        // ,
        // reviews: [{
        //     user: {
        //         type: String,
        //         required: true
        //     },
        //     rating: {
        //         type: Number,
        //         min: 0,
        //         max: 5,
        //         required: true
        //         },
        //     comment: String
        // }]
    }
)

// CREATE ORDERS SCHEMA
const orderSchema = new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:true
        },
        // orderid:
        // {
        //     type:String
        // },
        orderdate:
        {
            type:Date,
            default: Date.now
        },
        orderstatus:
        {
            type:String,
            enum:['PENDING','CANCELLED','ACCEPTED',"IN TRANSIT","OUT FOR DELIVERY","DELIVERED"],
            default:'PENDING'
        },
        totalprice:
        {
            type:Number,
            required:true
        },
        paymentstatus:
        {
            type:String,
            enum:['PENDING','COMPLETED'],
            default:"PENDING"
        },
        paymentmethod:
        {
            type:String,
            enum:['UPI PAYMENT',"NETBANKING","CASH ON DELIVERY(COD)"],
            default:'CASH ON DELIVERY(COD)'
        },
        orderitems:
        [
            {
                productname:String,
                productid:String,
                username:String,
                quantity:
                {
                    type:Number,
                    default:1
                },
                price:Number,
                stock:
                {
                    type:String,
                    default:"In Stock",
                    enum:['In Stock','Out of Stock']
                },
                image:
                {
                    type:String,
                }
            }
        ],
        address:
        [{
            addressline:
            {
                type:String,
                required:true,
            },
            district:
            {
                type:String,
                required:true,
            },
            state:
            {
                type:String,
                required:true,
            },
            country:
            {
                type:String,
                default:'INDIA'
            },
            pincode:
            {
                type:Number,
                required:true,
            }
        }],
        phonenumber:
        {
            type:Number,
            required:true
        }
    }
)

// Create Model(Class) for Schemas
// model for userSchema
const User = mongoose.model('User',userSchema)
// model for adminSchema
const Admin = mongoose.model('Admin',adminSchema)
// model for sellerSchema
const Seller = mongoose.model('Seller',sellerSchema)
// model for appointmentSchema
const Appointment = mongoose.model('Appointment',appointmentSchema)
// model fro appointmentDaySchema
const Appointmentday = mongoose.model('Appointmentday',appointmentDaySchema)
// model for productSchema
const Product = mongoose.model('Product',productSchema)
// model for orderSchema
const Order = mongoose.model('Order',orderSchema)


// Export Models(classes)
module.exports={User,Admin,Seller,Appointment,Appointmentday,Product,Order};
