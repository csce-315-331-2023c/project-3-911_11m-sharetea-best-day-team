import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const SideMenu = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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