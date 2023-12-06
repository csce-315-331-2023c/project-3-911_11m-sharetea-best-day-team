// import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import './DrinkInfoModal.css';

const style = {
  position: 'fixed', // Change this from 'absolute' to 'fixed'
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw', // 80% of viewport width
  height: '40vh', // 80% of viewport height
  maxWidth: '400px', // maximum width
  maxHeight: '600px', // maximum height
  boxShadow: 24,
  p: 4,
  // overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'transparent',
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
    // <Dialog open={isOpen} onClose={onClose} style={style}>
    <Dialog
  open={isOpen}
  onClose={onClose}
  style={style}
  PaperProps={{
    style: {
      backgroundColor: 'transparent !important', // Set the background color here
      boxShadow: 'none !important', // Remove the shadow
      width: '40vw', // 80% of viewport width
      height: '40vh', // 80% of viewport height
      maxWidth: '400px', // maximum width
      maxHeight: '600px', // maximum height
      // width: '100%',
      // height: '100%',
      
    },
  }}
>
      <DialogTitle>{drink.name}</DialogTitle>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <p align="center">{`Price: $${drink.price.toFixed(2)}`}</p>
        </Grid>
        <Grid item xs={6}>
          <p align="center">Item ID: {drink.id}</p>
        </Grid>
      </Grid>
      {/* <DialogContent style={{ maxHeight: 'none' }}> */}
      <DialogContent>
        <p>Ingredients: {formattedIngredients}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DrinkInfoModal;
