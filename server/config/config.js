const { env } = process;

/* Please do not put password or any sensitive info here */
const config = {
  db: {
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || 5432,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    max: 10,
    idleTimeoutMills: 10000,
    connectionTimeoutMills: 3000,
  },
};

module.exports = config;
