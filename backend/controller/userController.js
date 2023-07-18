const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncError')

const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')

// registera user
exports.registerUser = catchAsyncError( async(req,res,next)=>{
    const {name,email,password} = req.body

    const user = await User.create({
        name,
        email,
        password,
        avtar:{
            public_id:'this is a sample id',
            url:'profilepic'
        }
    })
    sendToken(user,201,res)
})

// login user
exports.loginUser = catchAsyncError (async (req,res,next) => {
    const {email,password} = req.body
    // checking if user exists
    if(!email || !password){
        return next(new ErrorHandler('please enter email & password', 400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler('invalid email or password',401))
    }
    const isPasswordMatched = user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler('invalid email or password',401))
    }
    sendToken(user,200,res)
})