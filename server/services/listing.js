/* eslint-disable camelcase */
class ListingService {
  constructor({ listingDao }) {
    this.listingDao = listingDao;
  }

  addListing = (body) => {
    const listingId = this.listingDao.addListing(body);
    return listingId;
  };

  getAllListings = () => this.listingDao.getAllListings();

  getListingViaId = (id) => this.listingDao.getListingViaId(id);

  updateListing = (id, lid, body) =>
    this.listingDao.updateListing(id, lid, body);

  getListingViaUserID = (userid) => this.listingDao.getListingViaUserId(userid);

  getListingViaUserAndListingID = (userid, id) =>
    this.listingDao.getListingViaUserAndListingId(userid, id);
}

module.exports = ListingService;
