// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    // ... other component overrides if needed
  },
  palette: {
    primary: {
      main: '#980000', // Red color
    },
    secondary: {
      main: '#000000', // Black color
    },
  },
});

export default theme;
