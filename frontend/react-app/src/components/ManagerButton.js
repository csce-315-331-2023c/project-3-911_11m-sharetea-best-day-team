import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import { Link } from 'react-router-dom';

const ManagerButton = () => {
    const { isAuthenticated } = useAuth0();
    return (  
        isAuthenticated && (
            <Link to="/manager">Manager</Link>
        )
            // <p><Link to="/manager">Manager</Link></p>
        

    );
}
 
export default ManagerButton;