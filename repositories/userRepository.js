const db = require('../config/db');

class UserRepository {
    async count(where, params) {
        const [[{ total }]] = await db.query(
            `SELECT COUNT(*) as total FROM users ${where}`, params
        );
        return total;
    }

    async findPaginated(where, params, sort, order, limit, offset) {
        const [rows] = await db.query(
            `SELECT name, email, role FROM users ${where}
           ORDER BY ${sort} ${order.toUpperCase()}
           LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        return rows;
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    async findByEmail(email) {
        const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        return rows[0];
    }

    async create({ name, email, password, role, verificationToken, verificationExpires }) {

        const [result] = await db.query(
            `INSERT INTO users 
             (name,email,password,role,verificationToken,verificationExpires)
           VALUES (?,?,?,?,?)`,
            [name, email, password, role, verificationToken, verificationExpires]
        );
        return { id: result.insertId, name, email, role, verificationToken };
    }

    async update(id, user) {
        const [result] = await db.query(
            `UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?`,
            [user.name, user.email, user.password, user.role, id]
        );
        return result.affectedRows;
    }

    async delete(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = new UserRepository();