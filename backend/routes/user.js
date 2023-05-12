const express = require('express')
const {register}= require('../controllers/User')
const validateUser = require('../middleware/validators')
const router = express.Router()

router.route('/register')
    .post(validateUser,register)



module.exports = router;