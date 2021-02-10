const env = process.env;

/* Please do not put password or any sensitive info here */
const config = {
    db: {
        host: env.process.DB_HOST || 'localhost',
        port: env.process.DB_PORT || 5432,
        user: env.process.DB_USER,
        password: env.process.DB_PASSWORD,
        database: env.process.DB_DATABASE,
        max: 10,
        idleTimeoutMills: 10000,
        connectionTimeoutMills: 3000
    }
};

module.exports = config;