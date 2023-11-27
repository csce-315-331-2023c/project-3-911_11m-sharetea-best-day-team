import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box, useTheme, useMediaQuery, Grid } from '@mui/material';
import CurrentTime from './CurrentTime';
import WeatherWidget from './WeatherCall';
import shareteaLogo from '../images/sharetea_logo.png';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ManagerButton from './ManagerButton'
import ProfileComponent from './ProfileComponent';
import { useAuth0 } from "@auth0/auth0-react"

const TopNavbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { isLoading, error } = useAuth0(); 

    return (
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Toolbar sx={{ justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WeatherWidget />
                    <CurrentTime />
                </Box>

                <Box sx={{ textAlign: 'center', my: isMobile ? 1 : 0 }}>
                    <IconButton component={RouterLink} to="/" sx={{ p: 0 }}>
                        <img src={shareteaLogo} alt="Sharetea Logo" style={{ height: '50px' }} />
                    </IconButton>
                    <Grid item>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button component={RouterLink} to="/menu" sx={{ my: 1, mx: 1.5, color: 'black' }}>
                            MENU
                        </Button>
                        <Button component={RouterLink} to="/kiosk" sx={{ my: 1, mx: 1.5, color: 'black' }}>
                            ORDER HERE
                        </Button>
                        </Box>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Button component={RouterLink} to="/manager" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button> */}
                    {error && <p>Authentication Error</p>}
                    {/* {error &&  */}
                    {/* // <> */}
                        {/* <ManagerButton /> <LogoutButton /> <ProfileComponent /> */}
                    {/* </>} */}
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
        </AppBar>
    );
};

export default TopNavbar;
