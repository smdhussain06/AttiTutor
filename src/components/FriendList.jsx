import { useState } from 'react'
import FriendCard from './FriendCard'

const FriendList = ({ friends, onAddFriend, onRemoveFriend }) => {
  const [newFriend, setNewFriend] = useState({ name: '', memory: '' })
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newFriend.name.trim()) {
      onAddFriend(newFriend)
      setNewFriend({ name: '', memory: '' })
      setIsAdding(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-800">
          Your Friends ({friends.length})
        </h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            + Add Friend
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="space-y-3">
            <input
              type="text"
              value={newFriend.name}
              onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
              placeholder="Friend's name"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              autoFocus
            />
            <input
              type="text"
              value={newFriend.memory}
              onChange={(e) => setNewFriend({ ...newFriend, memory: e.target.value.slice(0, 50) })}
              placeholder="Optional: A fun memory or trait (50 chars max)"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              maxLength={50}
            />
            <div className="text-xs text-gray-500 text-right">
              {newFriend.memory.length}/50
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false)
                setNewFriend({ name: '', memory: '' })
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {friends.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Add some friends to create personalized learning stories!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onRemove={() => onRemoveFriend(friend.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FriendList
