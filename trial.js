// // const ErrorResponse = require('../utils/errorResponse');

// const errorHandler = (err, req, res, next) => {
//   let error = { ...err };

//   error.message = err.message;

//   // Log to console for dev
//   console.log(err);

//   // Mongoose bad ObjectId
//   if (err.name === 'CastError') {
//     const message = `Resource not found`;
//     error = new ErrorResponse(message, 404);
//   }

//   // Mongoose duplicate key
//   if (err.code === 11000) {
//     const message = 'Duplicate field value entered';
//     error = new ErrorResponse(message, 400);
//   }

//   // Mongoose validation error
//   if (err.name === 'ValidationError') {
//     const message = Object.values(err.errors).map(val => val.message);
//     error = new ErrorResponse(message, 400);
//   }

//   res.status(error.statusCode || 500).json({
//     success: false,
//     error: error.message || 'Server Error'
//   });
// };

// module.exports = errorHandler;
// console.log(module.exports)


// const req = {body:{
//     name:'deobaba'
// }}
//  const {name} =req.body
// console.log(name)
// // console.log(req.protocol)

// const nanoId = require('nano-id')

// // console.log(nanoId(13))
// // console.log(nanoId.verify('it4wVGtjvm'))

// console.log(nanoId.verify('O0XPrbPTXG13o'))
// console.log(nanoId.verify('is'))


// let x 
// if(!x){
//     console.log('na here')
// }else(console.log('ok'))