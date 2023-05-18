const express = require('express')
const {register,login, getMe,updateDetails,forgotPassword,resetPassword,updatePassword,logout}= require('../controllers/User')
const router = express.Router()
const{protectRoute} = require('../middleware/userauth')

// const {validateUser} = require('../middleware/validators')

router.post('/register',register)
router.post('/login',login)
router.get('/logout', logout);
router.get('/me',protectRoute,getMe)
router.post('/forgot',forgotPassword)
router.put('/reset/:resettoken',resetPassword)
router.put('/updatepassword/',protectRoute,updatePassword)
router.put('/updatedetails/',protectRoute,updateDetails)

module.exports = router;