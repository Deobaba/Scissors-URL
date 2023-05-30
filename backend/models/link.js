const mongoose = require('mongoose') 
const nanoId = require('nano-id')

const linkSchema = new mongoose.Schema({
    link : {
        type: String,
        required : [true, 'add link']
    },
    modifiedLink :{
        type: String
    },
    QRCODE:{

    },
    Analytics:{
        type: Number,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }

})


linkSchema.pre('save',async function(next){
    

    next()
})


module.exports = mongoose.model('links', linkSchema)