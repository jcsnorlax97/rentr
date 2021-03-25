class ChainService {
  constructor({ chainDao }) {
    this.chainDao = chainDao;
  }

  createChain = (userId, listingId, body) =>
    this.chainDao.createChain(userId, listingId, body);
}

module.exports = ChainService;
