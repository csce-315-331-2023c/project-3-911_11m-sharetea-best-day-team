import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, ToggleButton, ToggleButtonGroup, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


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

/**
 * Fetches toppings from the backend server.\
 * @author David Roh
 * @returns {Promise<Object>} The response data containing the toppings.
 * @throws {Error} If the data fetch fails.
 */
const fetchToppings = async () => {
  try {
    const response = await fetch('https://backend-heli.onrender.com/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: "SELECT itemname, itemprice FROM pricelist WHERE itemid LIKE '7%';" })
    });
    if (!response.ok) {
      throw new Error(`Data fetch failed: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching toppings', error);
    throw error;
  }
};

/**
 * CustomizationModal component for customizing a drink.
 *
 * @author David Roh, Amber Cheng
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.drink - The drink object.
 * @param {Function} props.onClose - The function to close the modal.
 * @param {Function} props.addToCart - The function to add the drink to the cart.
 * @param {boolean} props.isEdited - Indicates if the drink is being edited.
 * @param {Function} props.handleDelete - The function to handle deleting a drink.
 * @param {number} props.index - The index of the drink being edited.
 * @returns {JSX.Element} The CustomizationModal component.
 */
const CustomizationModal = ({ drink, onClose, addToCart, isEdited, handleDelete, index }) => {
  const [iceLevel, setIceLevel] = useState('Normal Ice');
  const [sweetnessLevel, setSweetnessLevel] = useState('100%');
  const [toppings, setToppings] = useState([]);
  const [toppingOptions, setToppingOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const toppingPrice = 0.75; // Assuming each topping has a fixed price for simplicity

  // Calculate the price for selected toppings
  /**
   * Calculates the total price of toppings based on the number of selected toppings and the price per topping.
   * @returns {number} The total price of toppings.
   */
  const calculateToppingsPrice = () => toppings.length * toppingPrice;

  // Calculate the subtotal price
  // const calculateSubtotal = () => (basePrice + calculateToppingsPrice()) * quantity;
  /**
   * Calculates the subtotal based on the price, quantity, and toppings.
   * @param {number} price - The price of the item.
   * @param {number} quantity - The quantity of the item.
   * @param {Array} toppings - The toppings selected for the item.
   * @returns {number} The calculated subtotal.
   */
  const calculateSubtotal = (price, quantity, toppings) => (price + calculateToppingsPrice()) * quantity;

  // Handle quantity changes
  /**
   * Handles the change in quantity.
   * @param {string} action - The action to perform ('add' or 'remove').
   */
  const handleQuantityChange = (action) => {
    setQuantity((prevQuantity) => {
      if (action === 'add') {
        return prevQuantity + 1;
      } else if (action === 'remove') {
        return prevQuantity > 1 ? prevQuantity - 1 : 1;
      }
    });
  };

  React.useEffect(() => {
    console.log("useEffect is running. Updated isEdited:", isEdited);
    // Rest of the code...
  }, [isEdited]);
  

  useEffect(() => {
    /**
     * Loads the toppings data asynchronously.
     * @returns {Promise<void>} A promise that resolves when the toppings data is loaded.
     */
    const loadToppings = async () => {
      setLoading(true);
      setError(null);
      try {
        const toppingsData = await fetchToppings();
        setToppingOptions(toppingsData);
      } catch (err) {
        setError('Failed to fetch toppings.');
      } finally {
        setLoading(false);
      }
    };

    loadToppings();
  }, []);
  // Function to handle ice level selection
  /**
   * Handles the change of ice level.
   * @param {Event} event - The event object.
   * @param {number} newIceLevel - The new ice level value.
   */
  const handleIceLevel = (event, newIceLevel) => {
    setIceLevel(newIceLevel);
  };

  // Function to handle sweetness level selection
  /**
   * Handles the change in sweetness level.
   * @param {Event} event - The event object.
   * @param {number} newSweetnessLevel - The new sweetness level.
   */
  const handleSweetnessLevel = (event, newSweetnessLevel) => {
    setSweetnessLevel(newSweetnessLevel);
  };

  // Function to handle toppings selection
  /**
   * Handles the toggling of a topping.
   * @param {string} value - The value of the topping.
   * @returns {Function} - The toggle function.
   */
  const handleToppingToggle = (value) => () => {
    const currentIndex = toppings.indexOf(value);
    const newToppings = [...toppings];

    if (currentIndex === -1) {
      newToppings.push(value);
    } else {
      newToppings.splice(currentIndex, 1);
    }

    setToppings(newToppings);
  };
  /**
   * Returns the styles for the toggle button based on the isSelected flag.
   * @param {boolean} isSelected - Indicates whether the toggle button is selected or not.
   * @returns {object} - The styles object for the toggle button.
   */
  const getToggleButtonStyles = (isSelected) => ({
    borderColor: 'red',
    color: isSelected ? '#fff' : 'black',
    bgcolor: isSelected ? 'red' : '#fff',
    '&:hover': {
      bgcolor: 'red', // Change as needed for hover effect
      color: '#fff',
    },
  });

  // You can now use iceLevel, sweetnessLevel, and toppings to pass this data elsewhere

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography id="customization-modal-title" variant="h6" component="p" sx={{ mb: 2 }}>
          Customize your drink
        </Typography>
        <Typography variant="p" sx={{ mb: 2 }}>
          {drink.name}
        </Typography>
        {/* Ice Level Selection */}
        <Typography variant="subtitle1" sx={{ color: 'black' }}>Ice Level</Typography>
        <ToggleButtonGroup
          value={iceLevel}
          exclusive
          onChange={handleIceLevel}
          aria-label="ice level"
          sx={{ mb: 2 }}
        >
          {['Normal Ice', 'Less Ice', 'No Ice', 'Extra Ice'].map((ice) => (
            <ToggleButton
              key={ice}
              value={ice}
              sx={getToggleButtonStyles(iceLevel === ice)}
            >
              {ice}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {/* Sweetness Level Selection */}
        <Typography variant="subtitle1" sx={{ color: 'black' }}>Sweetness Level</Typography>
        <ToggleButtonGroup
          value={sweetnessLevel}
          exclusive
          onChange={handleSweetnessLevel}
          aria-label="sweetness level"
          sx={{ mb: 2 }}
        >
          {['0%', '30%', '50%', '80%', '100%', '120%'].map((level) => (
            <ToggleButton
              key={level}
              value={level}
              sx={getToggleButtonStyles(sweetnessLevel === level)}
            >
              {level}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Typography variant="subtitle1">Toppings</Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {toppingOptions.map((topping) => (
              <ToggleButton
                key={topping.itemname}
                value={topping.itemname}
                selected={toppings.includes(topping.itemname)}
                onChange={handleToppingToggle(topping.itemname)}
                sx={{ borderColor: 'red', color: toppings.includes(topping.itemname) ? '#fff' : 'red', bgcolor: toppings.includes(topping.itemname) ? 'red' : '#fff' }}
              >
                {`${topping.itemname} (+$${topping.itemprice})`}
              </ToggleButton>
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <IconButton onClick={() => handleQuantityChange('remove')} disabled={quantity === 1}>
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ mx: 2 }}>{quantity}</Typography>
          <IconButton onClick={() => handleQuantityChange('add')}>
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          onClick={() => {
            // addToCart(drink, quantity, toppings, iceLevel, sweetnessLevel); // Call the addToCart function with the current selections
            
            console.log("isEdited:", isEdited);
            if (isEdited) {
              handleDelete(index) // CALL HANDLE DELETE
              console.log("edited drink at ", index)
            }
            addToCart(drink, quantity, toppings, iceLevel, sweetnessLevel); // Call the addToCart function with the current selections
            onClose(); // Close the modal after adding to cart
          }}
          variant="contained"
          sx={{ mt: 2, bgcolor: 'red' }}
        >
          {`Add to Cart - $${calculateSubtotal(drink.price, quantity, toppings).toFixed(2)}`}
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomizationModal;
