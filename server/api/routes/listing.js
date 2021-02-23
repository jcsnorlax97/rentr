const express = require('express');
const { container } = require('../../di-setup');
const validate = require('../../middleware/validate');
const listingDto = require('../../dto/listing');

// --- get classes via container ---
const listingController = container.resolve('listingController');

const router = express.Router();
router.get('/', listingController.getAllListings);
router.get('/:id', listingController.getListing);
router.post('/', validate(listingDto), listingController.addListing);

module.exports = router;
