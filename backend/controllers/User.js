const User = require('../models/User')
const links = require('../models/link')
const asyncHandler = require('../middleware/async')
const {sendEmail} = require('../utils/sendEmail')
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
// const redis = require('redis')

// const REDIS_PORT = process.env.REDIS_PORT

// const client = redis.createClient(REDIS_PORT)


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
     

      // console.log('user',user)
    let token = user.getJwtToken()

    const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };



  
  res.cookie('token', token, options).redirect('/me')
  
})

// @desc      Login users
// @route     POST /login
// @access    Public
exports.login = asyncHandler(async(req,res,next)=>{
    // console.log('it got here')
    const {email,password} = req.body

    if(!email || !password){
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    // Check for user
    const user = await User.findOne({ email })
    console.log(user)
    
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    // Check if password matches
    const isMatch = await user.comparePassword(password);
  
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    let token = user.getJwtToken()
    // console.log(token)

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  // res.status(200).json({
  //   success:true,
  //   user
  // })

  
  res.cookie('token', token, options)
  res.redirect('/me')
  
})



// @desc      Log user out / clear cookie
// @route     GET /logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {

    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
  
    res.status(200).json({
      success: true,
      data: {}
    });
  });
  

// @desc      Logged in user
// @route     GET /getMe
// @access    Private

exports.getMe = asyncHandler(async (req,res,next)=>{
  const user = await User.findById(req.user.id)
  const link = await links.find({user:req.user.id})

// console.log(link)

  res.render('Newdashboard',{user,link})

  // res.render('newDASH',{user,link})

  // client.SETEX(req.user.id,30000,user)

})

// @desc      update details
// @route     PUT /:ID
// @access    Private

exports.updateDetails = asyncHandler(async(req,res,next)=>{
  const fieldstoUpdate = {
   name: req.body.name,
   email: req.body.email
  }
const user = await User.findByIdAndUpdate(req.user.id,fieldstoUpdate,{
  runValidators:true,
  new:true
})

res.redirect('/me')
// res.status(200).json({
//   success: true,
//   data: user
// });

})

// @desc      update password
// @route     PUT/updatePassword/:id
// @access    Private

exports.updatePassword = asyncHandler(async (req,res,next)=>{
  const user = await User.findById(req.user.id)
  // console.log(user)
  // console.log('it got here')

  if(!(user.comparePassword(req.body.currentpassword))){
    return next(new ErrorResponse('Password is incorrect', 401))

    
  }

  // console.log(req.body)
  if(!(req.body.newpassword)){
    return next(new ErrorResponse(' Enter your new Password', 401))
  }
  user.password = req.body.newpassword

  await user.save()

  let token = user.getJwtToken()
  // console.log(token)

const options = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  ),
  httpOnly: true
};

res.cookie('token', token, options)

res.redirect('/me')
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

    res.status(200).json({ success: true, data: 'Email sent' });

  }catch(err){
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }

  res.status(200).json({
    success: true,
    data: user
  });

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

  tokenResponse(user,200,res)
  
});



exports.loginPage =asyncHandler(async (req, res, next) => {
  res.render('signin')
})



exports.forgot =asyncHandler(async (req, res, next) => {
  res.render('forgotpassword')
})



exports.UpdatePage =asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
 console.log(user)
  res.render('UpdateDetails',{user})
})





exports.changePasswordPage =asyncHandler(async (req, res, next) => { 
  res.render('updatepassword')
})


exports.createPage =asyncHandler(async (req, res, next) => {
  res.render('create')
})





const tokenResponse = (user,res,page) =>{

    let token = user.getJwtToken()
    // console.log(token)

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  // res
  //   .status(statuscode)
  //   .cookie('token', token, options)
  //   .json({
  //     success: true,
  //     token
  //   });

  res.cookie('token', token, options).render(page)
}