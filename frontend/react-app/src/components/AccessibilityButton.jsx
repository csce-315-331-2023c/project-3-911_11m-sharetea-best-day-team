import React, { useEffect, useState } from 'react';
import Picture from '../images/accessibility-icon.png'
import '../styles/general.css'

/**
 * AccessibilityButton component.
 * This component provides accessibility features such as font size adjustment, high contrast mode, and magnifier.
 *
 * @author David Roh, Amber Cheng, Sean Caballa
 * @returns {JSX.Element} The rendered AccessibilityButton component.
 * @component
 * @example
 * return (
 *   <AccessibilityButton />
 * )
 */
const AccessibilityButton = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [fontSize, setFontSize] = useState(100);
    const [highContrast, setHighContrast] = useState(false);
    const [magnifier, setMagnifier] = useState(null);
    const [isInverted, setIsInverted] = useState(false);


    const increaseFontSize = () => setFontSize((size) => size + 10);
    const decreaseFontSize = () => setFontSize((size) => size > 100 ? size - 10 : 100);
    const toggleHighContrast = () => setHighContrast((contrast) => !contrast);
    const toggleInvertColors = () => setIsInverted((invert) => !invert);

    useEffect(() => {
      if (isInverted) {
        document.body.classList.add('invert-colors');
      } else {
        document.body.classList.remove('invert-colors');
      }
    }, [isInverted]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/html-magnifier.js'; // Update the path to where you've placed the html-magnifier.js
        script.async = true;
        script.onload = () => {
          if (typeof window.HTMLMagnifier === 'function') {
            setMagnifier(new window.HTMLMagnifier({
              zoom: 2,
              shape: 'circle',
              width: 200,
              height: 200
            }));
          } else {
            console.error('HTMLMagnifier is not defined on the window object.');
          }
        };
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
      /**
       * Toggles the visibility of the magnifier.
       */
      const handleMagnifierToggle = () => {
        if (magnifier) {
          magnifier.isVisible() ? magnifier.hide() : magnifier.show();
        }
      };

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

    /**
     * Handles the button click event.
     */
    const handleButtonClick = () => {
      setShowPopup(!showPopup);
    }

    /**
     * Handles the click event for the "Read Page" button.
     * Reads the entire text content of the page using the SpeechSynthesis API.
     */
    const handleReadPageClick = () => {
      const textToRead = document.body.innerText;
      const speech = new SpeechSynthesisUtterance(textToRead);
      window.speechSynthesis.speak(speech);
    }

    /**
     * Handles the click event for stopping the speech synthesis.
     */
    const handleStopReadingClick = () => {
      window.speechSynthesis.cancel();
    }

    /**
     * Handles the click event for pausing or continuing speech synthesis.
     */
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
            <img src={Picture} className='accessibility-button' onClick={handleButtonClick} alt='accessibility button'/>
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
                    <button onClick={handleMagnifierToggle}>Magnifier</button>
                    <button onClick={toggleInvertColors}>Invert Colors</button>
                </div>
            }
        </div>
        
        </>
    )
}

export default AccessibilityButton;