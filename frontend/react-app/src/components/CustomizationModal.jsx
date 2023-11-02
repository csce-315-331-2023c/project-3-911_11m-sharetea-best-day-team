import React from 'react';
import './CustomizationModal.css';

const CustomizationModal = ({ drink, onClose }) => {
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
              <button>Normal Ice</button>
              <button>Less Ice</button>
              <button>No Ice</button>
            </div>
            <div className="container-row">
              <button>Extra Ice</button>
            </div>
          </div>

          <div className="sweetness-buttons-container">
            <div className="container-row">
              <h3>Sweetness Level</h3>
            </div>
            <div className="container-row">
              <button>100%</button>
              <button>80%</button>
              <button>50%</button>
            </div>
            <div className="container-row">
              <button>30%</button>
              <button>0%</button>
              <button>120%</button>
            </div>
          </div>

          <div className="toppings-buttons-container">
            <div className="container-row">
              <h3>Toppings</h3>
            </div>
            <div className="container-row">
              <button>Pearl</button>
              <button>Mini Pearl</button>
              <button>Ice Cream</button>
            </div>
            <div className="container-row">
              <button>Pudding</button>
              <button>Aloe Vera</button>
              <button>Red Bean</button>
            </div>
            <div className="container-row">
              <button>Herb Jelly</button>
              <button>Aiyu Jelly</button>
              <button>Lychee Jelly</button>
            </div>
            <div className="container-row">
              <button>Crystal Boba</button>
              <button>Creama</button>
            </div>
          </div>

          <br></br>

        </div>

        <button onClick={onClose}>Done</button>
      </div>
    </div>
  );
};

export default CustomizationModal;
