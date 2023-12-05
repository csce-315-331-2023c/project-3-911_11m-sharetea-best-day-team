// import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import './DrinkInfoModal.css';

const style = {
  position: 'fixed', // Change this from 'absolute' to 'fixed'
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw', // 80% of viewport width
  height: '80vh', // 80% of viewport height
  maxWidth: '400px', // maximum width
  maxHeight: '600px', // maximum height
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const DrinkInfoModal = ({ isOpen, onClose, drink }) => {
  if (!drink) {
    return null;
  }

  // Filter out specific ingredients
  const filteredIngredients = drink.ingredients.filter(
    ingredient => !["cups", "straws", "lids", "napkins", "ice"].includes(ingredient)
  );

  const formattedIngredients = filteredIngredients.join(', ');

  return (
    <Dialog open={isOpen} onClose={onClose} style={{style, maxWidth: '400px', alignItems: 'center'}}>
      <DialogTitle>{drink.name}</DialogTitle>
      {/* <DialogContent>
        <p align="center">Price: ${drink.price}</p>
      </DialogContent>
      <DialogContent>
        <p align="center">Item ID: {drink.id}</p>
      </DialogContent> */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <p align="center">Price: ${drink.price}</p>
        </Grid>
        <Grid item xs={6}>
          <p align="center">Item ID: {drink.id}</p>
        </Grid>
      </Grid>
      <DialogContent>
        <p>Ingredients: {formattedIngredients}</p>
        {/* <ul>
          {filteredIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DrinkInfoModal;
