const express = require('express');
const router = express.Router();
const api = require('../../services/api');

// --- API Welcome Message --- 
router.get('/', (req, res) => {
    res.status(200).json(api.getWelcomeMessage());
});

// --- Ping --- 
router.get('/ping', async (req, res) => {
    try {
        const pong = await api.ping();
        res.status(200).json(pong);
    }
    catch (err) {
        res.status(500).json({ message: `${err}'` });
    }
});

module.exports = router;