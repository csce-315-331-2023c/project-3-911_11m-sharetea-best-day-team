import React, { useState, useEffect } from 'react';
import ButtonComponent from "../components/ButtonComponent";
import SideMenu from "../components/SideMenu";
import TopNavbar from "../components/TopNavbar"
import DatabaseTable from '../components/DatabaseTable';
import logo from '../logo.svg';
import './Manger.css';

function Manager() {
    // const [apiResponse, setApiResponse] = useState(null);

    // const callAPI = () => {
    //     fetch("http://localhost:9000/route")
    //     .then(res => res.text())
    //     .then(res => setApiResponse(res));
    // };

    // useEffect(() => {
    //     callAPI();
    // }, []);

    const [selectedCategory, setSelectedCategory] = useState(null);

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
                <DatabaseTable query="SELECT * FROM pricelist;"/>
            </div>
                {/* //Menu, Inventory, Sales Report, Restock, Excess */}

        {/* // Footer */}
            {/* //Accessibility */}
        </>
    );
}

export default Manager;