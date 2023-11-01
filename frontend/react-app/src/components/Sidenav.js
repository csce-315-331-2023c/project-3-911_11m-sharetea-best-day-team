import React from 'react';
import ButtonComponent from './ButtonComponent';

const SideNav = () => {
    const handleEvent = (eventName) => {
        alert(`Event ${eventName} was triggered!`);
    };

    return (
        <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>
            <ButtonComponent text="Home" eventName="HomeClick" handleEvent={handleEvent} />
            <ButtonComponent text="About" eventName="AboutClick" handleEvent={handleEvent} />
            <ButtonComponent text="Contact" eventName="ContactClick" handleEvent={handleEvent} />
            <ButtonComponent text="Profile" eventName="ProfileClick" handleEvent={handleEvent} />
        </div>
    );
}

export default SideNav;