const express = require('express');
const router = express.Router();
const db = require('./sqlConnector');
const { authenticateToken } = require('./token');

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const username = req.user.username;
        const [rows] = await db.execute('SELECT username, email, created_at FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0];
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch profile info' });
    }
});

module.exports = router;