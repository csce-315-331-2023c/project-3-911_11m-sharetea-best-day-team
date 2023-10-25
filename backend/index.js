const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
   user: 'YOUR_DB_USER',
   host: 'YOUR_DB_HOST',
   database: 'YOUR_DB_NAME',
   password: 'YOUR_DB_PASSWORD',
   port: YOUR_DB_PORT,
});

app.use(cors());
app.use(express.json());

// Add routes for your API here

app.listen(3001, () => {
   console.log('Server started on http://localhost:3001');
});

// Get all menu items
app.get('/menu-items', async (req, res) => {
    try {
       const results = await pool.query('SELECT * FROM pricelist');
       res.json(results.rows);
    } catch (err) {
       console.error(err.message);
    }
 });
 
 // Add a new menu item
 app.post('/menu-items', async (req, res) => {
    const { id, item, price } = req.body;
 
    try {
       const newItem = await pool.query(
          'INSERT INTO pricelist (itemid, itemname, itemprice) VALUES ($1, $2, $3) RETURNING *',
          [id, item, price]
       );
       res.json(newItem.rows[0]);
    } catch (err) {
       console.error(err.message);
    }
 });
 
 // Update a menu item
 app.put('/menu-items/:id', async (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
 
    try {
       const updatedItem = await pool.query(
          'UPDATE pricelist SET itemprice = $1 WHERE itemid = $2 RETURNING *',
          [price, id]
       );
       res.json(updatedItem.rows[0]);
    } catch (err) {
       console.error(err.message);
    }
 });
 
 // Delete a menu item
 app.delete('/menu-items/:id', async (req, res) => {
    const { id } = req.params;
 
    try {
       const deletedItem = await pool.query('DELETE FROM pricelist WHERE itemid = $1', [id]);
       res.json({ message: 'Menu item deleted successfully!' });
    } catch (err) {
       console.error(err.message);
    }
 });
 