import React, { useState, useEffect } from 'react';
import './CurrentTime.css';

function CurrentTime() {
 const [currentTime, setCurrentTime] = useState(new Date());

 useEffect(() => {
   const timer = setInterval(() => {
     setCurrentTime(new Date());
   }, 1000);
   return () => clearInterval(timer);
 }, []);

 return (
   <div className="current-time">
     Current Time: {currentTime.toLocaleTimeString()}
   </div>
 );
}

export default CurrentTime;
