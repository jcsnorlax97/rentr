const express = require('express');

const router = express.Router();
const api = require('./routes/api');
const user = require('./routes/user');

// --- Routes ---
router.use('/api/v1', api);
router.use('/api/v1/user', user);

module.exports = router;
