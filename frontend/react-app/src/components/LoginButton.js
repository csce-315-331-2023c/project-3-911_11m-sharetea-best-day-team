import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (  
        !isAuthenticated && (
            <p onClick={() => loginWithRedirect()}>Login</p>
        )


    );
}
 
export default LoginButton;