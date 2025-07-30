import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SimpleApp from './SimpleApp.jsx'

console.log('main.jsx loaded');

// Add error handling for the root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding:20px;background:red;color:white;">Error: Root element not found</div>';
} else {
  console.log('Root element found, creating React app...');
  
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log('React root created, rendering app...');
    
    root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(SimpleApp)
      )
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error creating/rendering React app:', error);
    rootElement.innerHTML = '<div style="padding:20px;background:red;color:white;">Error rendering React app: ' + error.message + '</div>';
  }
}
