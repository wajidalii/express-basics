const accountService = require('../services/accountService');

exports.transfer = async (req, res, next) => {
    const { fromUserId, toUserId, amount } = req.body;
    try {
        await accountService.transfer(fromUserId, toUserId, amount);
        res.status(200).json({ message: 'Transfer successful' });
    } catch (err) {
        if (err.code === 'ER_INSUFFICIENT_FUNDS') {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        next(err);
    }
};
exports.getBalance = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const balance = await accountService.getBalance(userId);
        res.status(200).json({ balance });
    } catch (err) {
        next(err);
    }
};