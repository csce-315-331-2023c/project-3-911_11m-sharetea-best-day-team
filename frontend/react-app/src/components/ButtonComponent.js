import React from 'react';

const ButtonComponent = ({ text, eventName, handleEvent }) => {
    const handleClick = () => {
        handleEvent(eventName);
    };

    return (
        <button onClick={handleClick}>
            {text}
        </button>
    );
}

export default ButtonComponent;