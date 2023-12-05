import React from 'react';

/**
 * Button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.category - The category of the button.
 * @param {Function} props.onSelectCategory - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered button component.
 */
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