class ChainDao {
  constructor({ dbPool }) {
    this.dbPool = dbPool;
  }

  /**
   * Create new Chain would automatically create a new Comment.
   * Rollback should be done when errors occur in between two creations.
   *
   * @param {} userId
   * @param {*} listingId
   */
  createChain = async (userId, listingId, body) => {
    const client = await this.dbPool.connect();
    try {
      await client.query('BEGIN');

      // (1) create new chain
      const chainRes = await client.query(
        `
          INSERT INTO rentr_chain (userid, listingid) 
          VALUES ($1, $2) 
          RETURNING id;
        `,
        [userId, listingId]
      );
      const chainId = chainRes.rows[0].id;

      // (2) create new comment
      const commentRes = await client.query(
        `
          INSERT INTO rentr_comment (userid, listingid, chainid, comment)
          VALUES ($1, $2, $3, $4)
          RETURNING id;
        `,
        [userId, listingId, chainId, body.comment]
      );
      const commentId = commentRes.rows[0].id;

      // (3) complete both queries! commit & return!
      await client.query('COMMIT');
      return { chainId, commentId };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  };
}

module.exports = ChainDao;
