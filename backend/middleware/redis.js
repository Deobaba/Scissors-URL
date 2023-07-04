const redis = require('redis')
const ErrorResponse = require('../utils/errorResponse')
const REDIS_PORT = process.env.REDIS_PORT
const client = redis.createClient(REDIS_PORT)


exports.cache = (req,res,next) => {
    const {id} = req.user

    client.get(id,(err,data)=>{
        if(err){
            return next(new ErrorResponse('error ', 400));
        }
    })
    if(data !== null){
        console.log('cache')
        res.status(200).json({
            sucess:true,
            user:data
          })
    }
    else{ next() }
}


