const express = require('express');
const { container } = require('../../di-setup');
const validate = require('../../middleware/validate');
const validateLoggedIn = require('../../middleware/validateLoggedIn');
const validateReqQueryString = require('../../middleware/validateReqQueryString');
const listingDto = require('../../dto/listing');
const listingReqQueryStringDto = require('../../dto/listingReqQueryString');

// --- get classes via container ---
const listingController = container.resolve('listingController');

const router = express.Router();
router.get(
  '/',
  validateReqQueryString(listingReqQueryStringDto),
  listingController.getAllListings
);
router.get('/:id', listingController.getListingViaId);
router.post(
  '/',
  validateLoggedIn,
  validate(listingDto),
  listingController.addListing
);

module.exports = router;
