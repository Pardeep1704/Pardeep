import React, { useState } from 'react';
import './App.css';
import rupay from './rupay.png';
import visa from './Visa-Logo-2006.png';
import mastercard from './MasterCard_Logo.svg.png';
import americanexpress from './images.png';

function App() {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvv, setCVV] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [cardType, setCardType] = useState('');

  const addCard = () => {
    // Clear previous messages
    setSuccessMessage('');
    setCardType('');

    // Basic input validation
    if (!cardholderName.trim()) {
      alert('Name is required.');
      return;
    }

    if (!cardNumber.trim() || isNaN(cardNumber) || cardNumber.length !== 16) {
      alert('Valid 16-digit card number is required.');
      return;
    }

    if (isNaN(month) || month < 1 || month > 12) {
      alert('Valid month is required.');
      return;
    }

    if (!year.trim() || isNaN(year)) {
      alert('Valid year is required.');
      return;
    }

    if (!cvv.trim() || isNaN(cvv) || cvv.length !== 3) {
      alert('Valid CVV is required.');
      return;
    }

    // Detect card type
    const detectedCardType = detectCardType(cardNumber);
    setCardType('Card Type: ' + detectedCardType);

    // Display success message
    setSuccessMessage('Card added successfully');
  };

  const detectCardType = (cardNumber) => {
    const visaPattern = /^4/;
    const mastercardPattern = /^5[1-5]/;
    const amexPattern = /^3[47]/;
    const discoverPattern = /^6(?:011|5)/;

    if (visaPattern.test(cardNumber)) {
      return 'Visa';
    } else if (mastercardPattern.test(cardNumber)) {
      return 'MasterCard';
    } else if (amexPattern.test(cardNumber)) {
      return 'American Express';
    } else if (discoverPattern.test(cardNumber)) {
      return 'Discover';
    } else {
      return 'Unknown';
    }
  };

  const toggleCVVVisibility = () => {
    const cvvInput = document.getElementById('cvv');

    if (cvvInput.type === 'password') {
      cvvInput.type = 'text';
    } else {
      cvvInput.type = 'password';
    }
  };
  const formatCardNumber = (e) => {
    let cardNumber = e.target.value.replace(/\s/g, ''); // Remove spaces
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 '); // Add a space after every 4 digits
    if (cardNumber.length <= 19) {
      setCardNumber(cardNumber.trim()); // Remove trailing space and enforce 16 digits
    }
  };
  
  
  
return (
    <div className="payment-div">
      <h1>Add a new card</h1>
      <p className="success-message" id="success-message">
        {successMessage}
      </p>
      <div className="payment-options">
        <h4>We Accept</h4>
        <img src={rupay} alt="Rupay" />
        <img src={visa} alt="Visa" />
        <img src={mastercard} alt="MasterCard" />
        <img src={americanexpress} alt="American Express" />
      </div>
      <form>
        <label htmlFor="cardholder-name">Card Holder Name *</label>
        <input
          type="text"
          id="cardholder-name"
          placeholder="John Smith"
          required
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
        />
        <p className="error-message" id="name-error"></p>

        <label htmlFor="card-number">Card Number *</label>
        <input
           type="text"
             id="card-number"
             placeholder="XXXX XXXX XXXX XXXX"
              maxLength="19" // Maximum length including spaces
              onInput={formatCardNumber}
                  required
             value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
/>

        <p className="card-type">{cardType}</p>
        <p className="error-message" id="card-number-error"></p>

        <div className="input-group">
          <label htmlFor="month">Month *</label>
          <input
            type="number"
            id="month"
            placeholder="MM"
            min="1"
            max="12"
            required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <p className="error-message" id="month-error"></p>
        </div>

        <div className="input-group">
          <label htmlFor="year">Year *</label>
          <input
            type="number"
            id="year"
            placeholder="YYYY"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <p className="error-message" id="year-error"></p>
        </div>

        <div className="cvv-input-container">
          <label htmlFor="cvv">CVV *</label>
          <input
            type="password"
            id="cvv"
            placeholder="123"
            minLength="3"
            maxLength="3"
            required
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
          />
          <i className="cvv-icon fas fa-eye" onClick={toggleCVVVisibility}></i>
          <p className="error-message" id="cvv-error"></p>
        </div>
        <button type="button" onClick={addCard}>
          Add Card
        </button>
      </form>
    </div>
  );
}

export default App;
