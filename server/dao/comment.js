class CommentDao {
  constructor({ dbPool }) {
    this.dbPool = dbPool;
  }

  createComment = async (userId, listingId, chainId, body) => {
    const res = await this.dbPool.query(
      `
        INSERT INTO rentr_comment (userid, listingid, chainid, comment) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id;
      `,
      [userId, listingId, chainId, body.comment]
    );
    const { rows } = res;
    const commentId = rows[0].id;
    return commentId;
  };

  getCommentsViaListingId = async (listingId) => {
    const res = await this.dbPool.query(
      `
        SELECT * 
        FROM rentr_comment
        WHERE listingid = $1;
      `,
      [listingId]
    );
    const { rows } = res;
    return rows;
  };
}

module.exports = CommentDao;
