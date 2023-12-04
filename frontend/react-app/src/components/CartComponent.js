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

export default function CartComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState(props.drinks);
  const [selectedDrinkIndex, setSelectedDrinkIndex] = React.useState(null);
  const [isCustomizationModalOpen, setCustomizationModalOpen] = React.useState(false);
  const [isEdited, setEdited] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
    setCart(props.drinks);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckout = () => {
    if (props.clearCart) {
      props.clearCart();
    }
    handleClose();
  };

  const handleDelete = (drinkIndex) => {
    const updatedCart = [...cart.slice(0, drinkIndex), ...cart.slice(drinkIndex + 1)];
    props.setCart(updatedCart);
  };

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
