const express = require('express');
const router = express.Router();
const user = require('./routes/user');
const api = require('../services/api');

// --- Routes ---
router.use('/api/v1/user', user);

// --- API Homepage --- 
router.get('/api/v1', (req, res) => {
    res.status(200).json(api.getWelcomeMessage());
});

router.get('/api/v1/ping', async (req, res) => {
    try {
        const pong = await api.ping();
        res.status(200).json(pong);
    }
    catch (err) {
        res.status(500).json({ message: `${err}'` });
    }
});

module.exports = router;
