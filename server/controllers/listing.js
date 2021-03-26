const ApiError = require('../error/api-error');

class ListingController {
  constructor({ listingService, chainService, commentService }) {
    this.listingService = listingService;
    this.chainService = chainService;
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

  createListingChainViaListingId = async (req, res, next) => {
    try {
      const user = req.userData;
      const { userId } = user;
      const listingId = req.params.id;

      const { chainId, commentId } = await this.chainService.createChain(
        userId,
        listingId,
        req.body
      );

      res.status(201).json({
        message: `Chain has been created successfully!`,
        chainId: `${chainId}`,
        commentId: `${commentId}`,
      });
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };

  createListingChainCommentViaListingIdAndChainId = async (req, res, next) => {
    try {
      const user = req.userData;
      const { userId } = user;
      const listingId = req.params.id;
      const chainId = req.params.chainid;

      const commentId = await this.commentService.createComment(
        userId,
        listingId,
        chainId,
        req.body
      );

      res.status(201).json({
        message: `Comment has been created successfully!`,
        commentId: `${commentId}`,
      });
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };

  getListingCommentsViaListingId = async (req, res, next) => {
    try {
      const listingId = req.params.id;
      const comments = await this.commentService.getCommentsViaListingId(
        listingId
      );
      res.status(200).json(comments);
    } catch (err) {
      next(ApiError.internal(`${err}`));
    }
  };
}

module.exports = ListingController;
