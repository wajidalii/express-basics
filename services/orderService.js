const db = require('../config/db');
const orderRepo = require('../repositories/orderRepository');

exports.getOrderById = async (orderId) => {
    const connection = await db.getConnection();
    try {
        const order = await orderRepo.findById(connection, orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    } finally {
        connection.release();
    }
}

exports.createOrder = async (orderData) => {
    const connection = await db.getConnection();
    try {
        connection.beginTransaction();
        const orderId = await orderRepo.createOrder(connection, orderData.userId);
        for (const item of orderData.items) {
            await orderRepo.createOrderItem(connection, orderId, item.productId, item.quantity);
        }
        await connection.commit();
        return orderId;
    } catch (error) {
        await connection.rollback();
        console.error('Error creating order:', error);
        throw error;

    }
};

exports.updateOrder = async (orderId, orderData) => {
    const connection = await db.getConnection();
    try {
        connection.beginTransaction();
        const affectedRows = await orderRepo.updateOrder(connection, orderId, orderData.userId);
        if (affectedRows === 0) {
            throw new Error('Order not found or no changes made');
        }
        for (const item of orderData.items) {
            const itemAffectedRows = await orderRepo.updateOrderItem(connection, item.id, item.quantity);
            if (itemAffectedRows === 0) {
                throw new Error('Order item not found or no changes made');
            }
        }
        await connection.commit();
        return affectedRows;
    } catch (error) {
        await connection.rollback();
        console.error('Error updating order:', error);
        throw error;
    } finally {
        connection.release();
    }
}