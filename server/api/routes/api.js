const express = require('express');

const router = express.Router();
const apiController = require('../../controllers/api');

// --- API Welcome Message ---
router.get('/', apiController.getWelcomeMessage);

// --- Ping ---
router.get('/ping', apiController.ping);

module.exports = router;
