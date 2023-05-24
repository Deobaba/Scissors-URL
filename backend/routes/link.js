const express = require('express')
const{getLinks,getLink,createLink} = require('../controllers/link')
const router = express.Router()
const{protectRoute} = require('../middleware/userauth')


router.get('/',getLinks)
router.get('/:id',getLink)
router.post('/',protectRoute,createLink) 

module.exports = router