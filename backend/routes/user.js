const express = require('express')
const {register,login, getMe,updateDetails}= require('../controllers/User')

const router = express.Router()
// const {validateUser} = require('../middleware/validators')

router.route('/register')
    .post(register)

router.route('/login')
    .post(login)
router.route('/:id')
    .get(getMe)
    .post(updateDetails)

module.exports = router;