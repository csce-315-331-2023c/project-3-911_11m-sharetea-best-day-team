import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
    randomId,
  } from '@mui/x-data-grid-generator';
import Typography from '@mui/material/Typography';

/**
 * Renders a component that displays ingredients that are below the minimum required count.
 * @author Thomas Zheng
 * @returns {JSX.Element} The rendered Restock component.
 */
const Restock = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    /**
     * Fetches data from the backend API and updates the state with the fetched data.
     * @returns {Promise<void>} A promise that resolves when the data is fetched and the state is updated.
     */
    const fetchData = async () => {
      try {
        // Make API call
        const response = await fetch('https://backend-heli.onrender.com/query', {
          method: 'POST',
          body: JSON.stringify({ query: 'SELECT * FROM inventory WHERE count <= min' }), // Put your query in the body
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json(); // Retrieve response as JSON
        const newRows = data.map(row => { //Each row that is created needs an ID, ingredient, count, min, and isNew to false as they were already in the database
            return {
              id:randomId(),
              ingredient: row.ingredient,
              count: row.count,
              min: row.min,
            };
          });
        setIngredients(newRows); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []);

  
    const columns = [
    { field: 'ingredient', headerName: 'Ingredient', width: 600 },
    { field: 'count', headerName: 'Count', type: 'number', width: 400 },
    { field: 'min', headerName: 'Min', type: 'number', width: 300 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" component="p" gutterBottom>
          Restock:
        </Typography>
        <Typography variant="subtitle4" color="textSecondary" gutterBottom>
          Ingredients that are below the minimum required count
        </Typography>
      </div>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={ingredients}
        columns={columns}
        pageSize={5}
      />
    </Box>
    </Box>
  );
};

export default Restock;