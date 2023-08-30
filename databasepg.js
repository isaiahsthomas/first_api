const express = require('express')
const { Pool, Client } = require('pg')
const PORT = 5000
const path = require('path')
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'dev.env')
});
const app = express()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,

});

(async () => {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT current_user');
        const currentuser = rows[0]['current_user']
        console.log(currentuser);
    } catch (err) {
        console.log(err)
    } finally {
        client.release();
    }
})();
