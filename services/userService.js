const db = require('../config/db');

exports.getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
}

exports.getUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

exports.createUser = async (user) => {
    const { name, email } = user;
    const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return { id: result.insertId, ...user };
}

exports.updateUser = async (id, user) => {
    const { name, email } = user;
    await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
}

exports.deleteUser = async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return { id };
}