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

export default function CartComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState(props.drinks);
  const [selectedDrinkIndex, setSelectedDrinkIndex] = React.useState(null);
  const [isCustomizationModalOpen, setCustomizationModalOpen] = React.useState(false);

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
    setCustomizationModalOpen(true);
    
  };

  React.useEffect(() => {
    setCart(props.drinks);
  }, [props.drinks]);

  return (
    <React.Fragment>
      <CartButton color="primary" aria-label="add to shopping cart" onClick={handleClickOpen}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Cart <AddShoppingCartIcon />
        </Button>
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

      {isCustomizationModalOpen && selectedDrinkIndex !== null && (
        <CustomizationModal
          drink={cart[selectedDrinkIndex].drink}
          onClose={() => {
            setCustomizationModalOpen(false);
          }}
          isEdited={true}
          addToCart={props.addToCart}
        />
      )}
    </React.Fragment>
  );
}
