const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/allowRoles');

router.get('/dashboard', protect, allowRoles('admin'), (req, res) => {
    res.send('Welcome to the admin dashboard!');
});

router.delete('/user/:id', protect, allowRoles('admin'), (req, res) => {
    const userId = req.params.id;
    // Logic to delete the user with the given ID
    res.send(`User with ID ${userId} deleted successfully!`);
});

module.exports = router;