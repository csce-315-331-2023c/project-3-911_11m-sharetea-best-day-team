import React, { useState, useEffect } from 'react';
import Picture from '../images/accessibility-icon.png';
import '../styles/general.css';

const AccessibilityButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  };

  const handleReadPageClick = () => {
    const textToRead = document.body.innerText;
    const speech = new SpeechSynthesisUtterance(textToRead);
    window.speechSynthesis.speak(speech);
  };

  const handleStopReadingClick = () => {
    window.speechSynthesis.cancel();
  };

  const handlePauseContinueClick = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    // Load the Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Initialize the translation element when the script is loaded
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className='accessibility-container'>
        <img src={Picture} className='accessibility-button' onClick={handleButtonClick} alt="Accessibility Button" />
        {showPopup && 
          <div className='translation-popup'>
            {/* <button onClick={() => console.log('Translate to Spanish')}>Translate to Spanish</button>
            <button onClick={() => console.log('Translate to French')}>Translate to French</button>
            <button onClick={() => console.log('Translate to German')}>Translate to German</button> */}
            <button onClick={handleReadPageClick}>Read Page</button>
            <button onClick={handleStopReadingClick}>Stop Reading</button>
            <button onClick={handlePauseContinueClick}>{isPaused ? 'Continue Reading' : 'Pause Reading'}</button>
            {/* Add more translation options as needed */}
          </div>
        }
      </div>
    </>
  );
};

export default AccessibilityButton;
