import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Box } from '@mui/material';

const fetchDataFromQuery = async (query) => {
  try {
    const response = await fetch('https://backend-heli.onrender.com/query', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

const DatabaseTable = ({ query }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchDataFromQuery(query);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [query]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!data || data.length === 0) {
    return <Typography>No data available.</Typography>;
  }

  const columns = Object.keys(data[0]);

  const formatIngredients = (ingredients) => {
    // Check if ingredients is an array and join it into a string
    if (Array.isArray(ingredients)) {
      return ingredients.join(', ');
    }
  
    // Check if ingredients is a string
    if (typeof ingredients === 'string') {
      // Insert a comma and space before each capital letter not preceded by a space
      return ingredients.replace(/(?!^)(?=[A-Z])/g, ', ');
    }
  
    // If ingredients is not a string or an array, return it as is
    return ingredients;
  };
  

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '16px' }}>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#980000' }}>
            {columns.map((column, index) => (
              <TableCell key={index} sx={{ color: '#ffffff' }}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f3f3f3' } }}>
              {columns.map((column) => (
                <TableCell key={`${index}-${column}`}>
                  {column === 'images' ? (
                    <Box
                      component="img"
                      sx={{
                        height: 50, // Set image height
                        width: 50, // Set image width
                        borderRadius: '50%', // Optional: if you want round images
                      }}
                      alt={`Image for ${row.itemname}`}
                      src={row[column]}
                    />
                  ) : column === 'ingredients' ? formatIngredients(row[column]) : row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DatabaseTable;
