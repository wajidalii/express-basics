const db = require('../config/db');
const crypto = require('crypto');
exports.getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

exports.getUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

exports.findUserByEmail = async (email) => {
    const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
};

exports.createUser = async ({ name, email, password }) => {
    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
    const [result] = await db.query(
        `INSERT INTO users 
         (name,email,password,verificationToken,verificationExpires)
       VALUES (?,?,?,?,?)`,
        [name, email, password, token, expires]
    );
    return { id: result.insertId, name, email, verificationToken: token };
};

exports.updateUser = async (id, user) => {
    const { name, email } = user;
    const [result] = await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    return result.affectedRows;
};

exports.deleteUser = async (id) => {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows;
};

exports.verifyUser = async (token) => {
    const [rows] = await db.query(
        `SELECT * FROM users WHERE verificationToken = ? AND verificationExpires > NOW()`,
        [token]
    );
    if (!rows.length) return null;
    await db.query(
        `UPDATE users SET isVerified = 1, verificationToken = NULL, verificationExpires = NULL 
       WHERE id = ?`,
        [rows[0].id]
    );
    return rows[0];
};

exports.saveRefreshToken = async (userId, token, expires) => {
    await db.query(
        `UPDATE users SET refreshToken = ?, refreshTokenExpires = ? WHERE id = ?`,
        [token, expires, userId]
    );
};

