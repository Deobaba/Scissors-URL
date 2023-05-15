const express = require('express')
const dotenv  = require('dotenv')
const errorHandler = require('./backend/middleware/error')
const connectDB = require('./config/db')
const user = require('./backend/routes/user')
dotenv.config({path:'./config/config.env'})

const app = express()

// connect database
connectDB()

// body parser
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('here')
})

app.use('/',user)

app.use(errorHandler);


// port
PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server connected to PORT - ${PORT}`)
})