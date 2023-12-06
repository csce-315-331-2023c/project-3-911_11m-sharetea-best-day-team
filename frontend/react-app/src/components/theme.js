// src/theme.js
import { createTheme } from '@mui/material/styles';

/**
 * Creates a theme object with component and palette overrides.
 * @author David Roh
 * @typedef {Object} Theme
 * @property {Object} components - Overrides for specific components.
 * @property {Object} palette - Overrides for the color palette.
 * @property {Object} palette.primary - Overrides for the primary color.
 * @property {string} palette.primary.main - The main color for the primary theme.
 * @property {Object} palette.secondary - Overrides for the secondary color.
 * @property {string} palette.secondary.main - The main color for the secondary theme.
 */
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
