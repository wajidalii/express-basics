const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/:id', orderController.getOrderById);
router.get('/:id/items', orderController.getOrderItemsByOrderId);
router.get('/user/:id', orderController.getOrdersByUserId);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;