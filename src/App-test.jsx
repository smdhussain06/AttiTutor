import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Nostalgic Tutor
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Learn anything through stories about your friends
        </p>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Enter a topic to learn..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors">
            Test Button
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
