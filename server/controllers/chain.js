const ApiError = require('../error/api-error');

class ChainController {
  constructor({ chainService }) {
    this.chainService = chainService;
  }

  createChain = async (req, res, next) => {
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
}

module.exports = ChainController;
