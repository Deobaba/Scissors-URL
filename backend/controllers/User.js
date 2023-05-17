const User = require('../models/User')
const asyncHandler = require('../middleware/async')
const {sendEmail} = require('../utils/sendEmail')

// @desc      Register user
// @route     POST /register
// @access    Public

exports.register = asyncHandler(async(req,res,next)=>{
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password
      });

    res.status(200).json({
        success : true,
        data:user
    })

})

// @desc      Login users
// @route     POST /register
// @access    Public
exports.login = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    // Check if password matches
    const isMatch = await user.comparePassword(password);
  
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    res.status(200).json({
        sucess:true,
        data:user

    })

})

// @desc      Logged in user
// @route     GET /getMe
// @access    Private

exports.getMe = asyncHandler(async (req,res,next)=>{
  const user = await User.findById(req.params.id)

  res.status(200).json({
    sucess:true,
    data:user
  })

})

// @desc      update details
// @route     PUT /:ID
// @access    Private

exports.updateDetails = asyncHandler(async(req,res,next)=>{
  const fieldstoUpdate = {
   name: req.body.name,
   email: req.body.email
  }
const user = await User.findByIdAndUpdate(req.params.id,fieldstoUpdate,{
  runValidators:true,
  new:true
})

res.status(200).json({
  success: true,
  data: user
});

})

// @desc      update password
// @route     PUT
// @access    Private

exports.updatePassword = asyncHandler(async (req,res,next)=>{
  const user = await User.findById(req.params.id).select('+password')

  if(!(user.comparePassword(req.body.currentPassword))){
    return next(new ErrorResponse('Password is incorrect', 401))
  }

  user.password = req.body.newPassword

  await user.save()

  res.status(200).json({
    sucess:true,
    data:user
  })
})



// @desc      forgot password
// @route     POST /forgotPassword
// @access    Public


exports.forgotPassword = asyncHandler(async(req,res,next)=>{
  const {email} = req.body

  const user = await User.findOne({email})

   if(!user){
    return next(new ErrorResponse('There is no user with that email', 404));
   }

  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/resetpassword/${resetToken}`;

  const resetMessage = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on this link\n\n ${resetUrl}`;

  try{
    sendEmail({
      email:user.email,
      message:resetMessage
    })
  }catch(err){
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }

})


// @desc      Reset password
// @route     PUT /resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  
});





