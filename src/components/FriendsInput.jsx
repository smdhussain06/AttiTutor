// This component was replaced by FriendList.jsx for better modularity
// FriendList handles both displaying friends and adding new ones
// Keeping this file for reference or future use

import { useState } from 'react'

const FriendsInput = ({ onAddFriend }) => {
  const [friend, setFriend] = useState({ name: '', memory: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (friend.name.trim()) {
      onAddFriend(friend)
      setFriend({ name: '', memory: '' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={friend.name}
        onChange={(e) => setFriend({ ...friend, name: e.target.value })}
        placeholder="Friend's name"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="text"
        value={friend.memory}
        onChange={(e) => setFriend({ ...friend, memory: e.target.value.slice(0, 50) })}
        placeholder="Optional: A fun memory or trait (50 chars max)"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        maxLength={50}
      />
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-colors duration-200"
      >
        Add Friend
      </button>
    </form>
  )
}

export default FriendsInput