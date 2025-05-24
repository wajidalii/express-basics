const orderService = require('../services/orderService');

exports.getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await orderService.getOrderById(orderId);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getOrderItemsByOrderId = async (req, res) => {
    const orderId = req.params.id;
    try {
        const items = await orderService.getOrderItemsByOrderId(orderId);
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching order items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getOrdersByUserId = async (req, res) => {
    const userId = req.user.id;
    try {
        const orders = await orderService.getOrdersByUserId(userId);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.createOrder = async (req, res) => {
    const orderData = req.body;
    try {
        const orderId = await orderService.createOrder(orderData);
        res.status(201).json({ orderId });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const orderData = req.body;
    try {
        const affectedRows = await orderService.updateOrder(orderId, orderData);
        res.status(200).json({ affectedRows });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const affectedRows = await orderService.deleteOrder(orderId);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
