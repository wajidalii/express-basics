class TokenRepository {
    async verifyUser(token) {
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
    }

    async saveRefreshToken(userId, token, expires) {
        await db.query(
            `UPDATE users SET refreshToken = ?, refreshTokenExpires = ? WHERE id = ?`,
            [token, expires, userId]
        );
    }

    async getUserByRefreshToken(token) {
        const [rows] = await db.query(
            `SELECT * FROM users WHERE refreshToken = ? AND refreshTokenExpires > NOW()`,
            [token]
        );
        return rows[0];
    }

    async clearRefreshToken(userId) {
        const result = await db.query(
            `UPDATE users SET refreshToken = NULL, refreshTokenExpires = NULL WHERE id = ?`,
            [userId]
        );
        return result.affectedRows;
    }
}

module.exports = new TokenRepository();
