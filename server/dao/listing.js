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

  getListingViaId = async (id) => {
    const {
      rows,
    } = await this.dbPool.query('SELECT * FROM rentr_listing WHERE id = $1;', [
      id,
    ]);

    return rows && rows.length >= 1 ? rows[0] : null;
  };

  updateListing = async (id, body) => {
    const { rows } = await this.dbPool.query(
      'UPDATE rentr_listing SET title = $1, price = $2, num_bedroom = $3, num_bathroom = $4, is_laundry_available = $5, is_pet_allowed = $6, is_parking_available = $7, images = $8, description = $9 WHERE id = $10;',
      // `UPDATE rentr_listing SET title = $1 WHERE id = $2;`,
      [
        body.title,
        body.price,
        body.num_bedroom,
        body.num_bathroom,
        body.is_laundry_available,
        body.is_pet_allowed,
        body.is_parking_available,
        body.images,
        body.description,
        id,
      ]
    );
    console.log(rows);
  };
}

module.exports = ListingDao;
