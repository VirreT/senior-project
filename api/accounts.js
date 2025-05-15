// api/accounts.js
// (see website/scripts/requirements/signupreq.js)
//import modules
const express = require('express');
const router = express.Router();
const db = require('./sqlConnector');
const argon2 = require('argon2');

// email validation function
function isValidEmail(email) {
    if (!email || !email.includes('@') || email.startsWith('@') || email.endsWith('@')) {
        return false;
    }
    if (email.indexOf('@') > email.lastIndexOf('.')) {
        return false;
    }
    if (!email.includes('.')) {
        return false;
    } else {
        return true;
    }
}

function isValidPassword(password) {
    const letters = /[a-zA-Z]/;
    const numbers = /[0-9]/;
    const specialChars = /[!@#$%&*]/;

    if (!password || password.length < 8 || password.length > 20) {
        return false;
    }
    if (!letters.test(password)) {
        return false;
    }
    if (!numbers.test(password)) {
        return false;
    }
    if (!specialChars.test(password)) {
        return false;
    } else {
        return true;
    }
}

// username validation function
function isValidUsername(username) {
    const allowedSpecialChars = ['_', '-', '.'];
    if (!username || username.length < 3 || username.length > 15) {
        return false;
    }
    if (!/[a-zA-Z]/.test(username)) {
        return false;
    }
    for (let char of username) {
        if (!/[a-zA-Z0-9]/.test(char) && !allowedSpecialChars.includes(char)) {
            return false;
        }
    }
    return true;
}

// REGISTER new user
router.post('/register', async (req, res) => {
    try {
        let { username, email, emailConfirm, password } = req.body;
        username = username.trim().toLowerCase();
        email = email.trim().toLowerCase();
        emailConfirm = emailConfirm.trim().toLowerCase();
        // Validate email
        if (email !== emailConfirm) {
            return res.status(400).json({ message: 'Emails do not match' });
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate password
        if (!isValidPassword(password)) {
            return res.status(400).json({ message: 'Password does not meet requirements' });
        }

        // Validate username
        if (!isValidUsername(username)) {
            return res.status(400).json({ message: 'Username does not meet requirements' });
        }

        const hashedPassword = await argon2.hash(password);

        const [result] = await db.execute(
            'INSERT INTO users (username, passwd, email) VALUES (?, ?, ?)',
            [username, hashedPassword, email]
        );

        console.log(`DB result: ${result}`);

        return res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Registration failed', error: err.message });
    }
});

// LOGIN user
router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        username = username.trim().toLowerCase();

        const [rows] = await db.execute(
            'SELECT passwd FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const validPassword = await argon2.verify(rows[0].passwd, password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        return res.status(200).json({ message: 'Login successful' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

module.exports = router;
