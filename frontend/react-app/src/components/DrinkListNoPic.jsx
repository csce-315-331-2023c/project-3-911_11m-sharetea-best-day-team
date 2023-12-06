import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box, ThemeProvider } from '@mui/material';
import theme from './theme'; // Make sure the path to the theme file is correct

/**
 * Renders a list of drinks without pictures.
 * @author Amber Cheng
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.drinks - The array of drinks to display.
 * @param {Function} props.onSelectDrink - The function to call when a drink is selected.
 * @returns {JSX.Element} The rendered component.
 */
const DrinkListNoPic = ({ drinks, onSelectDrink }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2,
          p: 2,
          width: '100%',
        }}
      >
        {drinks.map((drink) => (
          <Card key={drink.name} sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <CardActionArea
              onClick={() => onSelectDrink(drink)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 192, 203, 0.5)', // Pastel red on hover
                  // Override MUI's default hover behavior which sets opacity
                  '@media (hover: none)': {
                    backgroundColor: 'transparent',
                  },
                },
                height: '100%', // Adjust the height to fill the entire card
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Removed CardMedia component */}
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h4" component="div" sx={{ color: theme.palette.secondary.main }}>
                  {drink.name}
                </Typography>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                  ${drink.price.toFixed(2)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default DrinkListNoPic;
