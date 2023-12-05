import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import { Link } from 'react-router-dom';

const CashierButton = () => {
    const { isAuthenticated, user } = useAuth0();
    let hasCashierRole = false;
    if (isAuthenticated) {

    const roles = user['https://myroles.com/roles'];
        hasCashierRole = roles.includes('cashier');
    }
    return (  
        hasCashierRole && (
            <Link to="/cashier">Cashier</Link>
        )
            // <p><Link to="/manager">Manager</Link></p>
        

    );
}
 
export default CashierButton;