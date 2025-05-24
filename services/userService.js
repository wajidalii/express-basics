const crypto = require('crypto');
const userRepository = require('../repositories/userRepository');

exports.getAllUsers = async (options) => {
    const { sort, order, filter } = options;
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const offset = (page - 1) * limit;

    let where = 'WHERE 1';
    const params = [];

    if (filter?.name) {
        where += ` AND name LIKE ?`;
        params.push(`%${filter.name}%`);
    }
    if (filter?.email) {
        where += ` AND email LIKE ?`;
        params.push(`%${filter.email}%`);
    }

    const total = await userRepository.count(where, params);
    if (total === 0) {
        return { data: [], meta: { total, page, limit, totalPages: 0 } };
    }

    const totalPages = Math.ceil(total / limit);
    if (page > totalPages) {
        throw new Error('Page number exceeds total pages');
    }

    const rows = await userRepository.findPaginated(
        where, params, sort, order, limit, offset
    );

    return {
        data: rows,
        meta: { total, page, limit, totalPages }
    };
};

exports.getUserById = (id) => userRepository.findById(id);

exports.getUserByEmail = (email) => userRepository.findByEmail(email);

exports.createUser = (data) => {
    const { name, email, password, role } = data;
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    return userRepository.create({
        name,
        email,
        password,
        role,
        verificationToken: token,
        verificationExpires: expires
    });
};

exports.updateUser = (id, data) => userRepository.update(id, data);

exports.deleteUser = (id) => userRepository.delete(id);
