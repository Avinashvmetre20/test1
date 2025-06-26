const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = 'amar';
const tokenBlacklist = new Set();

function checkBlacklist(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token && tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token blocklisted' });
    }

    next();
}

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'enter token' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });

    }
}

app.post('/login', (req, res) => {
    const user = { id: 1, username: 'testuser' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/protected', checkBlacklist, authenticate, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

app.post('/logout', checkBlacklist, authenticate, (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    tokenBlacklist.add(token);
    res.json({ message: 'Successfully logged out' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});