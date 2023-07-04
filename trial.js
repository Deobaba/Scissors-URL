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

// const jeje = nanoId("sdfgh")

// console.log(typeof(jeje))


// console.log(nanoId(12))
// // console.log(nanoId.verify('it4wVGtjvm'))

// console.log(nanoId.verify('O0XPrbPTXG13o'))
// console.log(nanoId.verify('is'))


// let x 
// if(!x){
//     console.log('na here')
// }else(console.log('ok'))


// let x = 2

// while(x<11){
//     x = x+2
//     console.log(x)
// }

// let y = x + 20
// console.log(y)

// const nanoid = require('nanoid')

// const deobaba = nanoid(23)
// console.log(deobaba)

// const smartTruncate = require('smart-truncate');
// let deo = 'xxn'

// let database = [ 'sdd', 'www', 'qqwysv', '22222v',"xxnxja" ]

// let length = 6

// let test = smartTruncate(deo,length, {mark:''})

//  database.push(test)
 
// const test1 = database.find(x => x == test)

// while(test1 !== undefined ){
//     length++
//     console.log('it got here')
// }

// // if (test1 === undefined ){
// //     console.log('it got here')
// //     length++
// // }
// // else if (test1 !== undefined){
// //     console.log('na here e reach')
// // }



// console.log(typeof(test1))

// console.log(test)

// let x = 0

// // do {x = x + 2;
// //     console.log(x)
// // } while ( x < 1)
// while(x<10){
//     x =x + 2
//     console.log(x)
// }


// const str = 'Hello world!';
// const shortHash = hashString(str);
// console.log(shortHash); 