import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/home.css'
import shareteaLogo from '../images/sharetea_logo.png'
import accessibilitySymbol from '../images/accessibility-symbol.png'


const TopNavbar = () => {
   return (
    <div className='navbar'>
        <div className='navbar-left'>
            {/* <img className='accessibility-logo' src={accessibilitySymbol}></img> */}
        </div>

        <div className='navbar-middle'>
            <Link to="/"><img className="sharetea-logo" src={shareteaLogo}></img></Link>
            <div className="nav-links">
            <Link to="/">Menu</Link>
            <Link to="/order-page">Order here</Link>
            </div>
        </div>

        <div className='navbar-right nav-links'>
            <Link to="/manager">Login</Link>
        </div>
    </div>
   ) 
};

export default TopNavbar;