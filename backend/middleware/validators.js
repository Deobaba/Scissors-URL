const {UserSchema} = require('../utils/joi')
const ErrorResponse = require('../utils/errorResponse')

exports.validateUser = (req, res, next) => {
    const { error } = UserSchema.validate(req.body);
    
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ErrorResponse(msg, 400)
    } else {
        next();
    }
}