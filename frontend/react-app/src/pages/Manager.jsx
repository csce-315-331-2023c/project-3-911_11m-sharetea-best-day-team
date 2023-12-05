import React, { useState, useEffect } from 'react';
import ButtonComponent from "../components/ButtonComponent";
import SideMenu from "../components/SideMenu";
import TopNavbar from "../components/TopNavbar"
import Restock from "../components/Restock";
import Sales from "../components/Sales";
import Excess from "../components/Excess";
import Inventory from '../components/Inventory';
import Menu from '../components/Menu';
import logo from '../logo.svg';
import AccessibilityButton from '../components/AccessibilityButton';
import Footer from '../components/Footer';
import './Manger.css';
import { useAuth0 } from '@auth0/auth0-react';


function Manager() {

    document.title = "Manager —— Sharetea - Best Bubble Tea Brand"

    const [selectedCategory, setSelectedCategory] = useState('Inventory');
    const { isAuthenticated } = useAuth0();

    const renderComponent = () => {
        switch (selectedCategory) {
        case 'Inventory':
            return <Inventory />;
        case 'Excess':
            return <Excess />;
         case 'Restock':
             return <Restock />;
        case 'Menu':
            return <Menu />;
        case 'Sales':
            return <Sales />;
        default:
            return <Inventory />;
        }
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const categories = ['Inventory', 'Sales', 'Restock', 'Excess', 'Menu'];

    if (!isAuthenticated) {
        // Redirect or show an error message
        window.location.href = "https://sharetea-bds8.onrender.com/";
      }

    return (
        // Header
        
        <>
            {/* // Header */}
            <div className='Header'>
                {/* //Share Tea home button */}
                {/* //Good morning text */}
                {/* //Employee Display */}
                <TopNavbar/>
                {/* <img src={logo} width={150} height={150} className="App-logo" alt="logo" /> */}
            </div>
            {/* // Side bar */}
            <div className='Maindisplay'>
            <div className='Sidebar'>
                {/* Cashier Button */}
                
                <ButtonComponent category='Cashier Home' onSelectCategory={handleSelectCategory}/>
                {/* SideNav for Manager */}
                <SideMenu categories={categories} onSelectCategory={handleSelectCategory} />
            </div>

            {/* // Main display */}
                {/* <button onClick={callAPI}>Button</button> */}
                {/* <p>{apiResponse}</p> */}
                {renderComponent()}
            </div>
                {/* //Menu, Inventory, Sales Report, Restock, Excess */}

        <AccessibilityButton/>
        <Footer/>
        </>
    );
}

export default Manager;