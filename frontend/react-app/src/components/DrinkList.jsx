import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, ThemeProvider } from '@mui/material';
import theme from './theme'; // Make sure the path to the theme file is correct

/**
 * Renders a list of drinks.
 * @author David Roh
 * 
 * @component
 * @param {Object[]} drinks - The array of drinks to display.
 * @param {Function} onSelectDrink - The function to call when a drink is selected.
 * @returns {JSX.Element} The rendered DrinkList component.
 */
const DrinkList = ({ drinks, onSelectDrink }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2,
          p: 2,
          width: '100%'
        }}
      >
        {drinks.map((drink) => (
          <Card key={drink.name} sx={{ maxWidth: 345, bgcolor: 'background.paper' }}>
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
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={drink.imageUrl}
                alt={drink.name}
                sx={{ objectFit: 'contain', p: 1 }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="p" component="div" sx={{ color: theme.palette.secondary.main }}>
                  {drink.name}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
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

export default DrinkList;
