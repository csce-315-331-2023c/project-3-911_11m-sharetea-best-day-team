import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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
  bottom: '20px', // Adjust the bottom value as needed
  right: '20px', // Adjust the right value as needed
  height: '100px',
  zIndex: 1000,
});

export default function CartComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState(props.drinks);

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
  }

  

  React.useEffect(() => {
    // console.log('CartComponent received updated drinks:', props.drinks);
    setCart(props.drinks);
    // console.log("hi");  
  }, [props.drinks]);



  return (
    <React.Fragment>
      <CartButton color="primary" aria-label="add to shopping cart" onClick={handleClickOpen}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Cart <AddShoppingCartIcon />
      </Button>
      
      </CartButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
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
          cart.map((drink) => (
            <Typography gutterBottom key={drink.drink.name}>
              <h3>{drink.drink.name}</h3> (Quantity: {drink.quantity})
              <ul>
                <li>Ice: {drink.ice}</li>
                <li>Sweetness: {drink.sweetness}</li>
                <li>Toppings: {drink.toppings}</li>
                <li>Price: ${drink.subtotal}</li>
              </ul>
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
    </React.Fragment>
  );
}

