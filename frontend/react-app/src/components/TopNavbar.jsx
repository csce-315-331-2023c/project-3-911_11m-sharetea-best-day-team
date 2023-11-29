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
  Grid,
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

const TopNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isLoading, error } = useAuth0();

  useEffect(() => {
    // Check if the script has already been added to the document
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.id = 'google-translate-script'; // Set a unique ID for the script
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  useEffect(() => {
    // This function is called by the Google Translate API when the script is loaded
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    };
  }, []);

  // return (
  //   <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
  //       <div id="google_translate_element"></div>
  //     <Toolbar sx={{ justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row' }}>
  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         <WeatherWidget />
  //         <CurrentTime />
  //       </Box>

  //       <Box sx={{ textAlign: 'center', my: isMobile ? 1 : 0 }}>
  //         <IconButton component={RouterLink} to="/" sx={{ p: 0 }}>
  //           <img src={shareteaLogo} alt="Sharetea Logo" style={{ height: '50px' }} />
  //         </IconButton>
  //         <Grid item>
  //           <Box sx={{ display: 'flex', gap: 2 }}>
  //             <Button component={RouterLink} to="/menu" sx={{ my: 1, mx: 1.5, color: 'black' }}>
  //               MENU
  //             </Button>
  //             <Button component={RouterLink} to="/kiosk" sx={{ my: 1, mx: 1.5, color: 'black' }}>
  //               ORDER HERE
  //             </Button>
  //           </Box>
  //         </Grid>
  //         {/* <div id="google_translate_element"></div> */}
  //       </Box>

  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         {error && <p>Authentication Error</p>}
  //         {!error && isLoading && <p>Loading...</p>}
  //         {!error && !isLoading && (
  //           <>
  //             <ProfileComponent />
  //             <ManagerButton />
  //             <LoginButton />
  //             <LogoutButton />
  //           </>
  //         )}
  //       </Box>
  //     </Toolbar>
  //   </AppBar>
  // );
  return (
    <AppBar position="static" color="default" elevation={0} className="navbar">
      <div id="google_translate_element"></div>
      <Toolbar className="navbar-container">
        <Box className="navbar-left">
          <CurrentTime />
          <WeatherWidget />
        </Box>

        <Box className="navbar-middle">
          <IconButton component={RouterLink} to="/" className="navbar-logo">
            <img src={shareteaLogo} alt="Sharetea Logo" />
          </IconButton>
          <Box className="navbar-links">
            <Button component={RouterLink} to="/menu">
              MENU
            </Button>
            <Button component={RouterLink} to="/kiosk">
              ORDER HERE
            </Button>
          </Box>
        </Box>

        <Box className="navbar-right">
          <Grid item>
          </Grid>

          <Box className="navbar-auth">
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
