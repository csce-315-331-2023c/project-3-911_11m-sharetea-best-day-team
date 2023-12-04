import React, { useEffect, useState } from 'react';
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
import shareteaLogo from '../images/sharetea_logo.png';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ManagerButton from './ManagerButton';
import ProfileComponent from './ProfileComponent';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/home.css';

const TranslateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#980000',
  color: theme.palette.getContrastText('#980000'),
  '&:hover': {
    backgroundColor: '#870000',
  },
}));

const TopNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isLoading, error } = useAuth0();
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const increaseFontSize = () => setFontSize((size) => size + 10);
  const decreaseFontSize = () => setFontSize((size) => size > 100 ? size - 10 : 100);
  const toggleHighContrast = () => setHighContrast((contrast) => !contrast);

  useEffect(() => {
    // Apply the font size to the root element
    document.documentElement.style.fontSize = `${fontSize}%`;

    // Apply or remove high contrast mode
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [fontSize, highContrast]);

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
          <Button onClick={increaseFontSize}>A+</Button>
        <Button onClick={decreaseFontSize}>A-</Button>
        <Button onClick={toggleHighContrast}>High Contrast</Button>
        </Box>

        <Box className="navbar-middle">
          <IconButton component={RouterLink} to="/" className="navbar-logo">
            <img src={shareteaLogo} alt="Sharetea Logo" />
          </IconButton>
          <Box className="navbar-links">
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
