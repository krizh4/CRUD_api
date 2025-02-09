require('dotenv').config()
const { Pool } = require('pg');

// postgre connection config
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT || 5432
})

// postgre connect
pool.connect()
    .then(()=>console.log('PostgreSQL database Connected!'))
    .catch((err)=>console.error('Connection Error!', err));

module.exports = pool;