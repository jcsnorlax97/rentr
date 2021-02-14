const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool(config.db);

module.exports = pool;
