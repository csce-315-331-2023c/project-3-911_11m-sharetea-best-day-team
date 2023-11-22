import React, { useState, useEffect } from 'react';
import ButtonComponent from "../components/ButtonComponent";
import SideMenu from "../components/SideMenu";
import TopNavbar from "../components/TopNavbar"
import DatabaseTable from '../components/DatabaseTable';
import Inventory from '../components/Inventory';
import Menu from '../components/Menu';
import logo from '../logo.svg';
import './Manger.css';

function Manager() {

    const [selectedCategory, setSelectedCategory] = useState('Inventory');

    const renderComponent = () => {
        switch (selectedCategory) {
        case 'Inventory':
            return <Inventory />;
        // case 'Excess':
        //     return <Excess />;
        // case 'Restock':
        //     return <Restock />;
        case 'Menu':
            return <Menu />;
        // case 'Sales':
        //     return <Sales />;
        default:
            return <Inventory />;
        }
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const categories = ['Inventory', 'Sales', 'Restock', 'Excess', 'Menu'];

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

        {/* // Footer */}
            {/* //Accessibility */}
        </>
    );
}

export default Manager;