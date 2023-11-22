import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function CurrentTime() {
 const [currentTime, setCurrentTime] = useState(new Date());

 useEffect(() => {
   const timer = setInterval(() => {
     setCurrentTime(new Date());
   }, 1000);
   return () => clearInterval(timer);
 }, []);

 return (
   <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 24, color: '#980000', marginTop: 2 }}>
     <AccessTimeIcon sx={{ marginRight: 1 }} />
     <Typography variant="h4">
       {currentTime.toLocaleTimeString()}
     </Typography>
   </Box>
 );
}

export default CurrentTime;
