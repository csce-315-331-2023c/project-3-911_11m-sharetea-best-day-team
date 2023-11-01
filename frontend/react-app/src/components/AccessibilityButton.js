import React from 'react';
import Picture from '../images/accessibility-icon.png'
import '../styles/general.css'

const AccessibilityButton = () => {
    return (
        <>
        <div className='accessibility-container'>
            <img src={Picture} className='accessibility-button'></img>
        </div>
        </>
    )
}

export default AccessibilityButton;