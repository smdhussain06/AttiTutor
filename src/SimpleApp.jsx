import React from 'react'

console.log('SimpleApp.jsx loaded');

function SimpleApp() {
  console.log('SimpleApp rendering...');
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#1f2937',
          marginBottom: '1rem',
          fontWeight: '300'
        }}>
          🎓 Atti Tutor
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '1.1rem',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Learn anything through stories about your friends
        </p>
        <div style={{
          background: '#f3f4f6',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{
            color: '#374151',
            fontSize: '0.9rem',
            margin: 0
          }}>
            ✅ React is working correctly!<br/>
            🔧 Full app will be restored once the issue is resolved.
          </p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#2563eb'}
          onMouseOut={(e) => e.target.style.background = '#3b82f6'}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

export default SimpleApp;
