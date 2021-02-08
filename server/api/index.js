const express = require('express')
const router = express.Router();
const user = require('./routes/user')

// --- Routes ---
router.use('/api/v1/user', user);

// --- API Homepage --- 
router.get('/api/v1', (req, res) => {
    res.status(200).json({ message: 'Welcome to Rentr API!' });
});

module.exports = router;
