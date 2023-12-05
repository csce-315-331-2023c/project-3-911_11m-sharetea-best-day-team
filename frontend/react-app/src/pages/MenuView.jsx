import React, { useState, useEffect } from 'react';
import SideMenu from '../components/SideMenu';
import DrinkList from '../components/DrinkList';
import CustomizationModal from '../components/CustomizationModal';
import CurrentTime from '../components/CurrentTime';
import KioskHome from '../components/KioskHome';
import './KioskView.css';
import TopNavbar from '../components/TopNavbar';
import DrinkInfoModal from '../components/DrinkInfoModal'; 
import { CircularProgress, Typography } from '@mui/material';
import AccessibilityButton from '../components/AccessibilityButton';
import Footer from '../components/Footer';

const MenuView = () => {
  document.title = "Menu —— Sharetea - Best Bubble Tea Brand"

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [cart, setCart] = useState([]);
  const [drinksData, setDrinksData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [drinkInfoModalOpen, setDrinkInfoModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      const query = 'SELECT * FROM pricelist;';
      try {
        const response = await fetch('https://backend-heli.onrender.com/query', {
          method: 'POST',
          body: JSON.stringify({ query }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        categorizeDrinks(data);
      } catch (error) {
        setError('Failed to load drinks: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categorizeDrinks = (drinks) => {
    const categorizedData = drinks.reduce((acc, drink) => {
      const prefix = drink.itemid.charAt(0);
      const category = prefixToCategory(prefix);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        name: drink.itemname,
        imageUrl: drink.images,
        price: drink.itemprice,
        id: drink.itemid,
        ingredients: drink.ingredients
      });
      return acc;
    }, {});

    setDrinksData(categorizedData);
  };

  const prefixToCategory = (prefix) => {
    const categories = {
      '0': 'Milk Tea',
      '1': 'Brewed Tea',
      '2': 'Fruit Tea',
      '3': 'Fresh Milk',
      '4': 'Ice Blended',
      '5': 'Tea Mojito',
      '6': 'Crema'
    };
    return categories[prefix] || 'Other';
  };

  // Function to calculate the subtotal of a drink based on the base price, quantity, and toppings
  const calculateSubtotal = (basePrice, quantity, toppings) => {
    const toppingPrice = 0.75; // The price for each topping
    return (basePrice + toppings.length * toppingPrice) * quantity;
  };

  // Function to add an item to the cart
  const addToCart = (drink, quantity, toppings) => {
    const newItem = {
      drink,
      quantity,
      toppings,
      subtotal: calculateSubtotal(drink.price, quantity, toppings), // Calculate the subtotal for this item
    };
    setCart(currentCart => [...currentCart, newItem]); // Add the new item to the existing cart
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedDrink(null); // Reset drink selection when changing categories
  };

  const handleSelectDrink = (drink) => {
    setSelectedDrink(drink);
    setDrinkInfoModalOpen(true); 
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <TopNavbar />
      <div className="kiosk-view">
        {/* <CurrentTime /> */}
        <SideMenu categories={Object.keys(drinksData)} onSelectCategory={handleSelectCategory} />
        {selectedCategory === 'Home' || selectedCategory === null ? (
          <KioskHome />
        ) : (
          <DrinkList drinks={drinksData[selectedCategory]} onSelectDrink={handleSelectDrink} />
        )}
        <DrinkInfoModal
          isOpen={drinkInfoModalOpen}
          onClose={() => {
            setDrinkInfoModalOpen(false);
            setSelectedDrink(null);
          }}
          drink={selectedDrink}
        />
      </div>
      <AccessibilityButton/>
      <Footer/>
    </>
  );
};

export default MenuView;
