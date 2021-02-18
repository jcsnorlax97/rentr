class ListingDao {
  constructor({ dbPool }) {
    this.dbPool = dbPool;
  }

  addListing = async (title, description, numBedroom, numBathroom) => {
    const {
      rows,
    } = await this.dbPool.query(
      'INSERT INTO rentr_listing (title, description, num_bedroom, num_bathroom) VALUES ($1, $2, $3, $4) RETURNING id;',
      [title, description, numBedroom, numBathroom]
    );

    const listingId = rows[0].id;
    return listingId;
  };
}

module.exports = ListingDao;
