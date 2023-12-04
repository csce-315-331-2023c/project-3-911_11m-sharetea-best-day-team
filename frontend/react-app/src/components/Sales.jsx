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
  { field: 'order_num', headerName: 'Order Number', width: 150 },
  { field: 'drink_id', headerName: 'Drink ID', width: 120 },
  { field: 'toppings', headerName: 'Toppings', width: 150 },
  { field: 'employee_id', headerName: 'Employee ID', width: 150 },
  { field: 'price', headerName: 'Price', type: 'number', width: 120 },
  { field: 'revenue', headerName: 'Revenue', type: 'number', width: 120 },
  { field: 'sweetness', headerName: 'Sweetness', type: 'number', width: 120 },
  { field: 'ice', headerName: 'Ice', type: 'number', width: 120 },
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'time', headerName: 'Time', width: 120 },
  { field: 'week', headerName: 'Week', type: 'number', width: 120 },
];

const fetchDataFromQuery = async (query) => {
  try {
    // Make API call
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
    return [];
  }
};

const Sales = () => {
  const [formData, setFormData] = useState({
    drinkId: '',
    fromDate: '',
    fromTime: '',
    toDate: '',
    toTime: '',
  });

  const [resultData, setResultData] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { drinkId, fromDate, fromTime, toDate, toTime } = formData;

    const query = `
      SELECT order_num, drink_id, toppings, employee_id, price, revenue, sweetness, ice, date, time
      FROM orders
      WHERE drink_id = '${drinkId}'
      AND (
        (date = '${fromDate}' AND time >= '${fromTime}')
        OR (date > '${fromDate}' AND date < '${toDate}')
        OR (date = '${toDate}' AND time <= '${toTime}')
      );
    `;

    //console.log(query);
    const data = await fetchDataFromQuery(query);
    const newRows = data.map(row => { //Each row that is created needs an ID, ingredient, count, min, and isNew to false as they were already in the database
        return {
          id:randomId(),
          order_num:row.order_num,
          drink_id:row.drink_id,
          toppings: row.toppings,
          employee_id: row.employee_id,
          price: row.price,
          revenue: row.revenue,
          sweetness: row.sweetness,
          ice: row.ice,
          date: row.date,
          time: row.time,
          week: row.week,
        };
      });
    setResultData(newRows);
  };

  return (
    <div style={{ width: '100%'}}>
      <Typography variant="h3" gutterBottom>
        Sales
      </Typography>

      <div style={{ display: 'flex'}}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '16px' }}>
        <TextField
          name="drinkId"
          label="Drink ID (i.e. 001)"
          variant="outlined"
          value={formData.drinkId}
          onChange={handleChange}
        />
        <TextField
          name="fromDate"
          label="From Date (yyyy-mm-dd)"
          variant="outlined"
          value={formData.fromDate}
          onChange={handleChange}
        />
        <TextField
          name="fromTime"
          label="From Time (hh:mm:ss)"
          variant="outlined"
          value={formData.fromTime}
          onChange={handleChange}
        />
        <TextField
          name="toDate"
          label="To Date (yyyy-mm-dd)"
          variant="outlined"
          value={formData.toDate}
          onChange={handleChange}
        />
        <TextField
          name="toTime"
          label="To Time (hh:mm:ss)"
          variant="outlined"
          value={formData.toTime}
          onChange={handleChange}
        />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      </div>
      <Box sx={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={resultData}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Sales;
