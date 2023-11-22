import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/home.css'
import shareteaLogo from '../images/sharetea_logo.png'
import accessibilitySymbol from '../images/accessibility-symbol.png'

import WeatherWidget from './WeatherCall';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ManagerButton from './ManagerButton'
import { useAuth0 } from "@auth0/auth0-react"

const TopNavbar = () => {
    const { isLoading, error } = useAuth0();
    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <WeatherWidget />
            </div>

            <div className='navbar-middle'>
                <Link to="/"><img className="sharetea-logo" src={shareteaLogo}></img></Link>
                <div className="nav-links">
                    <Link to="/">Menu</Link>
                    <Link to="/kiosk">Order here</Link>
                </div>
            </div>

            <div className='navbar-right nav-links'>
                {/* {error && <p>Authentication Error</p>} */}
                {error && <><ManagerButton /> <LogoutButton /> </>}
                {!error && isLoading && <p>Loading...</p>}
                {!error && !isLoading && (
                    <>
                        <LoginButton />
                        {/* <LogoutButton /> */}
                        {/* <ManagerButton /> */}
                    </>
                )}
                
                
            </div>
        </div>
    )
};

export default TopNavbar;
