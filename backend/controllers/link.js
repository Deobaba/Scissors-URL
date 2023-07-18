const links = require('../models/link')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')
// const smartTruncate = require('smart-truncate');
const validUrl = require('valid-url')
const Qrcode = require('qrcode')
const config = require('config')
const shortid = require('shortid')
const {Clicks} = require('../utils/click')






exports.getLinks = asyncHandler(async(req,res,next)=>{
    
    const link = await links.find({})

    const user = await User.find({})

    // console.log(link[0].id)

    // res.status(200).json({
    //     success: true,
    //     data:link,
    //     length:link.length
    // })

    res.render('frontend/index',{link,user})
})

exports.getLink = asyncHandler(async(req,res,next)=>{

    const link = await links.findOne({_id:req.params.id})

    if(link.length > 0){
        return next(new ErrorResponse("url does not exist",401))
    }

    if (link.user.toString() !== req.user.id.toString()) {
        return next(new ErrorResponse('this link does not belong to you, move on', 401));
    }
    // res.status(200).json({
    //     success:true,
    //     data:link
    // })

 
let sourcelist = link.Analytics.source
let sourceCounts = {};

for (let i = 0; i < sourcelist.length; i++) {
  let entry = sourcelist[i];
  sourceCounts[entry] = sourceCounts[entry] ? sourceCounts[entry] + 1 : 1;
 }

 let source = {
    whatsapp:sourceCounts.whatsapp,
    instagram:sourceCounts.instagram,
    twitter:sourceCounts.twitter,
    facebook:sourceCounts.facebook,
    others:sourceCounts.others
}

for (let key in source) {
    if (source[key] === undefined) {
      source[key] = 0;
    }
  }

let devicelist = link.Analytics.device
let deviceCounts = {};

for (let i = 0; i < devicelist.length; i++) {
    let entry = devicelist[i];
    deviceCounts[entry] = deviceCounts[entry] ? deviceCounts[entry] + 1 : 1;
}

let device = {
    Andriod : deviceCounts.Andriod,
    Windows : deviceCounts.Windows,
    Linux : deviceCounts.Linux,
    IOS: deviceCounts.IOS,
    Mac: deviceCounts.Mac,
    Others: deviceCounts.Others
}

for (let key in device) {
    if (device[key] === undefined) {
      device[key] = 0;
    }
  }

let locationList= link.Analytics.location

    res.render('frontend/details',{link,source,device,locationList})

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

    // res.status(200).json({
    //     success:true,
    //     data:link
    // })

    res.redirect('/me')
})

exports.editLink = asyncHandler(async(req,res,next) => {

// console.log('the problem is here ')

    const baseUrl = config.get('baseUrl')

   
    const originalUrl = await links.findById(req.params.id);
    if (!originalUrl) {
        return next(new ErrorResponse('Url does not exist', 400));
    }

    
    if (originalUrl.user.toString() !== req.user.id.toString()) {
        return next(new ErrorResponse('You are not authorized to update this url', 401));
    }

    
    if(req.body.customName){

        req.body.linkCode = req.body.customName

        const newlink = await links.find({linkCode:req.body.linkCode})
        
        if(newlink.length > 0){
            return next(new ErrorResponse("Custom name exist already",401))
        }
    }
    else{return next(new ErrorResponse("Custom name is required",401))}

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

    // console.log('wizzzyy')

    // res.status(200).json({
    //     success:true,
    //     data:link
    // })

    res.redirect(`/link/${req.params.id}`)

})



exports.deleteLink = asyncHandler(async (req,res,next)=>{

    const { id } = req.params;

    const link = await links.findById(id);
    if (!link) {
        return next(new ErrorResponse('Url does not exist', 400));
    }

    if (!req.user) { 
        return next(new ErrorResponse('you\'re not logged in', 401));
    }
    //check if user is the owner of the url
    if (link.user.toString() !== req.user.id.toString()) {
        return next(new ErrorResponse('You are not authorized to delete this url', 401));
    }

    //delete url
    await links.findByIdAndDelete(id);


    // res.status(200).json({
    //     success: true,
    //     message: 'Url deleted successfully',
    // });

    res.redirect('/me')
}) 


 exports.OnclickUrl = asyncHandler(async (req, res, next) => { 
    const { Code } = req.params;
    const link = await links.findOne({linkCode : Code });
    if (!link) {
        return next(new ErrorResponse('Url not found', 404));
    }
    const clicks = await Clicks(req, Code);
    console.log('it got here')
    res.redirect(link.link);
});


exports.createPage =asyncHandler(async (req, res, next) => {
    res.render('frontend/createLink')
})



exports.editPage =asyncHandler(async (req, res, next) => {

    const link = await links.findOne({_id:req.params.id})

    console.log('it got hereeeeee',link.id)

    if(link.length > 0){
        return next(new ErrorResponse("url does not exist",401))
    }

    if (link.user.toString() !== req.user.id.toString()) {
        return next(new ErrorResponse('this link does not belong to you, move on', 401));
    }
    
    res.render('frontend/editlink',{link})
})


exports.deletePage =asyncHandler(async (req, res, next) => {

    const link = await links.findOne({_id:req.params.id})

    console.log('it got hereeeeee',link.id)

    if(link.length > 0){
        return next(new ErrorResponse("url does not exist",401))
    }

    if (link.user.toString() !== req.user.id.toString()) {
        return next(new ErrorResponse('this link does not belong to you, move on', 401));
    }
    
    res.render('frontend/deletelink',{link})
})