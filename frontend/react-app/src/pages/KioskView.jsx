import React, { useState } from 'react';
import SideMenu from '../components/SideMenu';
import DrinkList from '../components/DrinkList';
import CustomizationModal from '../components/CustomizationModal';
import CurrentTime from '../components/CurrentTime';
import KioskHome from '../components/KioskHome'; // Make sure this component is created and styled as per your design
import './KioskView.css';
import TopNavbar from '../components/TopNavbar';

const KioskView = () => {
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [cart, setCart] = useState([]);

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

  // Sample data (should come from your database/API)
  const categories = ['Milk Tea', 'Fruit Tea', 'Ice Blended'];
  const drinks = {
    'Milk Tea': [{ name: 'Classic Pearl Milk Tea', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826556470-353X8TY9JSOF2J9CVMEE/1.+MilkTea_ClassicPearl_Black.jpg?format=500w' }, { name: 'Mango Green Milk Tea', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826556844-7DWVLZUS8RYY4TOG4EGF/2.+MilkTea_MangoGreen.jpg?format=500w' }, ],
    'Fruit Tea': [{ name: 'Strawberry Tea', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826797231-85OVEK2VBBSEAGOMRLV3/1.+FruitTea_StrawberryTea.jpg?format=300w' }, { name: 'Peach Kiwi Tea With Aiyu Jelly', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826797231-5PNBLIAW61OD69RWP305/2.+FruitTea_PeachKiwiTeaWithAiyuJelly.jpg?format=300w' }],
    'Ice Blended': [{ name: 'Oreo Ice Blended With Pearl', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646827022156-IR5MT89TNA8X6BZ7VQ4J/1.+IceBlended_OreoIceBlendedWithPearl.jpg?format=300w' }, { name: 'Taro Ice Blended With Pudding', imageUrl: 'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646827022155-XE9O1AHODSX9ONPKJTVM/2.+IceBlended_TaroIceBlendedWithPudding.jpg?format=300w' }]
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedDrink(null); // Reset drink selection when changing categories
  };

  const handleSelectDrink = (drink) => {
    setSelectedDrink(drink);
  };

  return (
    <>
    <TopNavbar/>
    <div className="kiosk-view">
      <CurrentTime />
      <SideMenu categories={categories} onSelectCategory={handleSelectCategory} />
      {selectedCategory === 'Home' || selectedCategory === null ? (
        <KioskHome />
      ) : (
        <DrinkList drinks={drinks[selectedCategory]} onSelectDrink={handleSelectDrink} />
      )}
      {selectedDrink && <CustomizationModal drink={selectedDrink} onClose={() => setSelectedDrink(null)} addToCart={addToCart} />}
    </div>
    </>
  );
};

export default KioskView;
