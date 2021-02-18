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


  getAllListings = async (req, res, next) => {
    try {
      const listing = await this.listingService.getAllListings(req.params);
      if (listing == null) {
        next(ApiError.notFound(`No listing found!`));
        return;
      }
      res.status(200).json(listing);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = ListingController;
