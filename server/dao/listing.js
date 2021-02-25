/* eslint-disable camelcase */
class ListingDao {
  constructor({ dbPool }) {
    this.dbPool = dbPool;
  }

  addListing = async (
    title,
    price,
    num_bedroom,
    num_bathroom,
    is_laundry_available,
    is_pet_allowed,
    is_parking_available,
    images,
    description
  ) => {
    const {
      rows,
    } = await this.dbPool.query(
      'INSERT INTO rentr_listing (title, price, num_bedroom, num_bathroom, is_laundry_available, is_pet_allowed, is_parking_available, images, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;',
      [
        title,
        price,
        num_bedroom,
        num_bathroom,
        is_laundry_available,
        is_pet_allowed,
        is_parking_available,
        images,
        description,
      ]
    );

    const listingId = rows[0].id;
    return listingId;
  };

  getAllListings = async () => {
    const { rows } = await this.dbPool.query('SELECT * FROM rentr_listing;');
    return rows;
  };

  getListing = async (id) => {
    const {
      rows,
    } = await this.dbPool.query('SELECT * FROM rentr_listing WHERE id = $1;', [
      id,
    ]);

    return rows && rows.length >= 1 ? rows[0] : null;
  };
}

module.exports = ListingDao;
