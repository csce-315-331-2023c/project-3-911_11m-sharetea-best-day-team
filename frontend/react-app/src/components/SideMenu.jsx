import React from 'react';
import './SideMenu.css';
import ButtonComponent from './ButtonComponent';

const SideMenu = ({ categories, onSelectCategory }) => {
  return (
    <div className="side-menu">
      {categories.map((category) => (
        <ButtonComponent category={category} onSelectCategory={onSelectCategory}/>
      ))}
    </div>
  );
};

export default SideMenu;
