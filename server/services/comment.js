class CommentService {
  constructor({ commentDao }) {
    this.commentDao = commentDao;
  }

  createComment = (userId, listingId, chainId, body) =>
    this.commentDao.createComment(userId, listingId, chainId, body);
}

module.exports = CommentService;
