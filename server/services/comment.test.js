const CommentService = require('./comment');

test('should create new comment sucessfully', () => {
  // GIVEN
  const userId = 3;
  const listingId = 4;
  const chainId = 2;
  const body = {
    comment: 'Testing Comment 2',
  };
  const commentDao = {
    createComment: () => {
      const newCommentId = 11;
      return newCommentId;
    },
  };
  const commentService = new CommentService({ commentDao });

  // WHEN
  const commentId = commentService.createComment(
    userId,
    listingId,
    chainId,
    body
  );

  // THEN
  expect(commentId).toEqual(11);
});
