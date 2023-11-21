import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (  
        isAuthenticated && (
            <p onClick={() => logout()}>Sign out</p>
        )
    );
}
 
export default LogoutButton;