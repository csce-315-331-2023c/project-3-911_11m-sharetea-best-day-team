const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create express app
const app = express();
const port = 3000;

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});
                
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    const data = {name: 'Mario'};
    res.render('index', data);
});
                
app.get('/user', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM teammembers;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                teammembers.push(query_res.rows[i]);
            }
            const data = {teammembers: teammembers};
            console.log(teammembers);
            res.render('user', data);
        });
});

app.get('/drinks', (req, res) => {
    pool
        .query('SELECT itemid, itemname, itemprice, images FROM pricelist;')
        .then(query_res => {
            res.json(query_res.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving drinks.');
        });
});

app.get('/kiosk', (req, res) => {
    drinks = [];

    pool.query('SELECT itemid, itemname, itemprice, images FROM pricelist ORDER BY itemid ASC;')
    .then(drinkQueryRes => {
      for (let i = 0; i < drinkQueryRes.rowCount; i++) {
        drinks.push(drinkQueryRes.rows[i]);
      }

      // Send the drinks data as JSON
      res.json(drinks);
    })
    .catch(error => {
      console.error('Error fetching drinks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

