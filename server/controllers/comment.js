const ApiError = require('../error/api-error');

class CommentController {
  constructor({ commentService }) {
    this.commentService = commentService;
  }

  createComment = async (req, res, next) => {
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
}

module.exports = CommentController;
