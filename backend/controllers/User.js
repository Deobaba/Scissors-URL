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
    // const isMatch = await user.matchPassword (password);
  
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    res.status(200).json({
        sucess:true,
        data:user

    })

})



