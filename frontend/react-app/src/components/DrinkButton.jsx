// DrinkButton.jsx
import React from 'react';

const DrinkButton = ({ imageUrl, label, onClick }) => {
  return (
    <div className="drink-button" onClick={onClick}>
      <img src={imageUrl} alt={label} className="drink-image" />
      <p className="drink-label">{label}</p>
    </div>
  );
}

export default DrinkButton;
