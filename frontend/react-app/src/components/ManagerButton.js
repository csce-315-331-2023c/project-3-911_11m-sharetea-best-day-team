import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import { Link } from 'react-router-dom';

/**
 * Represents a styled logout button component.
 * @author Sean Caballa
 * @component
 */
const ManaButton = styled(Button)(({ theme }) => ({
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
            <ManaButton component={RouterLink} to="/manager">MANAGER</ManaButton>
        )
            // <p><Link to="/manager">Manager</Link></p>
        

    );
}
 
export default ManagerButton;