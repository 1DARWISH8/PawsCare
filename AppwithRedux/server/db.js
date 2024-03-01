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

// CREATE SCHEMAS

// Create User Schema
const userSchema = new mongoose.Schema(
    {

    }
)

// Create Admin Schema
const adminSchema = new mongoose.Schema(
    {

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
// model for productSchema
const Product = mongoose.model('Product',productSchema)

// Export Models(classes)
module.exports={User,Admin,Product};
