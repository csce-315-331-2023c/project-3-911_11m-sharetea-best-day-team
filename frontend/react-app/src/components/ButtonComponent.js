import React from 'react';

const ButtonComponent = ({category,onSelectCategory}) => {
    return (
        <button
          key={category}
          className="category-button"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
    );
}

export default ButtonComponent;