import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import {
    randomId,
  } from '@mui/x-data-grid-generator';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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

/**
 * Fetches data from the API using the provided query.
 * @author Thomas Zheng
 * @param {string} query - The query to be sent to the API.
 * @returns {Promise<Array>} - A promise that resolves to an array of data fetched from the API.
 */
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

/**
 * Renders a component for managing sales data.
 * @author Thomas Zheng
 * @returns {JSX.Element} The Sales component.
 */
const Sales = () => {
  const [formData, setFormData] = useState({
    drinkId: '',
    fromDate: null,
    fromTime: null,
    toDate: null,
    toTime: null,
  });

  const [resultData, setResultData] = useState([]);

  /**
   * Handles the change event of an input element.
   * @param {Object} event - The event object.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles the form submission.
   * Fetches sales data from the API based on the form data.
   * Updates the state with the fetched data.
   * If the form data is invalid, the state is updated with an empty array.
   * If the form data is valid, the state is updated with the fetched data.
   * 
   * @param {Event} event - The form submission event.
   * @returns {Promise<void>} - A promise that resolves when the form submission is handled.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { drinkId, fromDate, fromTime, toDate, toTime } = formData;

    const formatDate = new Date(fromDate);
    const formattedDate = `${formatDate.getFullYear()}-${(formatDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${formatDate.getDate().toString().padStart(2, '0')}`;
      
    const newFromTime = new Date(fromTime);
    const formattedTime = newFromTime
      ? newFromTime.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : '';

    const formatToDate = new Date(toDate);
    const formattedToDate = `${formatToDate.getFullYear()}-${(formatToDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${formatToDate.getDate().toString().padStart(2, '0')}`;
    
    const newToTime = new Date(toTime);
    const formattedToTime = newToTime
      ? newToTime.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : '';

    console.log(formattedDate);
    console.log(formattedToDate);
    console.log(formattedTime);
    console.log(formattedToTime);


    if (formattedDate > formattedToDate || (formattedDate === formattedToDate && formattedTime > formattedToTime)){
      setResultData([]);
    }
    else {
      const query = {
        line:'',
      };

      if(formattedDate === formattedToDate) {
        query.line = `
          SELECT order_num, drink_id, toppings, employee_id, price, revenue, sweetness, ice, date, time
          FROM orders
          WHERE drink_id = '${drinkId}'
          AND (
            (date = '${formattedDate}' AND time >= '${formattedTime}' AND time <= '${formattedToTime}')
          );
        `;
      } else {
        query.line = `
          SELECT order_num, drink_id, toppings, employee_id, price, revenue, sweetness, ice, date, time
          FROM orders
          WHERE drink_id = '${drinkId}'
          AND (
            (date = '${formattedDate}' AND time >= '${formattedTime}')
            OR (date > '${formattedDate}' AND date < '${formattedToDate}')
            OR (date = '${formattedToDate}' AND time <= '${formattedToTime}')
          );
        `;
      }

      //console.log(query);
      const data = await fetchDataFromQuery(query.line);
          
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
    }
  };

  /**
   * Handles the change event for the fromDate input field.
   * @param {Date} date - The selected date.
   */
  const handleFromDateChange = (date) => {
    setFormData({
      ...formData,
      fromDate: date,
    });
  };

  /**
   * Handles the change event for the fromTime input field.
   * @param {string} time - The selected time value.
   */
  const handleFromTimeChange = (time) => {
    setFormData({
      ...formData,
      fromTime: time,
    });
  };

  /**
   * Handles the change event for the "toDate" date input.
   * Updates the formData state with the new toDate value.
   * 
   * @param {Date} date - The selected date.
   */
  const handleToDateChange = (date) => {
    setFormData({
      ...formData,
      toDate: date,
    });
  };

  /**
   * Handles the change of the "toTime" value.
   * @param {string} time - The new value for "toTime".
   */
  const handleToTimeChange = (time) => {
    setFormData({
      ...formData,
      toTime: time,
    });
  };

  return (
    <div style={{ width: '100%'}}>
      <Typography variant="h3" component="p" gutterBottom>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              value={formData.fromDate}
              onChange={handleFromDateChange}
              renderInput={(params) => <TextField {...params} name="fromDate" />}
            />
            <TimePicker
              label="From Time"
              value={formData.fromTime}
              onChange={handleFromTimeChange}
              renderInput={(params) => <TextField {...params} name="fromTime" />}
            />
            <DatePicker
              label="To Date"
              value={formData.toDate}
              onChange={handleToDateChange}
              renderInput={(params) => <TextField {...params} name="toDate" />}
            />
            <TimePicker
              label="To Time"
              value={formData.toTime}
              onChange={handleToTimeChange}
              renderInput={(params) => <TextField {...params} name="toTime" />}
            />
          </LocalizationProvider>
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
