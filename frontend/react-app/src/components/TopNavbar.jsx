import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import shareteaLogo from '../images/sharetea_logo_2.png';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ManagerButton from './ManagerButton';
import ProfileComponent from './ProfileComponent';
import CurrentTime from './CurrentTime';
import WeatherWidget from './WeatherCall';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import './TopNavbar.css';

const TopNavbar = () => {
  const { isAuthenticated } = useAuth0();

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
            {/* Your other buttons go here */}
            <Typography variant="h6" component="div">
              <RouterLink to="/menu" className="navbar-button">MENU</RouterLink>
              <RouterLink to="/kiosk" className="navbar-button">ORDER HERE</RouterLink>
            </Typography>
          </Box>
        </Box>

        <Box className="navbar-right">
          {isAuthenticated && <ProfileComponent />}
          <ManagerButton />
          {!isAuthenticated && <LoginButton />}
          {isAuthenticated && <LogoutButton />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
