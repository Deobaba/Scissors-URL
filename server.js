const express = require('express')
const dotenv  = require('dotenv')
const cookieParser = require('cookie-parser')
const errorHandler = require('./backend/middleware/error')
const connectDB = require('./config/db')
dotenv.config({path:'./config/config.env'})


const user = require('./backend/routes/user')
const link = require('./backend/routes/link')

const app = express()

// connect database
connectDB()

// body parser
app.use(express.json())

// cookie parser
app.use(cookieParser())


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