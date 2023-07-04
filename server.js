const express = require('express')
const dotenv  = require('dotenv') 
const path = require('path');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const errorHandler = require('./backend/middleware/error')
const connectDB = require('./config/db')
dotenv.config({path:'./config/config.env'})

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const user = require('./backend/routes/user')
const link = require('./backend/routes/link')





// connect database
connectDB()

// body parser
app.use(express.json())

// cookie parser
app.use(cookieParser())

app.use(express.static(path.join(__dirname,'public')))

app.use('/',user)
app.use('/link',link)

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