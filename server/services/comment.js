class CommentService {
  constructor({ commentDao }) {
    this.commentDao = commentDao;
  }

  createComment = (userId, listingId, chainId, body) =>
    this.commentDao.createComment(userId, listingId, chainId, body);

  getCommentsViaListingId = (listingId) =>
    this.commentDao.getCommentsViaListingId(listingId);
}

module.exports = CommentService;
