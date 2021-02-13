const express = require('express');
const validate = require('../../middleware/validate');
const userDto = require('../../dto/user');
const userController = require('../../controllers/user');

const router = express.Router();
router.post('/registration', validate(userDto), userController.createUser);

// router.get('/:id', (req, res) => {
//   console.log(req.params);
//   res.status(200).json({});
// });

module.exports = router;
