const { Pool } = require('pg');
const config = require('../config/config');
const pool = new Pool(config.db);

const query = async (query, params) => {
    const { rows, fields } = await pool.query(query, params);
    return rows;
};

module.exports = {
    query,
    connect: () => pool.connect(),
    release: () => pool.release()
};
