const express = require('express')
const {register}= require('../controllers/User')

const router = express.Router()
const {validateUser} = require('../middleware/validators')

router.route('/register')
    .post(register)



module.exports = router;