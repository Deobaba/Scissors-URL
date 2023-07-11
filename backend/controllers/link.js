const links = require('../models/link')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')
// const smartTruncate = require('smart-truncate');
const validUrl = require('valid-url')
const Qrcode = require('qrcode')
const config = require('config')
const shortid = require('shortid')






exports.getLinks = asyncHandler(async(req,res,next)=>{
    
    const link = await links.find({})

    const user = await User.find({})

    // res.status(200).json({
    //     success: true,
    //     data:link,
    //     length:link.length
    // })

    res.render('frontend/index',{link,user})
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
    
    const baseUrl = config.get('baseUrl')

    if (!validUrl.isUri(baseUrl)) {
        return next(new ErrorResponse('invalid base Url', 500))
      }
   

    if(!validUrl.isUri(req.body.link)){
        return next(new ErrorResponse('provide a valid url',401))
    }

   

    if(req.body.customName){

        req.body.linkCode = req.body.customName

        const newlink = await links.find({linkCode:req.body.linkCode})
        console.log('it got here',newlink,newlink.length)

        if(newlink.length > 0){
            return next(new ErrorResponse("Custom name exist already",401))
        }
    }

    
    // else{req.body.modifiedLink = nanoId(req.body.link)}
    else if (!req.body.customName){

        const urlCode = shortid.generate();
        req.body.linkCode = urlCode

    }
    
   
    req.body.modifiedLink = baseUrl + '/' + req.body.linkCode;

    const qrCode = await Qrcode.toDataURL(req.body.modifiedLink);
    console.log(req.body)

    if(!qrCode) { 
        return next(new ErrorResponse('Error generating qrCode', 500));
    }

    req.body.QRCODE = qrCode
    
    // const user = await User.findById(req.user.id)
    const link = await links.create(req.body)

    res.status(200).json({
        success:true,
        data:link
    })
})

exports.editLink = asyncHandler(async(req,res,next) => {

    const baseUrl = process.env.BASE_URL;

    //check for existing url
    const originalUrl = await links.findOne(req.params.id);
    if (!originalUrl) {
        return next(new ErrorResponse('Url does not exist', 400));
    }

    //check if user is the owner of the url
    if (originalUrl.user.toString() !== req.user.id.toString()) {
        return next(new ErrorResponse('You are not authorized to update this url', 401));
    }

    
    if(req.body.customName){

        req.body.linkCode = req.body.customName

        const newlink = await links.find({linkCode:req.body.linkCode})
        console.log('it got here',newlink,newlink.length)

        if(newlink){
            return next(new ErrorResponse("Custom name exist already",401))
        }
    }else{return next(new ErrorResponse("Custom name exist already",401))}

    req.body.modifiedLink = baseUrl + '/' + req.body.linkCode;

    const qrCode = await Qrcode.toDataURL(req.body.modifiedLink);
    console.log(req.body)

    if(!qrCode) { 
        return next(new ErrorResponse('Error generating qrCode', 500));
    }

    req.body.QRCODE = qrCode
        
    

    const fieldstoUpdate = {modifiedLink:req.body.modifiedLink,linkCode:req.body.linkCode,QRCODE:req.body.QRCODE}
    const link = await links.findByIdAndUpdate(req.params.id,fieldstoUpdate)
    if(!link) {return  next(new ErrorResponse("link does not exist",401)) }

    res.status(200).json({
        success:true,
        data:link
    })
})



exports.deleteLink = asyncHandler(async (req,res,next)=>{

    const link = await links.findById(req.params.id)
    if(!link) {return  next(new ErrorResponse("link does not exist",401)) }
    await links.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true
    })

}) 