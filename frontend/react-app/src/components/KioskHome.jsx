import React from 'react';
import './KioskHome.css';

const KioskHome = ({ onSelectCategory }) => {
  return (
    <div className="kiosk-home">
      <div className="welcome-message">
        <h1>Welcome to Sharetea</h1>
        <p>Good morning.</p>
        <p>Tap a category to begin your order.</p>
      </div>
      
    </div>
  );
};

export default KioskHome;
