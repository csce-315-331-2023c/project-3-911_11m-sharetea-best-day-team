import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import {
    randomId,
  } from '@mui/x-data-grid-generator';

const columns = [
  { field: 'ingredient', headerName: 'Ingredient', width: 200 },
  { field: 'count', headerName: 'Count', width: 150 },
];

const Excess = () => {
  const [toDate, setToDate] = useState('');
  const [rows, setRows] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const query = "WITH SoldIngredients AS (SELECT unnest(pl.ingredients) AS ingredient, COUNT(*) as total_sold FROM orders o JOIN pricelist pl ON o.drink_id = pl.itemid WHERE o.date >= '" + toDate + "' GROUP BY ingredient), ExcessIngredients AS (SELECT i.ingredient, i.count, COALESCE(si.total_sold, 0) AS total_sold FROM inventory i LEFT JOIN SoldIngredients si ON i.ingredient = si.ingredient) SELECT ingredient, count FROM ExcessIngredients WHERE total_sold < 0.1 * count ORDER BY ingredient;";
    // Make an API call to fetch excess inventory items
    console.log(query);
    const response = await fetch('https://backend-heli.onrender.com/query', {
      method: 'POST',
      body: JSON.stringify({query}), // You may need to format the date
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json(); 
    const newRows = data.map(row => { //Each row that is created needs an ID, ingredient, count, min, and isNew to false as they were already in the database
        return {
          id:randomId(),
          ingredient:row.ingredient,
          count:row.count,
        };
      });
    setRows(newRows);
  };

  const handleChange = (event) => {
    setToDate(event.target.value);
  };

  return (
    <div style={{width:'100%'}}>
      <Typography variant="h3" gutterBottom>
        Excess 
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="toDate"
          label="Date (YYYY-MM-DD)"
          variant="outlined"
          fullWidth
          value={toDate}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <Box sx={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Excess;
