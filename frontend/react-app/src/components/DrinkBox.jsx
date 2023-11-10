import React from 'react';

const Drink = ({ name, description, onClick }) => {
  return (
    <div className="drink" onClick={onClick}>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Drink;
