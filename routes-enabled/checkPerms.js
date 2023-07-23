#!/usr/bin/env node
// routes/checkPerms.js
//const express = require('express');
//const router = express.Router();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const blacklistedIPs = ['127.0.0.1', '192.168.1.2'];
const blacklistedHostnames = ['malicious.com', 'spam.net'];

router.get('/CheckPerms', (req, res) => {
    const requesterIP = req.ip;
    const hostname = req.hostname;

    if (blacklistedIPs.includes(requesterIP)) {
        return res.status(403).send('Your IP is blacklisted.');
    }

    if (blacklistedHostnames.includes(hostname)) {
        return res.status(403).send('Your hostname is blacklisted.');
    }

    const authToken = req.cookies['auth'];
    if (!authToken) {
        return res.status(401).send('Missing auth cookie.');
    }

    jwt.verify(authToken, 'YOUR_SECRET_KEY', (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token.');
        }
        res.send('All checks passed. Welcome!');
    });
});

module.exports = router;


// Route handling logic here...






module.exports = router;
