const express = require('express');
const { container } = require('../../di-setup');
const validate = require('../../middleware/validate');
const userDto = require('../../dto/user');

// --- get classes via container ---
const userController = container.resolve('userController');

const router = express.Router();
router.get('/:id', userController.getUserViaId);
router.post('/registration', validate(userDto), userController.createUser);
router.post('/login', validate(userDto), userController.authenticateUser);
router.get('/:id/listing', userController.getUserListingViaUserID);
router.get(
  '/:id/listing/:lid',
  userController.getUserListingViaUserAndListingID
);
router.put(
  '/:id/listing/:lid',
  userController.updateListingViaUserIDAndListingID
);

module.exports = router;
