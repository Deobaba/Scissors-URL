const Joi = require('Joi');

module.exports.UserSchema = Joi.object({
    User: Joi.object({
        name:Joi.string()
   .alphanum()
   .min(3)
   .max(50)
   .required(), 
   email: Joi.string()
   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
   .required(),
   password: Joi.string().min(6).required()
        
    }).required()
});