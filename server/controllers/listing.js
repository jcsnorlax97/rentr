const ApiError = require('../error/api-error');

class ListingController {
  constructor({ listingService }) {
    this.listingService = listingService;
  }

  addListing = async (req, res, next) => {
    try {
      const listingId = await this.listingService.addListing(req.body);
      res.status(201).json({
        message: `Listing has been added successfully!`,
        listingId: `${listingId}`,
      });
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = ListingController;
