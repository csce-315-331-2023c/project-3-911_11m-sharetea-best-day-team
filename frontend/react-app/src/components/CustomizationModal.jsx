// import React from 'react';
import React, { useState } from 'react';
import './CustomizationModal.css';

const CustomizationModal = ({ drink, onClose }) => {
  const [selectedIce, setSelectedIce] = useState('normal'); 
  const [selectedSweetness, setSelectedSweetness] = useState('100%'); 
  const [selectedToppings, setSelectedToppings] = useState([]);


  const handleIceButtonClick = (iceLevel) => {
    setSelectedIce(iceLevel);
  };

  const handleSweetnessButtonClick = (sweetnessLevel) => {
    setSelectedSweetness(sweetnessLevel);
  };

  const handleToppingsButtonClick = (topping) => {
    // Check if the topping is already selected
    if (selectedToppings.includes(topping)) {
      // If selected, remove it from the list
      setSelectedToppings(selectedToppings.filter((top) => top !== topping));
    } else {
      // If not selected, add it to the list
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>x</button>
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <h2>{drink.name}</h2>
        
        <div className="button-section">
          <div className="ice-buttons-container">
            <div className="container-row">
              <h3>Ice Level</h3>
            </div>
            <div className="container-row">
              <button className={selectedIce === 'normal' ? 'selected' : ''} onClick={() => handleIceButtonClick('normal')}>Normal Ice</button>
              <button className={selectedIce === 'less' ? 'selected' : ''} onClick={() => handleIceButtonClick('less')}>Less Ice</button>
              <button className={selectedIce === 'none' ? 'selected' : ''} onClick={() => handleIceButtonClick('none')}>No Ice</button>
            </div>
            <div className="container-row">
              <button className={selectedIce === 'extra' ? 'selected' : ''} onClick={() => handleIceButtonClick('extra')}>Extra Ice</button>
            </div>
          </div>

          <div className="sweetness-buttons-container">
            <div className="container-row">
              <h3>Sweetness Level</h3>
            </div>
            <div className="container-row">
              <button className={`sweetness-button ${selectedSweetness === '100%' ? 'selected' : ''}`} onClick={() => handleSweetnessButtonClick('100%')}>100%</button>
              <button className={`sweetness-button ${selectedSweetness === '80%' ? 'selected' : ''}`}onClick={() => handleSweetnessButtonClick('80%')}>80%</button>
              <button className={`sweetness-button ${selectedSweetness === '50%' ? 'selected' : ''}`}onClick={() => handleSweetnessButtonClick('50%')}>50%</button>
            </div>
            <div className="container-row">
              <button className={`sweetness-button ${selectedSweetness === '30%' ? 'selected' : ''}`}onClick={() => handleSweetnessButtonClick('30%')}>30%</button>
              <button className={`sweetness-button ${selectedSweetness === '0%' ? 'selected' : ''}`}onClick={() => handleSweetnessButtonClick('0%')}>0%</button>
              <button className={`sweetness-button ${selectedSweetness === '120%' ? 'selected' : ''}`}onClick={() => handleSweetnessButtonClick('120%')}>120%</button>
            </div>
          </div>

          <div className="toppings-buttons-container">
            <div className="container-row">
              <h3>Toppings</h3>
            </div>
            <div className="container-row">
              <button className={`topping-button ${selectedToppings.includes('Pearl') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Pearl')}>Pearl</button>
              <button className={`topping-button ${selectedToppings.includes('Mini Pearl') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Mini Pearl')}>Mini Pearl</button>
              <button className={`topping-button ${selectedToppings.includes('Ice Cream') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Ice Cream')}>Ice Cream</button>
            </div>
            <div className="container-row">
              <button className={`topping-button ${selectedToppings.includes('Pudding') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Pudding')}>Pudding</button>
              <button className={`topping-button ${selectedToppings.includes('Aloe Vera') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Aloe Vera')}>Aloe Vera</button>
              <button className={`topping-button ${selectedToppings.includes('Red Bean') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Red Bean')}>Red Bean</button>
            </div>
            <div className="container-row">
              <button className={`topping-button ${selectedToppings.includes('Herb Jelly') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Herb Jelly')}>Herb Jelly</button>
              <button className={`topping-button ${selectedToppings.includes('Aiyu Jelly') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Aiyu Jelly')}>Aiyu Jelly</button>
              <button className={`topping-button ${selectedToppings.includes('Lychee Jelly') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Lychee Jelly')}>Lychee Jelly</button>
            </div>
            <div className="container-row">
              <button className={`topping-button ${selectedToppings.includes('Crystal Boba') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Crystal Boba')}>Crystal Boba</button>
              <button className={`topping-button ${selectedToppings.includes('Creama') ? 'selected' : ''}`}onClick={() => handleToppingsButtonClick('Creama')}>Creama</button>
            </div>
          </div>

          <br></br>

        </div>
        <div className="done-container">
          <button onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
