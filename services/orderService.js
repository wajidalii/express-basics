const db = require('../config/db');
const orderRepo = require('../repositories/orderRepository');

exports.getOrderById = async (orderId) => {
    const connection = await db.getConnection();
    try {
        const order = await orderRepo.findOrderById(connection, orderId);
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

exports.getOrderItemsByOrderId = async (orderId) => {
    const connection = await db.getConnection();
    try {
        const items = await orderRepo.findOrderItemsByOrderId(connection, orderId);
        if (!items || items.length === 0) {
            throw new Error('No items found for this order');
        }
        return items;
    } catch (error) {
        console.error('Error fetching order items:', error);
        throw error;
    } finally {
        connection.release();
    }
}

exports.getOrdersByUserId = async (userId) => {
    const connection = await db.getConnection();
    try {
        const orders = await orderRepo.findOrdersByUserId(connection, userId);
        if (!orders || orders.length === 0) {
            throw new Error('No orders found for this user');
        }
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
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

exports.deleteOrder = async (orderId) => {
    const connection = await db.getConnection();
    try {
        const result = await orderRepo.findOrderById(connection, orderId);
        if (!result) {
            return 0;
        }

        connection.beginTransaction();
        const affectedRows = await orderRepo.deleteOrder(connection, orderId);

        if (affectedRows === 0) {
            return 0;
        }

        const itemsAffectedRows = await orderRepo.deleteItemByOrderId(connection, orderId);

        if (itemsAffectedRows === 0) {
            return 0;
        }

        await connection.commit();
        return affectedRows;
    } catch (error) {
        await connection.rollback();
        console.error('Error deleting order:', error);
        throw error;
    } finally {
        connection.release();
    }
}