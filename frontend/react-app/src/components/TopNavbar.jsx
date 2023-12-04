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
  const [magnifier, setMagnifier] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/html-magnifier.js'; // Update the path to where you've placed the html-magnifier.js
    script.async = true;
    script.onload = () => {
      if (typeof window.HTMLMagnifier === 'function') {
        setMagnifier(new window.HTMLMagnifier({
          zoom: 2,
          shape: 'circle',
          width: 200,
          height: 200
        }));
      } else {
        console.error('HTMLMagnifier is not defined on the window object.');
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleMagnifierToggle = () => {
    if (magnifier) {
      magnifier.isVisible() ? magnifier.hide() : magnifier.show();
    }
  };

  return (
    <AppBar position="static" color="default" elevation={0} className="navbar">
      <Toolbar className="navbar-container">
        <Box className="navbar-left">
          <CurrentTime />
          <WeatherWidget />
          {/* Your buttons for font size and high contrast */}
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
          {/* The magnifier button */}
          <Button onClick={handleMagnifierToggle}>Magnifier</Button>
        </Box>
      </Toolbar>
      <div id="google_translate_element" style={{ display: isMobile ? 'none' : 'block' }}></div>
    </AppBar>
  );
};

export default TopNavbar;
