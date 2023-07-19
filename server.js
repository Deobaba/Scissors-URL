const express = require('express')
const dotenv  = require('dotenv') 
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const errorHandler = require('./backend/middleware/error')
const connectDB = require('./config/db')
dotenv.config({path:'./config/config.env'})

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'))

const user = require('./backend/routes/user')
const link = require('./backend/routes/link')





// connect database
connectDB()

// body parser
app.use(express.json())

// cookie parser
app.use(cookieParser())

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use(express.static(path.join(__dirname,'public')))
app.use(methodOverride('_method'))

// app.get('/',(req,res,next)=>{
//     res.render('index')
// })

app.use('/',user)
app.use('/',link)

app.use(errorHandler);






// port
PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server connected to PORT - ${PORT}`)
})


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    // server.close(() => process.exit(1));
  });