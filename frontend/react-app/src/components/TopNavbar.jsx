import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import CurrentTime from './CurrentTime';
import WeatherWidget from './WeatherCall';
import shareteaLogo from '../images/sharetea_logo_2.png';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ManagerButton from './ManagerButton';
import ProfileComponent from './ProfileComponent';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/home.css';
import CashierButton from './CashierButton';

/**
 * TranslateButton component.
 * @author Amber Cheng
 * @component
 * @example
 * return (
 *   <TranslateButton onClick={handleTranslate}>
 *     Translate
 *   </TranslateButton>
 * )
 */
const TranslateButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#F5F5F5',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '18px',
  padding: '5px 20px',
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
 * Represents the top navigation bar component.
 * @author Amber Cheng, Sean Caballa, David Roh
 * @component
 */
const TopNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isLoading, error } = useAuth0();

  useEffect(() => {
    const googleTranslateScriptId = 'google-translate-script';
    // Check if the script has already been added to the document
    if (!document.getElementById(googleTranslateScriptId)) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.id = googleTranslateScriptId; // Set a unique ID for the script
      document.head.appendChild(script);

      script.addEventListener('load', () => {
        // This function is called by the Google Translate API when the script is loaded
        window.googleTranslateElementInit = function () {
          if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
            console.error('Google Translate script loaded but library not available.');
            return;
          }
          new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
        };
      });

      return () => {
        // Remove the event listener on cleanup
        script.removeEventListener('load', window.googleTranslateElementInit);
        // Remove the script from the document
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <AppBar position="static" color="default" elevation={0} className="navbar">
      <Toolbar className="navbar-container">
        <Box className="navbar-left">
          <CurrentTime />
          <WeatherWidget />
        </Box>
        
        <Box className="navbar-middle">
          <Box>
            <IconButton component={RouterLink} to="/" className="navbar-logo">
              <img src={shareteaLogo} alt="Sharetea Logo" style={{ width: '300px', height: 'auto'}}/>
            </IconButton>
          </Box>
          
          <Box className="navbar-buttons">
            <TranslateButton component={RouterLink} to="/">
              HOME
            </TranslateButton>
            <TranslateButton component={RouterLink} to="/menu">
              MENU
            </TranslateButton>
            <TranslateButton component={RouterLink} to="/kiosk">
              ORDER HERE
            </TranslateButton>
          </Box>
        </Box>

        <Box className="navbar-right">
          {error && <p>Authentication Error</p>}
          {!error && isLoading && <p>Loading...</p>}
          {!error && !isLoading && (
            <>
              <ProfileComponent />
              <ManagerButton />
              {/* <br></br> */}
              <CashierButton />
              {/* <br></br> */}
              <LoginButton />
              <LogoutButton />
            </>
          )}
        </Box>
      </Toolbar>
      <div id="google_translate_element" style={{ display: isMobile ? 'none' : 'block' }}></div>
    </AppBar>
  );
};

export default TopNavbar;
