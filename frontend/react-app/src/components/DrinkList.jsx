import React from 'react';
import './DrinkList.css';

const DrinkList = ({ drinks, onSelectDrink }) => {
  return (
    <div className="drink-list">
      {drinks.map((drink) => (
        <button
          key={drink.name}
          className="drink-button"
          onClick={() => onSelectDrink(drink)}
        >
          <img src={drink.imageUrl} alt={drink.name} />
          <div>{drink.name}</div> {}
        </button>
      ))}
    </div>
  );
};


export default DrinkList;
