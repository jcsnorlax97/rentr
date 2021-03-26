const ApiError = require('../error/api-error');

class ListingController {
  constructor({ listingService, commentService }) {
    this.listingService = listingService;
    this.commentService = commentService;
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
      const listings = await this.listingService.getAllListings(req.query);
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

  getListingCommentsViaListingId = async (req, res, next) => {
    try {
      const listinId = req.params.id;
      const comments = await this.commentService.getCommentsViaListingId(
        listinId
      );
      res.status(200).json(comments);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = ListingController;
