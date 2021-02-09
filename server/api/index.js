const express = require('express')
const router = express.Router();
const user = require('./routes/user')
const db = require('../db');

// --- Routes ---
router.use('/api/v1/user', user);

// --- API Homepage --- 
router.get('/api/v1', (req, res) => {
    res.status(200).json({ message: 'Welcome to Rentr API!' });
});

router.get('/api/v1/ping', async (req, res) => {
    try {
        await db.connect();
        console.log("[*][DB] Client has connected successfully.");
        const results = await db.query("SELECT NOW()");
        const now = results.rows[0].now;
        res.status(200).json({
            message: `Pong! Postgre DB is working!`,
            now: `${now}`
        });
    }
    catch (err) {
        res.status(500).json({ message: `${err}'` });
    }
    finally {
        await db.end();
        console.log("[*][DB] Client has disconnected successfully.");
    }
});

module.exports = router;
