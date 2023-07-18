const express = require('express')
const{getLinks,getLink,createLink,editLink,deleteLink,OnclickUrl,createPage,editPage,deletePage} = require('../controllers/link')
const router = express.Router()
const{protectRoute} = require('../middleware/userauth')


router.get('/link',getLinks)
router.get('/createlink',createPage)
router.get('/editpage/:id',protectRoute,editPage)
router.get('/deletepage/:id',protectRoute,deletePage)
router.get('/link/:id',protectRoute,getLink)
router.post('/link',protectRoute,createLink) 
router.put('/link/:id',protectRoute,editLink)
router.delete('/link/:id',protectRoute,deleteLink)
router.get('/:Code',OnclickUrl)


module.exports = router