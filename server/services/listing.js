/* eslint-disable camelcase */
class ListingService {
  constructor({ listingDao }) {
    this.listingDao = listingDao;
  }

  addListing = (body) => {
    const listingId = this.listingDao.addListing(body);
    return listingId;
  };

  getAllListings = (query) => this.listingDao.getAllListings(query);

  getListingViaId = (id) => this.listingDao.getListingViaId(id);

  updateListing = (uid, id, body) =>
    this.listingDao.updateListing(uid, id, body);

  deleteListing = (uid, id) => this.listingDao.deleteListing(uid, id);

  getListingViaUserID = (userid) => this.listingDao.getListingViaUserId(userid);

  getListingViaUserAndListingID = (userid, id) =>
    this.listingDao.getListingViaUserAndListingId(userid, id);
}

module.exports = ListingService;
