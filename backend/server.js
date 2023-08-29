const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
const cloudinary = require("cloudinary")

//configure
dotenv.config({path:'backend/config/config.env'})

// connecting to database
connectDatabase()

// connect to cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})
