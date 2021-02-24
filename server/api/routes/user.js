const express = require('express');
const { container } = require('../../di-setup');
const validate = require('../../middleware/validate');
const userDto = require('../../dto/user');

// --- get classes via container ---
const userController = container.resolve('userController');

const router = express.Router();
router.get('/:id', userController.getUser);
router.post('/registration', validate(userDto), userController.createUser);
router.post('/login', validate(userDto), userController.authenticateUser);

module.exports = router;
