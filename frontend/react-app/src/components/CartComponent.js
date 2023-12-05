import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CustomizationModal from './CustomizationModal';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CartButton = styled(IconButton)({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  height: '100px',
  zIndex: 1000,
});
const StyledButton = styled(Button)(({ theme }) => ({
  // Increase the size of the button
  padding: theme.spacing(1.5),
  // Set the background color to the hex color provided
  backgroundColor: '#980000',
  '&:hover': {
    backgroundColor: '#870000', // Darken the button slightly when hovered
  },
  // Change the color of the text/icon to white for better contrast
  color: theme.palette.getContrastText('#980000'),
  // Increase the size of the icons inside the button
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
}));

/**
 * Renders a cart component with the provided drinks.
 * @param {Object} props - The component props.
 * @param {Array} props.drinks - The array of drinks in the cart.
 * @param {Function} props.clearCart - The function to clear the cart.
 * @param {Function} props.addToCart - The function to add a drink to the cart.
 * @returns {JSX.Element} The rendered cart component.
 */
export default function CartComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState(props.drinks);
  const [selectedDrinkIndex, setSelectedDrinkIndex] = React.useState(null);
  const [isCustomizationModalOpen, setCustomizationModalOpen] = React.useState(false);
  const [isEdited, setEdited] = React.useState(false);


  /**
   * Opens the cart and sets the cart items.
   */
  const handleClickOpen = () => {
    setOpen(true);
    setCart(props.drinks);
  };

  /**
   * Closes the cart.
   */
  const handleClose = () => {
    setOpen(false);
  };
  /**
   * Thomas Zheng
   * @param {*} query the query to reload the page
   * @returns Inventory as rows
   */
  const fetchDataFromQuery = async (query) => {
    try {
      const response = await fetch('https://backend-heli.onrender.com/query', {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // Make sure this matches the structure the server sends
    } catch (error) {
      console.error('Error fetching data', error);
      throw error; // Rethrow the error so you can catch it where the function is called
    }
  };
  
  /**
   * Handles the checkout process by calculating the total revenue from the cart,
   * fetching the highest order number from the database, preparing and executing
   * the insert operations for each drink in the cart, and clearing the cart
   * after successful insertion.
   */
  const handleCheckout = async () => {
    try {
      // Calculate the total revenue from the cart
      const revenue = cart.reduce((acc, drink) => acc + drink.subtotal, 0);
      // Fetch the highest order number from the database
      const orderNumQuery = "SELECT MAX(order_num) AS highest_order_num FROM orders;";
      const orderResponse = await fetchDataFromQuery(orderNumQuery);
      console.log(orderResponse[0].highest_order_num);
      // Extract the highest order number from the response
      const highestOrderNumArray = orderResponse.map(row => {
        return {
          high_num:row.highest_order_num,
        };
      }); // Assuming the response is an object with the number as the value
      const highestOrderNum = orderResponse[0].highest_order_num > 0 ? parseInt(orderResponse[0].highest_order_num, 10) + 1 : 1;
      console.log(orderResponse[0].highest_order_num);
      console.log("hi amber :3"); // ?????????

      
  
      // Prepare and execute the insert operations for each drink in the cart
      cart.forEach((drink) => {
        console.log("quantity: ",drink.quantity);
        for (let i = 0; i < parseInt(drink.quantity); ++i) {

          console.log("i:",i);
          let sweetness = -1.0;
          switch(drink.sweetness) {
            case '0%':
              sweetness = 0.0;
              break;
            case '30%':
              sweetness = 0.3;
              break;
            case '80%':
              sweetness = 0.8;
              break;
            case '50%':
              sweetness = 0.5;
              break;
            case '100%':
              sweetness = 1.0;
              break;
            case '120%':
              sweetness = 1.2;
              break;
            default:
              sweetness = 1.0;
              break;
          }

          let ice_level = 1.00;
          switch(drink.ice) {
            case "No Ice":
              ice_level = 0.0;
              break;
            case "Less Ice":
              ice_level = 0.5;
              break;
            case "Normal Ice":
              ice_level = 1.00;
              break;
            case "Extra Ice":
              ice_level = 1.5;
              break;
            default:
              ice_level = 1.00;
              break;
          }

          const toppingsArrayString = `{${drink.toppings.join(',')}}`; // Convert toppings array to a string format accepted by PostgreSQL
          // console.log(`
          // INSERT INTO orders (order_num, drink_id, toppings, employee_id, price, revenue, sweetness, ice, date, time, week) 
          // VALUES (
          //   ${highestOrderNum}, 
          //   '${drink.drink.id}', 
          //   '${toppingsArrayString}', 
          //   '1', 
          //   ${drink.subtotal}, 
          //   ${revenue}, 
          //   ${sweetness}, 
          //   ${ice_level}, 
          //   CURRENT_DATE, 
          //   CURRENT_TIME, 
          //   EXTRACT(WEEK FROM CURRENT_DATE)
          // );`);
          const insertOrderQuery = `
            INSERT INTO orders (order_num, drink_id, toppings, employee_id, price, revenue, sweetness, ice, date, time, week) 
            VALUES (
              '${highestOrderNum}', 
              '${drink.drink.id}', 
              '${toppingsArrayString}', 
              '1', 
              ${drink.subtotal}, 
              ${revenue}, 
              ${sweetness}, 
              ${ice_level}, 
              CURRENT_DATE, 
              CURRENT_TIME, 
              EXTRACT(WEEK FROM CURRENT_DATE)
            );`;
    
            console.log(insertOrderQuery);
          // Make an API call to insert the order
          insertDataFromQuery(insertOrderQuery);
        }
      });
      console.log("hi")
      // Clear the cart after successful insertion
      // if (props.clearCart) {
        props.clearCart();
        console.log("bye")
      // }
    } catch (error) {
      console.error('Checkout failed', error);
    }
    console.log("hi2")
    handleClose();
    console.log("bye2")
  };
  
  /**
   * Inserts data into the backend using the provided SQL query.
   * @param {string} query - The SQL query to be executed.
   * @returns {Promise<any>} - A promise that resolves to the response data from the backend.
   */
  const insertDataFromQuery = async (query) => {
    try {
      // Make API call with the INSERT query
      const response = await fetch('https://backend-heli.onrender.com/update-data', {
        method: 'PUT',
        body: JSON.stringify({ query }), // Send the raw SQL query in the body
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Check for non-2xx status codes and throw an error if found
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Optionally, handle the response data if necessary
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending data', error);
    }
  };
  

  /**
   * Deletes a drink from the cart.
   * @param {number} drinkIndex - The index of the drink to be deleted.
   */
  const handleDelete = (drinkIndex) => {
    const updatedCart = [...cart.slice(0, drinkIndex), ...cart.slice(drinkIndex + 1)];
    props.setCart(updatedCart);
  };

  /**
   * Handles the edit action for a drink in the cart.
   * 
   * @param {Event} event - The event object.
   * @param {number} drinkIndex - The index of the drink in the cart.
   * @returns {void}
   */
  const handleEdit = (event, drinkIndex) => {
    console.log("handleEdit called");
    event.stopPropagation();
    setSelectedDrinkIndex(drinkIndex);
    console.log("Selected drink: ", drinkIndex);
    setCustomizationModalOpen(true);
    // console.log("Trying to set customization modal open to true2");
    
  };

  React.useEffect(() => {
    setCart(props.drinks);
  }, [props.drinks]);

  React.useEffect(() => {
    console.log("useEffect is running. Updated isEdited:", isCustomizationModalOpen);
    setEdited(isCustomizationModalOpen);
  }, [isCustomizationModalOpen]);

  React.useEffect(() => {
    console.log("Selected drink index: ", selectedDrinkIndex);
  }, [selectedDrinkIndex]);
  

  return (
    <React.Fragment>
      <CartButton color="primary" aria-label="add to shopping cart" onClick={handleClickOpen}>
        <StyledButton variant="contained" onClick={handleClickOpen}>
          Cart <AddShoppingCartIcon />
        </StyledButton>
      </CartButton>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Current Cart
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {cart.length > 0 ? (
            cart.map((drink, index) => (
              <Typography gutterBottom key={drink.drink.name}>
                <h3>{drink.drink.name}</h3> (Quantity: {drink.quantity})
                <ul>
                  <li>Ice: {drink.ice}</li>
                  <li>Sweetness: {drink.sweetness}</li>
                  <li>Toppings: {drink.toppings}</li>
                  <li>{`Price: $${drink.subtotal.toFixed(2)}`}</li>
                </ul>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={(event) => handleEdit(event, index, drink)}
                >
                  Edit
                </Button>
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1" color="textSecondary">
              Your cart is empty.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCheckout}>
            Checkout
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {console.log("dex before custselected drink inomization: ", selectedDrinkIndex)}
      {isCustomizationModalOpen && selectedDrinkIndex !== null && (
        <CustomizationModal
          drink={cart[selectedDrinkIndex].drink}
          onClose={() => {
            setCustomizationModalOpen(false);
          }}
          isEdited={isEdited}
          addToCart={props.addToCart}
          handleDelete={handleDelete}
          index={selectedDrinkIndex}
        />
      )}
    </React.Fragment>
  );
}
