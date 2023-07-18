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
        click: {
            type: Number,
            default: 0,
        },
        device: {
            type: [String],
            default: [],
        },
        location: {
            type: [String],
            default: [],
        },
        source: {
            type: [String],
            default: [],
        },

    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now,
    }

})


// linkSchema.pre('save',async function(next){
    

//     next()
// })


module.exports = mongoose.model('links', linkSchema)