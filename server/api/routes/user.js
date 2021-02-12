const express = require('express');
const userController = require('../../controllers/user');

const router = express.Router();
router.post('/registration', userController.createUser);

// router.get('/:id', (req, res) => {
//   console.log(req.params);
//   res.status(200).json({});
// });

module.exports = router;
