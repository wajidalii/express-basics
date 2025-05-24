const db = require('../config/db');
const accountRepo = require('../repositories/accountRepository');

exports.transfer = async (fromUserId, toUserId, amount) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        await accountRepo.changeBalance(connection, fromUserId, -amount);
        await accountRepo.changeBalance(connection, toUserId, amount);
        await connection.commit();
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

exports.getBalance = async (userId) => {
    const connection = await db.getConnection();
    try {
        const balance = await accountRepo.getBalance(connection, userId);
        return balance;
    } finally {
        connection.release();
    }
};