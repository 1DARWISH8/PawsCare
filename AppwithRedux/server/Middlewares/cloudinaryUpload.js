// import cloudinary version 2
const cloudinary = require('cloudinary').v2;
// import multer - multer is used to 
const multer = require('multer')
// import .env to get environment variables and configure
require('dotenv').config()
// import fs (file system) module to update and edit file
const fs = require('fs');

// creating uploads folder if not already present
// in 'uploads' folder temporary upload
// image before uploading to cloudinary

if (!fs.existsSync("./uploads"))
{
    fs.mkdirSync("./uploads");
}

// configure cloudinary
cloudinary.config(
{
    cloudname:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

// configure multer
const localstorage = multer.diskStorage(
    {
        // define the destination directory where uploaded file is to be stored
        // null specifies "no error has occured"
        destination: function(req,file,cb)
        {
            cb(null,"./uploads");
        },
        // defines filename under which uploaded file will be stored
        filename: function(req,file,cb)
        {
            cb(null,file.originalname);
        }
    }
)

const upload = multer({storage : localstorage});
module.exports={upload,cloudinary};
