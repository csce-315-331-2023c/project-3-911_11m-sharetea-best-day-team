import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 700,
    height: '85%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };  

// const fetchIngredients = async (itemName) => {
//   try {
//     const response = await fetch('https://backend-heli.onrender.com/query', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ query: "SELECT ingredients FROM pricelist WHERE itemname = '${itemName}';" }),
//     });
//     if (!response.ok) {
//       throw new Error(`Data fetch failed: ${response.status}`);
//     }
//     const data = await response.json();
//     return data.rows[0]?.ingredients || ''; // Extract the ingredients from the first row, or an empty string if not available
//   } catch (error) {
//     console.error('Error fetching ingredients', error);
//     throw error;
//   }
// };

const DrinkInfoModal = ({ isOpen, onClose, drink }) => {
//   const [ingredientsStr, setIngredientsStr] = useState('');

//   useEffect(() => {
//     const loadIngredients = async () => {
//       try {
//         const ingredientsData = await fetchIngredients(drink.name);
//         setIngredientsStr(ingredientsData);
//       } catch (err) {
//         console.error('Failed to fetch ingredients.', err);
//       }
//     };

//     loadIngredients();
//   }, []); // Run the effect only once on mount

  if (!drink) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{drink.name}</DialogTitle>
      <DialogContent>
        <Typography align="center">Price: ${drink.price}</Typography>
      </DialogContent>
      <DialogContent>
        <Typography>Ingredients:</Typography>
        <ul>
          {drink.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DrinkInfoModal;
