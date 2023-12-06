import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/**
 * The theme object for customizing the appearance of components.
 *
 * @typedef {Object} Theme
 * @property {Object} components - Custom styles for specific components.
 * @property {Object} palette - Custom color palette for the theme.
 *
 * @property {Object} components.MuiListItemButton - Custom styles for MuiListItemButton component.
 * @property {Object} components.MuiListItemButton.styleOverrides - Custom style overrides for MuiListItemButton component.
 * @property {Object} components.MuiListItemButton.styleOverrides.root - Custom styles for the root element of MuiListItemButton component.
 *
 * @property {string} components.MuiListItemButton.styleOverrides.root.width - The width of the MuiListItemButton component.
 * @property {string} components.MuiListItemButton.styleOverrides.root.borderRadius - The border radius of the MuiListItemButton component.
 * @property {string} components.MuiListItemButton.styleOverrides.root.margin - The margin of the MuiListItemButton component.
 * @property {Object} components.MuiListItemButton.styleOverrides.root.hover - Custom styles for the hover state of MuiListItemButton component.
 *
 * @property {string} components.MuiListItemButton.styleOverrides.root.hover.backgroundColor - The background color of MuiListItemButton component on hover.
 * @property {string} components.MuiListItemButton.styleOverrides.root.hover.color - The text color of MuiListItemButton component on hover.
 *
 * @property {Object} palette - Custom color palette for the theme.
 * @property {Object} palette.primary - Custom primary color for the theme.
 * @property {string} palette.primary.main - The main color of the primary palette.
 * @property {Object} palette.secondary - Custom secondary color for the theme.
 * @property {string} palette.secondary.main - The main color of the secondary palette.
 */
const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          // Rounded border
          width:'100%',
          borderRadius: '20px',
          margin: '8px 0', // Adds some space between the buttons
          '&:hover': {
            backgroundColor: '#8A0000', // Red color on hover
            color: '#fff', // White text on hover
          },
        },
      },
    },
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

/**
 * SideMenu component displays a side menu with a list of categories.
 * @author David Roh, Amber Cheng
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.categories - The list of categories to display in the side menu.
 * @param {Function} props.onSelectCategory - The function to call when a category is selected.
 * @returns {JSX.Element} The SideMenu component.
 */
const SideMenu = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  /**
   * Handles the click event on a list item.
   * 
   * @param {string} category - The selected category.
   * @returns {void}
   */
  const handleListItemClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <ThemeProvider theme={theme}>
      <List sx={{
          maxWidth: 200,
          bgcolor: 'background.paper',
          // Responsive side menu size
          width: { xs: '100%', sm: '100%' },
          marginLeft: '16px',
        }}
      >
        {categories.map((category) => (
          <ListItemButton
            key={category}
            onClick={() => handleListItemClick(category)}
            selected={selectedCategory === category}
            sx={{
              '&.Mui-selected': {
                width:'100%',
                backgroundColor: theme.palette.primary.main, // Red color for selected item
                color: '#fff', // White text for selected item
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemText primary={category} style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}/>
          </ListItemButton>
        ))}
      </List>
    </ThemeProvider>
  );
};

export default SideMenu;