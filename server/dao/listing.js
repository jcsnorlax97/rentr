/* eslint-disable camelcase */
class ListingDao {
  constructor({ dbPool }) {
    this.dbPool = dbPool;
  }

  addListing = async (body) => {
    const {
      rows,
    } = await this.dbPool.query(
      'INSERT INTO rentr_listing (userid, title, price, num_bedroom, num_bathroom, is_laundry_available, is_pet_allowed, is_parking_available, images, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;',
      [
        body.userid,
        body.title,
        body.price,
        body.num_bedroom,
        body.num_bathroom,
        body.is_laundry_available,
        body.is_pet_allowed,
        body.is_parking_available,
        body.images,
        body.description,
      ]
    );

    const listingId = rows[0].id;
    return listingId;
  };

  getAllListings = async (query) => {
    const { rows } = await this.dbPool.query(
      `
        SELECT * FROM rentr_listing 
        WHERE 
          COALESCE($1 < rentr_listing.price, TRUE) AND 
          COALESCE($2 >= rentr_listing.price, TRUE) AND
          COALESCE($3 < rentr_listing.num_bedroom, TRUE) AND
          COALESCE($4 >= rentr_listing.num_bedroom, TRUE) AND
          COALESCE($5 < rentr_listing.num_bathroom, TRUE) AND
          COALESCE($6 >= rentr_listing.num_bathroom, TRUE)
        ;
      `,
      [
        query.min_price,
        query.max_price,
        query.min_num_bedroom,
        query.max_num_bedroom,
        query.min_num_bathroom,
        query.max_num_bathroom,
      ]
    );
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

  getListingViaUserId = async (userid) => {
    const {
      rows,
    } = await this.dbPool.query('SELECT * FROM rentr_listing WHERE userid = $1;', [
      userid,
    ]);

    return rows && rows.length >= 1 ? rows : null;
  };
  
  getListingViaUserAndListingId = async (userid, id) => {
    const {
      rows,
    } = await this.dbPool.query('SELECT * FROM rentr_listing WHERE (id = $1 and userid = $2);', [
      id, userid,
    ]);

    return rows && rows.length >= 1 ? rows[0] : null;
  };
}

module.exports = ListingDao;
