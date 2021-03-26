const ChainService = require('./chain');

test('should create new chain sucessfully', () => {
  // GIVEN
  const userId = 3;
  const listingId = 4;
  const body = {
    comment: 'Testing123',
  };
  const chainDao = {
    createChain: () => ({
      chainId: 2,
      commentId: 10,
    }),
  };
  const chainService = new ChainService({ chainDao });

  // WHEN
  const { chainId, commentId } = chainService.createChain(
    userId,
    listingId,
    body
  );

  // THEN
  expect(chainId).toEqual(2);
  expect(commentId).toEqual(10);
});
