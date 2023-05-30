const links = require('../models/link')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')
const nanoId = require('nano-id')


exports.getLinks = asyncHandler(async(req,res,next)=>{
    const link = await links.find({})

    res.status(200).json({
        success: true,
        data:link
    })
})

exports.getLink = asyncHandler(async(req,res,next)=>{

    const link = await links.findOne({_id:req.params.id})
    res.status(200).json({
        success:true,
        data:link
    })
})


exports.createLink = asyncHandler(async(req,res,next)=>{
   
    req.body.user = req.user.id
    if(req.body.desiredLink){

        req.body.modifiedLink = req.body.desiredLink

        const newlink = await links.find({modifiedLink:req.body.modifiedLink})
        console.log('it got here',newlink)

        if(newlink.length >= 1){
            return new ErrorResponse("this link exist already",401)
        }
    }
    else{req.body.modifiedLink = nanoId(req.body.link)}
    // else if (!req.body.desiredLink){
    //     req.body.modifiedLink = nanoId(req.body.link)
    //     const newlink = await links.find({modifiedLink:req.body.modifiedLink})

    //     while(newlink.length >= 1){
    //     req.body.modifiedLink = nanoId(req.body.link)
    //     const newlink = await links.find({modifiedLink:req.body.modifiedLink})
    //     }
    // }
    
    // const user = await User.findById(req.user.id)
    const link = await links.create(req.body)

    res.status(200).json({
        success:true,
        data:link
    })
})








