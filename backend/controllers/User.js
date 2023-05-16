const User = require('../models/User')
const asyncHandler = require('../middleware/async')

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
// @route     GET /getMe
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

exports.updatePassword = asyncHandler(async (req,res,next)=>{
  const user = await User.findById(req.params.id).select('+password')

  if(!(user.comparePassword(req.body.currentPassword))){
    return next(new ErrorResponse('Password is incorrect', 401))
  }
})



