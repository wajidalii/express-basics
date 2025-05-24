const db = require('../config/db');

class UserRepository {
    async findAll(options) {
        const { sort, order, filter } = options;
        const page = parseInt(options.page) || 1;
        const limit = parseInt(options.limit) || 10;
        const offset = (page - 1) * limit;

        let where = 'WHERE 1';
        const params = [];
        if (filter.name) {
            where += ` AND name LIKE ?`;
            params.push(`%${filter.name}%`);
        }
        if (filter.email) {
            where += ` AND email LIKE ?`;
            params.push(`%${filter.email}%`);
        }

        const [[{ total }]] = await db.query(
            `SELECT COUNT(*) as total FROM users ${where}`,
            params
        );

        if (total === 0)
            return { total: 0, users: [] };

        if (page > Math.ceil(total / limit))
            throw new Error('Page number exceeds total pages');

        const query = `
            SELECT name, email, role FROM users ${where}
            ORDER BY ${sort} ${order.toUpperCase()}
            LIMIT ? OFFSET ?
        `;
        const [rows] = await db.query(
            query,
            [...params, limit, offset]
        );

        return {
            data: rows,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    async create(user) {
        const [result] = await db.query(
            `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [user.name, user.email, user.password, user.role]
        );
        return { id: result.insertId, ...user };
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