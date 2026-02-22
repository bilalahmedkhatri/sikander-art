import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Only attempt to mount React if the 'root' element exists
// This allows the static index.html to function without console errors
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log('Running in static mode: React root not found.');
}