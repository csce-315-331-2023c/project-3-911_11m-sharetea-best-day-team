import React, { useEffect, useState } from 'react';
import Picture from '../images/accessibility-icon.png'
import '../styles/general.css'

const AccessibilityButton = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [fontSize, setFontSize] = useState(100);
    const [highContrast, setHighContrast] = useState(false);

    const increaseFontSize = () => setFontSize((size) => size + 10);
    const decreaseFontSize = () => setFontSize((size) => size > 100 ? size - 10 : 100);
    const toggleHighContrast = () => setHighContrast((contrast) => !contrast);

    useEffect(() => {
        // Apply the font size to the root element
        // document.documentElement.style.fontSize = `${fontSize}%`;
        document.documentElement.style.setProperty('--global-font-size', `${fontSize}%`);

        // Apply or remove high contrast mode
        if (highContrast) {
        document.body.classList.add('high-contrast');
        } else {
        document.body.classList.remove('high-contrast');
        }
    }, [fontSize, highContrast]);

    const handleButtonClick = () => {
        setShowPopup(!showPopup);
    }

    const handleReadPageClick = () => {
        const textToRead = document.body.innerText;
        const speech = new SpeechSynthesisUtterance(textToRead);
        window.speechSynthesis.speak(speech);
    }

    const handleStopReadingClick = () => {
        window.speechSynthesis.cancel();
    }

    const handlePauseContinueClick = () => {
        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        } else {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    }

    return (
        <>
        <div className='accessibility-container'>
            <img src={Picture} className='accessibility-button' onClick={handleButtonClick}></img>
            {showPopup && 
                <div className='translation-popup'>
                    {/* <button onClick={() => console.log('Translate to Spanish')}>Translate to Spanish</button>
                    <button onClick={() => console.log('Translate to French')}>Translate to French</button>
                    <button onClick={() => console.log('Translate to German')}>Translate to German</button> */}
                    <button onClick={handleReadPageClick}>Read Page</button>
                    <button onClick={handleStopReadingClick}>Stop Reading</button>
                    <button onClick={handlePauseContinueClick}>{isPaused ? 'Continue Reading' : 'Pause Reading'}</button>
                    <div className="font-size-container">
                        <button onClick={increaseFontSize}>A+</button>
                        <button onClick={decreaseFontSize}>A-</button>
                    </div>
                    <button onClick={toggleHighContrast}>High Contrast</button>
                </div>
            }
        </div>
        
        </>
    )
}

export default AccessibilityButton;