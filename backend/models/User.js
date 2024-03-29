const mongoose = require('mongoose');
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
});


// Encrypt password using bcrypt
UserSchema.pre('save', async function(next){
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)

})

UserSchema.methods.comparePassword = async function (passwordEntered){
  return bcrypt.compare(passwordEntered,this.password)
}

UserSchema.methods.getResetPasswordToken =  function () {
  // generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  // console.log(resetToken)
  return resetToken;
}
// generate token and return
UserSchema.methods.getJwtToken =  function(){
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET,  {
    expiresIn: process.env.JWT_EXPIRE
  });
}



module.exports = mongoose.model('User', UserSchema);