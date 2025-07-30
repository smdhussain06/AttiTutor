import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MinimalApp from './MinimalApp.jsx'

console.log('main.jsx loaded');

// Add comprehensive error handling
window.addEventListener('error', (event) => {
  console.error('Global JS Error:', event);
  showError(`JavaScript Error: ${event.error?.message || 'Unknown error'}`);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event);
  showError(`Promise Error: ${event.reason}`);
});

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #dc2626;
    color: white;
    padding: 1rem;
    z-index: 10000;
    font-family: monospace;
    font-size: 14px;
  `;
  errorDiv.innerHTML = `
    <strong>🚨 Error Detected:</strong> ${message}
    <button onclick="this.parentElement.remove()" style="float: right; background: rgba(255,255,255,0.2); border: none; color: white; padding: 0.25rem 0.5rem; border-radius: 3px; cursor: pointer;">×</button>
  `;
  document.body.appendChild(errorDiv);
}

// Add error handling for the root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  showError('Root element not found in DOM');
} else {
  console.log('Root element found, creating React app...');
  
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log('React root created, rendering app...');
    
    root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(MinimalApp)
      )
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error creating/rendering React app:', error);
    showError(`React Render Error: ${error.message}`);
    
    // Fallback to simple content
    rootElement.innerHTML = `
      <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-family: system-ui;">
        <div style="background: white; padding: 2rem; border-radius: 1rem; max-width: 500px; text-align: center;">
          <h1>🎓 Atti Tutor</h1>
          <p style="color: #dc2626; margin: 1rem 0;">React app failed to load</p>
          <pre style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; font-size: 0.8rem; text-align: left;">${error.message}</pre>
          <button onclick="window.location.reload()" style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; cursor: pointer;">Reload</button>
        </div>
      </div>
    `;
  }
}
