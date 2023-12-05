import React, { useState, useEffect } from 'react';
import CurrentTime from './CurrentTime'; 
import './KioskHome.css';


const KioskHome = ({ onSelectCategory }) => {
  const getGreeting = () => {
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="kiosk-home">
      <div className="welcome-message">
        <h1>Welcome to Sharetea</h1>
        <p>{getGreeting()}</p>
        <p>Tap a category to begin your order.</p>
      </div>
    </div>
  );
};

export default KioskHome;
