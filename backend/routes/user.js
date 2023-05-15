const express = require('express')
const {register,login}= require('../controllers/User')

const router = express.Router()
// const {validateUser} = require('../middleware/validators')

router.route('/register')
    .post(register)

router.route('/login')
    .post(login)


module.exports = router;