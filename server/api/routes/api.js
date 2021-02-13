const express = require('express');
const { container } = require('../../di-setup');

// --- get classes via container ---
const apiController = container.resolve('apiController');

const router = express.Router();
router.get('/', apiController.getWelcomeMessage); // API Welcome Message
router.get('/ping', apiController.ping); // Ping & Pong

module.exports = router;
