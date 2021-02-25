/* eslint-disable camelcase */
class ListingService {
  constructor({ listingDao }) {
    this.listingDao = listingDao;
  }

  addListing = ({
    title,
    price,
    num_bedroom,
    num_bathroom,
    is_laundry_available,
    is_pet_allowed,
    is_parking_available,
    images,
    description,
  }) => {
    const listingId = this.listingDao.addListing(
      title,
      price,
      num_bedroom,
      num_bathroom,
      is_laundry_available,
      is_pet_allowed,
      is_parking_available,
      images,
      description
    );
    return listingId;
  };

  getAllListings = () => this.listingDao.getAllListings();

  getListing = (id) => this.listingDao.getListing(id);
}

module.exports = ListingService;
