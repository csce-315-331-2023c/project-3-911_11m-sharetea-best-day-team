var express = require('express');
const { Pool } = require('pg');
var router = express.Router();


// Create pool
const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    user: 'csce315_911_tommyztx',
    database: 'csce315331_11m_db',
    password: 'password',
    port: 5432,
});

router.get('/', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM inventory;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                teammembers.push(query_res.rows[i]);
            }
            const data = {teammembers: teammembers};
            console.log(teammembers);
            res.send(data);
        });
  });

module.exports = router;