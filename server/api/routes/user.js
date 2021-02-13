const express = require('express');
const validate = require('../../middleware/validate');
const { container } = require('../../di-setup');
const userDto = require('../../dto/user');

// --- get classes via container ---
const userController = container.resolve('userController');

const router = express.Router();
router.post('/registration', validate(userDto), userController.createUser);

// router.get('/:id', (req, res) => {
//   console.log(req.params);
//   res.status(200).json({});
// });

module.exports = router;
