import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import Button from '@mui/material/Button'

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (  
        !isAuthenticated && (
            // <p onClick={() => loginWithRedirect()}>Login</p>
            <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
                Login
            </Button>
        )
            // <p onClick={() => loginWithRedirect()}>Login</p>
        

    );
}
 
export default LoginButton;