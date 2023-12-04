import React from 'react';
// import '../styles/footer.css'; 
import InstagramIcon from '../images/instagram_logo.png'; 
import FacebookIcon from '../images/facebook_logo.png';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-text-container">
        <p className="footer-contact">
          Contact us:
        </p>
      </div>
      <div className="social-icons">
        <a href="https://www.instagram.com/sharetea/?hl=en" target="_blank" rel="noopener noreferrer">
          <img src={InstagramIcon} alt="Instagram" className="social-icon" aria-label="Instagram" />
        </a>
        <a href="https://www.facebook.com/shareteacs/" target="_blank" rel="noopener noreferrer">
          <img src={FacebookIcon} alt="Facebook" className="social-icon" aria-label="Facebook" />
        </a>
      </div>
      <div className="footer-text-container">
        <p className="footer-text">
          copyright © 2023 | Sharetea CSCE 315 Project 3 Section 911 Team 11M Best Day Team
        </p>
      </div>
    </div>
  );
};

export default Footer;
