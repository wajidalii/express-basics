class AccountRepository {
    async changeBalance(connection, userId, amount) {
        await connection.query(
            'UPDATE accounts SET balance = balance + ? WHERE user_id = ?',
            [amount, userId]
        );
    }

    async getBalance(connection, userId) {
        const [rows] = await connection.query(
            'SELECT balance FROM accounts WHERE user_id = ?',
            [userId]
        );
        if (rows.length === 0) throw new Error('Account not found');
        return rows[0].balance;
    }
}

module.exports = new AccountRepository();
