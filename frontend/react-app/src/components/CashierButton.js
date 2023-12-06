import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';

/**
 * Represents a styled cashier button component.
 * @author Sean Caballa
 * @component
 */
const CashButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    backgroundColor: '#F5F5F5',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '15px',
    padding: '0px 20px',
    '&:hover': {
      backgroundColor: '#F5F5F5',
      '&::after': {
        content: '""',
        position: 'absolute',
        left: '10%',
        right: '10%',
        bottom: 0,
        height: '2px',
        backgroundColor: '#980000', // Red color
        width: '80%',
      },
    },
}));

/**
 * Renders a button component for the cashier role.
 * @author Sean Caballa
 * @returns {JSX.Element|null} The rendered button component or null if the user does not have the cashier role.
 */
const CashierButton = () => {
    const { isAuthenticated, user } = useAuth0();
    let hasCashierRole = false;
    if (isAuthenticated) {

    const roles = user['https://myroles.com/roles'];
        hasCashierRole = roles.includes('cashier');
    }
    return (  
        hasCashierRole && (
            // <Link to="/cashier">Cashier</Link>
            <CashButton component={RouterLink} to="/cashier">CASHIER</CashButton>
        )
            // <p><Link to="/manager">Manager</Link></p>
        

    );
}
 
export default CashierButton;