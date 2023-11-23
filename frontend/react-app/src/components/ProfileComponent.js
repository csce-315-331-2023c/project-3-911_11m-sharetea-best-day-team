import { useAuth0 } from "@auth0/auth0-react";

const ProfileComponent = () => {
    const { user, isAuthenticated } = useAuth0();
    return (  
        isAuthenticated && (
            <div>
              <img src={user.picture} alt={user.name} />
              {/* <h2>{user.name}</h2> */}
              <p>{user.name}</p>
            </div>
        )
    );
}
 
export default ProfileComponent;