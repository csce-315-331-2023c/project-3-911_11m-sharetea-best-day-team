import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import { Link } from 'react-router-dom';

/**
 * Renders a button component for managers.
 * @author Sean Caballa
 * @returns {JSX.Element} The rendered ManagerButton component.
 */
const ManagerButton = () => {
    const { isAuthenticated, user } = useAuth0();
    let hasManagerRole = false;
    if (isAuthenticated) {

    const roles = user['https://myroles.com/roles'];
        hasManagerRole = roles.includes('manager');
    }
    return (  
        hasManagerRole && (
            <Link to="/manager">Manager</Link>
        )
            // <p><Link to="/manager">Manager</Link></p>
        

    );
}
 
export default ManagerButton;