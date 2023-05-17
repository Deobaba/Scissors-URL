const express = require('express')
const {register,login, getMe,updateDetails,forgotPassword,resetPassword,updatePassword}= require('../controllers/User')

const router = express.Router()
// const {validateUser} = require('../middleware/validators')

router.route('/register')
    .post(register)

router.route('/login')
    .post(login)
router.route('/:id')
    .get(getMe)
    .put(updateDetails)

router.route('/forgot')
    .post(forgotPassword)
router.route('/reset/:id')
    .post(resetPassword)
router.route('/updatepassword/:id')
    .put(updatePassword)
module.exports = router;