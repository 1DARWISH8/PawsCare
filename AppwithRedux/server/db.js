// import mongoose
// const { type } = require('@testing-library/user-event/dist/type');
const { type } = require('@testing-library/user-event/dist/type');
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
        userpic:
        {
            type:String
        },
        registration_date:
        {
            type:Date,
            default: Date.now
        },
        petname:
        {
            type:String,
            required:[true,"PETNAME IS REQUIRED"]
        },
        dob:
        {
            type:Date,
            required:[true,"PETNAME IS REQUIRED"]
        },
        petanimal:
        {
            type:String,
            required:[true,"PETANIMAL IS REQUIRED"]
        },
        checkupdate:
        {
            type:Date
        },
        phonenumber:
        {
            type:Number,
            required:[true,"PHONE NUMBER IS REQUIRED"]
        },
        address:
        {
            type:String,
            required:[true,"ADDRESS IS REQUIRED"]
        },
        pincode:
        {
            type:Number,
            required:[true,"PINCODE IS REQUIRED"]
        },
        appointments:
        {
            type:Array,
            default:[]
        },
        cart:
        {
            type:Array,
            default:[]
        },
        orders:
        {
            type:Array,
            default:[]
        }
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
        service:
        {
            type:String,
            required:[true,"SERVICE TYPE IS REQUIRED"]
        },
        location:
        {
            type:String,
            required:[true,"SERVICE LOCATION IS REQUIRED"]
        },
        date:
        {
            type:Date,
            required:[true,"APPOINTMENT DATE IS REQUIRED"]
        },
        time:
        {
            type:String,
            required:[true,"APPOINTMENT TIME IS REQUIRED"]
        },
        bookingtime:
        {
            type:Date,
            default: Date.now
        },
        appointmentstatus:
        {
            type:String,
            default:"INCOMPLETE"
        }
    }
)

// CREATE PRODUCT SCHEMA
const productSchema = new mongoose.Schema(
    {

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
// model for productSchema
const Product = mongoose.model('Product',productSchema)

// Export Models(classes)
module.exports={User,Admin,Seller,Appointment,Product};
