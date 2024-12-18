import React, { useState, useEffect } from 'react';
import SideMenu from "../components/SideMenu";
import AccessibilityButton from "../components/AccessibilityButton"
import Footer from '../components/Footer';
import CustomizationModal from '../components/CustomizationModal';
import KioskHome from '../components/KioskHome';
import './KioskView.css';
import TopNavbar from '../components/TopNavbar';
import CartComponent from '../components/CartComponent';
import { CircularProgress, Typography } from '@mui/material';
import DrinkListNoPic from '../components/DrinkListNoPic';

/**
 * Renders the Cashier page.
 * @author Amber Cheng
 * 
 * @returns {JSX.Element} The Cashier component.
 */
function Cashier() {
    document.title = "Cashier —— Sharetea - Best Bubble Tea Brand"

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [cart, setCart] = useState([]);
    const [drinksData, setDrinksData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    /**
     * Clears the cart by setting it to an empty array.
     */
    const clearCart = () => {
        setCart([]);
    };



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
     * Categorizes the drinks based on their item ID prefix.
     * 
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
                id: drink.itemid
            });
            return acc;
        }, {});

        setDrinksData(categorizedData);
    };

    /**
     * Maps a prefix to a corresponding category.
     * @param {string} prefix - The prefix to be mapped.
     * @returns {string} - The corresponding category.
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
    /**
     * Calculates the subtotal for an item based on the base price, quantity, and toppings.
     * @param {number} basePrice - The base price of the item.
     * @param {number} quantity - The quantity of the item.
     * @param {string[]} toppings - An array of toppings for the item.
     * @returns {number} The subtotal for the item.
     */
    const calculateSubtotal = (basePrice, quantity, toppings) => {
        const toppingPrice = 0.75; // The price for each topping
        return (basePrice + toppings.length * toppingPrice) * quantity;
    };

    // Function to add an item to the cart
    /**
     * Adds an item to the cart.
     * 
     * @param {object} drink - The drink object to be added.
     * @param {number} quantity - The quantity of the drink.
     * @param {array} toppings - The toppings for the drink.
     * @param {string} ice - The ice level for the drink.
     * @param {string} sweetness - The sweetness level for the drink.
     * @returns {void}
     */
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
     * @param {string} drink - The selected drink.
     */
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
            <DrinkListNoPic drinks={drinksData[selectedCategory]} onSelectDrink={handleSelectDrink} />
            )}
            {selectedDrink && (
            <CustomizationModal drink={selectedDrink} onClose={() => setSelectedDrink(null)} isEdited={false} addToCart={addToCart} />
            )}
            
        </div>

        <div className="section-break"></div>
        <Footer/>
        <AccessibilityButton/>
        <CartComponent drinks={cart} clearCart={clearCart} setCart={setCart} addToCart={addToCart} setSelectedDrink={setSelectedDrink}/>
        </>
    );
}

export default Cashier;