// db.js
const { Client } = require('pg');

const client = new Client({
    user: 'postgres', // replace with your PostgreSQL username
    host: 'localhost',
    database: 'Book_collection', // replace with your database name
    password: '0270721828T', // replace with your PostgreSQL password
    port: 5432,
});

client.connect();

module.exports = client;
