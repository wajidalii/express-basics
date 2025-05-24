const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/balance/:userId', accountController.getBalance);
router.post('/transfer', accountController.transfer);

module.exports = router;