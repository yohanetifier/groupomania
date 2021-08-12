const express = require('express');
const router = express.Router(); 
const actionCtrl = require('../controllers/action')

router.post('/', actionCtrl.create)
router.get('/', actionCtrl.getAllAction)

module.exports = router