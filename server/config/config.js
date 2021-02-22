const { env } = process;

const environment = env.DB_ENVIRONMNET || 'development';

/* Please do not put password or any sensitive info here */
const config = {
  development: {
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || 5432,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    max: 10,
    idleTimeoutMills: 10000,
    connectionTimeoutMills: 3000,
  },
  production: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

module.exports = config[environment];
