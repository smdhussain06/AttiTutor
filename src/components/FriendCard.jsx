const FriendCard = ({ friend, onRemove }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium text-gray-800 text-lg">
            {friend.name}
          </h3>
          {friend.memory && (
            <p className="text-sm text-gray-600 mt-1 italic">
              "{friend.memory}"
            </p>
          )}
        </div>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-all duration-200"
          title="Remove friend"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FriendCard
