import React, { useState, useEffect } from 'react';
import SideMenu from '../components/SideMenu';
import DrinkList from '../components/DrinkList';
import CustomizationModal from '../components/CustomizationModal';
import KioskHome from '../components/KioskHome';
import './KioskView.css';
import TopNavbar from '../components/TopNavbar';
import CartComponent from '../components/CartComponent';
import { CircularProgress, Typography } from '@mui/material';

const KioskView = () => {
  document.title = "Kiosk —— Sharetea - Best Bubble Tea Brand"

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [cart, setCart] = useState([]);
  const [drinksData, setDrinksData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearCart = () => {
    setCart([]);
  };



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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        id: drink.itemid // Assuming you may need the ID for something later
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
  const addToCart = (drink, quantity, toppings, ice, sweetness) => {
    const newItem = {
      drink,
      quantity,
      toppings,
      ice,
      sweetness,
      subtotal: calculateSubtotal(drink.price, quantity, toppings), // Calculate the subtotal for this item
    };
    setCart(currentCart => [...currentCart, newItem]); // Add the new item to the existing cart
    console.log(drink.name, quantity, toppings, ice, sweetness);
    console.log('Cart updated: ',cart);
  };

  // // Sample data (should come from your database/API)
  // const categories = ['Milk Tea', 'Brewed Tea', 'Fruit Tea', 'Ice Blended'];
  // const drinks = {
  //   'Milk Tea': [{ name: 'Classic Pearl Milk Tea', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826556470-353X8TY9JSOF2J9CVMEE/1.+MilkTea_ClassicPearl_Black.jpg?format=500w' }, { name: 'Mango Green Milk Tea', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826556844-7DWVLZUS8RYY4TOG4EGF/2.+MilkTea_MangoGreen.jpg?format=500w' }, ],
  //   'Fruit Tea': [{ name: 'Strawberry Tea', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826797231-85OVEK2VBBSEAGOMRLV3/1.+FruitTea_StrawberryTea.jpg?format=300w' }, { name: 'Peach Kiwi Tea With Aiyu Jelly', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826797231-5PNBLIAW61OD69RWP305/2.+FruitTea_PeachKiwiTeaWithAiyuJelly.jpg?format=300w' }],
  //   'Ice Blended': [{ name: 'Oreo Ice Blended With Pearl', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646827022156-IR5MT89TNA8X6BZ7VQ4J/1.+IceBlended_OreoIceBlendedWithPearl.jpg?format=300w' }, { name: 'Taro Ice Blended With Pudding', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646827022155-XE9O1AHODSX9ONPKJTVM/2.+IceBlended_TaroIceBlendedWithPudding.jpg?format=300w' }]
  // };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedDrink(null); // Reset drink selection when changing categories
  };

  const handleSelectDrink = (drink) => {
    setSelectedDrink(drink);
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
        
        <SideMenu categories={Object.keys(drinksData)} onSelectCategory={handleSelectCategory} />
        {selectedCategory === 'Home' || selectedCategory === null ? (
          <KioskHome />
        ) : (
          <DrinkList drinks={drinksData[selectedCategory]} onSelectDrink={handleSelectDrink} />
        )}
        {selectedDrink && (
          <CustomizationModal drink={selectedDrink} onClose={() => setSelectedDrink(null)} isEdited={false} addToCart={addToCart} />
        )}
        
      </div>
      <CartComponent drinks={cart} clearCart={clearCart} setCart={setCart} addToCart={addToCart} setSelectedDrink={setSelectedDrink}/>
    </>
  );
};

export default KioskView;
