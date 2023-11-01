import React from 'react';
import './CustomizationModal.css';

const CustomizationModal = ({ drink, onClose }) => {
  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{drink.name}</h2>
        {/* Your customization options go here */}

        <div className="ice-buttons-container">
          <h3>Ice Level</h3>
          <button>Normal Ice</button>
          <button>Less Ice</button>
          <button>No Ice</button>
          <br></br>
          <button>Extra Ice</button>
        </div>

        <div className="sweetness-buttons-container">
          <h3>Sweetness Level</h3>
          <button>100%</button>
          <button>80%</button>
          <button>50%</button>
          <br></br>
          <button>30%</button>
          <button>0%</button>
          <button>120%</button>
        </div>

        <div className="toppings-buttons-container">
          <h3>Toppings</h3>
          <button>Pearl</button>
          <button>Mini Pearl</button>
          <button>Ice Cream</button>
          <br></br>
          <button>Pudding</button>
          <button>Aloe Vera</button>
          <button>Red Bean</button>
          <br></br>
          <button>Herb Jelly</button>
          <button>Aiyu Jelly</button>
          <button>Lychee Jelly</button>
          <br></br>
          <button>Crystal Boba</button>
          <button>Creama</button>
        </div>

        <br></br>
        <button onClick={onClose}>Done</button>
      </div>
    </div>
  );
};

export default CustomizationModal;
