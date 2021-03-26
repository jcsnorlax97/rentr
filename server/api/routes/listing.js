const express = require('express');
const { container } = require('../../di-setup');
const validate = require('../../middleware/validate');
const validateLoggedIn = require('../../middleware/validateLoggedIn');
const validateReqQueryString = require('../../middleware/validateReqQueryString');
const listingDto = require('../../dto/listing');
const listingReqQueryStringDto = require('../../dto/listingReqQueryString');
const commentDto = require('../../dto/comment');

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
router.get('/:id/comment', listingController.getListingCommentsViaListingId);
router.post(
  '/:id/chain',
  validateLoggedIn,
  validate(commentDto),
  listingController.createListingChainViaListingId
);
router.post(
  '/:id/chain/:chainid/comment',
  validateLoggedIn,
  validate(commentDto),
  listingController.createListingChainCommentViaListingIdAndChainId
);

module.exports = router;
