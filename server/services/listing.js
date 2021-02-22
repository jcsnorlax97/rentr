class ListingService {
  constructor({ listingDao }) {
    this.listingDao = listingDao;
  }

  addListing = ({ title, description, numBedroom, numBathroom }) => {
    const listingId = this.listingDao.addListing(
      title,
      description,
      numBedroom,
      numBathroom
    );
    return listingId;
  };

  getAllListings = () => this.listingDao.getAllListings();

  getOneListing = (id) => this.listingDao.getOneListing(id);
}

module.exports = ListingService;
