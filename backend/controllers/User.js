const User = require('../models/User')
const asyncHandler = require('../middleware/async')

// @desc      Register user
// @route     POST /api/v1/auth/register
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

