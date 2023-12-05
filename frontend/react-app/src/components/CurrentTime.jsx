import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

/**
 * Renders the current time in a formatted way.
 * 
 * @author David Roh
 * 
 * @returns {JSX.Element} The CurrentTime component.
 */
function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '15px', color: 'black', marginTop: 2 }}>
      <p variant="h6" component="h6" >
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </Box>
  );
}

export default CurrentTime;
