const Joi = require('Joi');

exports.UserSchema = Joi.object({
    
    name:Joi.string()
   .alphanum()
   .min(3)
   .max(50)
   .required(), 
   email: Joi.string()
   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
   .required(),
   password: Joi.string().min(6).required()
        
   
});