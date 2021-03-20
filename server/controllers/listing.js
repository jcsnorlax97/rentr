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
      const listings = await this.listingService.getAllListings(req.params);
      res.status(200).json(listings);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };

  getListingViaId = async (req, res, next) => {
    try {
      const listingId = req.params.id;
      const listing = await this.listingService.getListingViaId(req.params.id);
      if (listing == null) {
        next(ApiError.notFound(`Listing with id ${listingId} is not found.`));
        return;
      }
      res.status(200).json(listing);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };

  updateListing = async (req, res, next) => {
    try {
      console.log(req);
      await this.listingService.updateListing(req.params.id, req.body);

      res.status(200).json({
        message: `Listing has been updated successfully!`,
      });
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = ListingController;
