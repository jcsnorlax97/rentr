const express = require('express');

const router = express.Router();
const api = require('./routes/api');
const user = require('./routes/user');
const listing = require('./routes/listing');

// --- Routes ---
router.use('/api/v1', api);
router.use('/api/v1/user', user);
router.use('/api/v1/listing', listing);

module.exports = router;
