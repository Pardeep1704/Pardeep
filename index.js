import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your main App component

// Render your main App component into the root HTML element (usually <div id="root"></div>)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
