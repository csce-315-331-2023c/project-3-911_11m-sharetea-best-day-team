import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

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