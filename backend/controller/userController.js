const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncError')

const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto");


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

// user logout
exports.logout = catchAsyncError (async (req,res,next) => {
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:'Logged Out'
    })
})

// forgot password
exports.forgotPassward = catchAsyncError( async (req,res,next) =>{
    const user = await User.findOne({email:req.body.email})

    if(!user) {
        return next(new ErrorHandler('user not found', 404))
    }
    const resetToken = user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requseted this email ,then ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: `ecommerce password recovery`,
            message
        })
        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message, 500))
    }
})

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});