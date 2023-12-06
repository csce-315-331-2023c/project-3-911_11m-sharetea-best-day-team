import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

/**
 * Represents a styled logout button component.
 * @author Sean Caballa
 * @component
 */
const LogButton = styled(Button)(({ theme }) => ({
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
 * LogoutButton component.
 * Renders a button that allows the user to sign out if they are authenticated.
 * @author Sean Caballa
 * @returns {JSX.Element|null} The rendered LogoutButton component.
 */
const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (  
        isAuthenticated && (
            // <p onClick={() => logout()}>Sign out</p>
            <LogButton onClick={() => logout()}>
                Sign out
            </LogButton>
        )
            // <p onClick={() => logout()}>Sign out</p>
    );
}
 
export default LogoutButton;