const express = require('express')
const router = express.Router()
const actionCtrl = require('../controllers/action')
const auth = require('../middleware/auth')

router.post('/', auth, actionCtrl.create)
router.get('/interaction', auth, actionCtrl.getAllActions)
router.get('/:id', auth, actionCtrl.getAllActionByPostId)
router.delete('/delete/:id', auth, actionCtrl.deleteOneAction)

module.exports = router
