import { useAuth0 } from '@auth0/auth0-react';
import React from "react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (  
        isAuthenticated && (
            <p onClick={() => logout()}>Sign out</p>
        )
            // <p onClick={() => logout()}>Sign out</p>
    );
}
 
export default LogoutButton;