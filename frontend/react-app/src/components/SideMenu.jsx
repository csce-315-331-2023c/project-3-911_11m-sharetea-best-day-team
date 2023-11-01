import React from 'react';
import './SideMenu.css';

const SideMenu = ({ categories, onSelectCategory }) => {
  return (
    <div className="side-menu">
      {categories.map((category) => (
        <button
          key={category}
          className="category-button"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
