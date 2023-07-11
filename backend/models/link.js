const mongoose = require('mongoose') 


const linkSchema = new mongoose.Schema({
    link : {
        type: String,
        required : [true, 'add link']
    },
    modifiedLink :{
        type: String
    },

    linkCode :{
        type: String,
    },


    QRCODE:{
        type: String,
    },
    Analytics:{
        type: Number,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }

})


// linkSchema.pre('save',async function(next){
    

//     next()
// })


module.exports = mongoose.model('links', linkSchema)