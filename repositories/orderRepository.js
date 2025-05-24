class OrderRepository {
    async findOrderById(connection, id) {
        const [rows] = await connection.query('SELECT * FROM orders WHERE id = ?', [id]);
        return rows[0];
    }

    async findOrderItemsByOrderId(connection, orderId) {
        const [rows] = await connection.query(`
            SELECT * FROM order_items WHERE orderId = ?`, [orderId]);
        return rows;
    }

    async findOrdersByUserId(connection, userId) {
        const [rows] = await connection.query('SELECT * FROM orders WHERE userId = ?', [userId]);
        return rows;
    }

    async createOrder(connection, userId) {
        const [result] = await connection.query(`
            INSERT INTO orders (userId, createdAt)
            VALUES (?, NOW())`,
            [userId]);
        return result.insertId;
    }

    async createOrderItem(connection, orderId, productId, quantity) {
        const [result] = await connection.query(`
            INSERT INTO order_items (orderId, productId, quantity)
            VALUES (?, ?, ?)`,
            [orderId, productId, quantity]);
        return result.insertId;
    }

    async updateOrder(connection, orderId, userId) {
        const [result] = await connection.query(
            `UPDATE orders 
             SET userId = ?, updatedAt = NOW()
             WHERE id = ?`,
            [userId, orderId]
        );
        return result.affectedRows;
    }

    async updateOrderItem(connection, orderItemId, quantity) {
        const [result] = await connection.query(`
            UPDATE order_items 
            SET quantity = ?
            WHERE id = ?`,
            [quantity, orderItemId]);
        return result.affectedRows;
    }

    async deleteOrder(connection, id) {
        const [result] = await connection.query('DELETE FROM orders WHERE id = ?', [id]);
        return result.affectedRows;
    }

    async deleteItemByOrderId(connection, orderId) {
        const [result] = await connection.query('DELETE FROM order_items WHERE orderId = ?', [orderId]);
        return result.affectedRows;
    }
}

module.exports = new OrderRepository();
