import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  margin-bottom: 10px;
`;

/**
 * Renders the profile component.
 * @author Sean Caballa
 * @returns {JSX.Element} The rendered profile component.
 */
const ProfileComponent = () => {
    const { user, isAuthenticated } = useAuth0();
    return (  
        isAuthenticated && (
            <CenteredContainer>
              <ProfileImage src={user.picture} alt={user.name} />
              <p>{user.name}</p>
            </CenteredContainer>
        )
    );
}
 
export default ProfileComponent;
