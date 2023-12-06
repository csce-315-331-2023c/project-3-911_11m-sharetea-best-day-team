import React, { useState, useEffect } from 'react';
import SideMenu from '../components/SideMenu';
import DrinkList from '../components/DrinkList';
import KioskHome from '../components/KioskHome';
import './KioskView.css';
import TopNavbar from '../components/TopNavbar';
import DrinkInfoModal from '../components/DrinkInfoModal'; 
import { CircularProgress, Typography } from '@mui/material';
import AccessibilityButton from '../components/AccessibilityButton';
import Footer from '../components/Footer';

/**
 * MenuView component displays the menu of drinks and allows users to select and view drink details.
 * @author Amber Cheng
 */
const MenuView = () => {
  document.title = "Menu —— Sharetea - Best Bubble Tea Brand"

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  // const [cart, setCart] = useState([]);
  const [drinksData, setDrinksData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [drinkInfoModalOpen, setDrinkInfoModalOpen] = useState(false);

  useEffect(() => {
    /**
     * Fetches data from the backend API and categorizes the drinks.
     * @returns {Promise<void>} A promise that resolves when the data is fetched and categorized.
     */
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Categorizes the drinks based on their item ID prefix and updates the drinks data state.
   * @param {Array} drinks - The array of drinks to be categorized.
   */
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

  /**
   * Maps a prefix to a category.
   * @param {string} prefix - The prefix to map.
   * @returns {string} The corresponding category.
   */
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
  // const calculateSubtotal = (basePrice, quantity, toppings) => {
  //   const toppingPrice = 0.75; // The price for each topping
  //   return (basePrice + toppings.length * toppingPrice) * quantity;
  // };

  // Function to add an item to the cart
  // const addToCart = (drink, quantity, toppings) => {
  //   const newItem = {
  //     drink,
  //     quantity,
  //     toppings,
  //     subtotal: calculateSubtotal(drink.price, quantity, toppings), // Calculate the subtotal for this item
  //   };
  //   setCart(currentCart => [...currentCart, newItem]); // Add the new item to the existing cart
  // };

  /**
   * Handles the selection of a category.
   * @param {string} category - The selected category.
   * @returns {void}
   */
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedDrink(null); // Reset drink selection when changing categories
  };

  /**
   * Handles the selection of a drink.
   * 
   * @param {Object} drink - The selected drink object.
   * @returns {void}
   */
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
