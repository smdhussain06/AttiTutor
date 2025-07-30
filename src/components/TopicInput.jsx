import { useState } from 'react'

const TopicInput = ({ topic, setTopic }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4">
        What would you like to learn?
      </h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter any topic (e.g., photosynthesis, calculus, machine learning...)"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200"
      />
    </div>
  )
}

export default TopicInput
