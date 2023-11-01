import React, { useState } from 'react';
import ButtonComponent from "../components/ButtonComponent";
import SideMenu from "../components/SideMenu";
import logo from '../logo.svg';

function Manager() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const categories = ['Inventory', 'Sales', 'Restock', 'Excess', 'Inventory'];

    return (
        // Header
        <>
            {/* // Header */}
            <div className='Header'>
                {/* //Share Tea home button */}
                {/* //Good morning text */}
                {/* //Employee Display */}
                <img src={logo} width={150} height={150} className="App-logo" alt="logo" />
            </div>
            {/* // Side bar */}
            <div className='Sidebar'>
                {/* Cashier Button */}
                
                <ButtonComponent category='Cashier Home' onSelectCategory={handleSelectCategory}/>
                {/* SideNav for Manager */}
                <SideMenu categories={categories} onSelectCategory={handleSelectCategory} />
            </div>

            {/* // Main display */}
            {/* <div className='Maindisplay'>
                
            <div/> */}
                {/* //Menu, Inventory, Sales Report, Restock, Excess */}

        {/* // Footer */}
            {/* //Accessibility */}
        </>
    );
}

export default Manager;