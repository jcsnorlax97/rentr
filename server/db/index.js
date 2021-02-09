const { Client } = require('pg');

const client = new Client();

module.exports = {
    connect: () => client.connect(),
    query: (text, params) => client.query(text, params),
    end: () => client.end()
};
