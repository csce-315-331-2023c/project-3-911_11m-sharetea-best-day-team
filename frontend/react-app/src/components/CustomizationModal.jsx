import React from 'react';
import './CustomizationModal.css';

const CustomizationModal = ({ drink, onClose }) => {
  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{drink.name}</h2>
        {/* Your customization options go here */}
        <button onClick={onClose}>Done</button>
      </div>
    </div>
  );
};

export default CustomizationModal;
