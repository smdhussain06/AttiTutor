import React, { useState } from 'react'

console.log('MinimalApp.jsx loaded');

function MinimalApp() {
  console.log('MinimalApp rendering...');
  
  const [topic, setTopic] = useState('')
  const [friends, setFriends] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newFriend, setNewFriend] = useState({ name: '', memory: '' })

  const addFriend = (e) => {
    e.preventDefault()
    if (newFriend.name.trim()) {
      setFriends([...friends, { 
        id: Date.now(), 
        name: newFriend.name.trim(), 
        memory: newFriend.memory.trim() 
      }])
      setNewFriend({ name: '', memory: '' })
      setShowForm(false)
    }
  }

  const removeFriend = (id) => {
    setFriends(friends.filter(friend => friend.id !== id))
  }

  const generateStory = () => {
    if (!topic.trim() || friends.length === 0) return

    const friend1 = friends[0]
    alert(`Story Preview: "${friend1.name}'s Guide to ${topic}" - This would normally generate a full personalized learning story using your friend's personality traits!`)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#1f2937', margin: '0 0 1rem 0', fontWeight: '300' }}>
            🎓 Atti Tutor
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.2rem' }}>
            Learn anything through stories about your friends
          </p>
          <div style={{ 
            background: '#dcfce7', 
            color: '#16a34a', 
            padding: '0.75rem', 
            borderRadius: '0.5rem', 
            marginTop: '1rem',
            fontSize: '0.9rem'
          }}>
            ✅ React app is working! Basic functionality restored.
          </div>
        </div>

        {/* Topic Input */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#374151' }}>What would you like to learn?</h3>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter any topic (e.g., photosynthesis, calculus, machine learning...)"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Friends Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: '#374151', margin: 0 }}>Your Friends ({friends.length})</h3>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                + Add Friend
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={addFriend} style={{ 
              background: '#f9fafb', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem' 
            }}>
              <input
                type="text"
                value={newFriend.name}
                onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
                placeholder="Friend's name"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem'
                }}
                required
              />
              <textarea
                value={newFriend.memory}
                onChange={(e) => setNewFriend({ ...newFriend, memory: e.target.value })}
                placeholder="Share a memory or personality trait about this friend..."
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  resize: 'vertical',
                  marginBottom: '0.5rem'
                }}
                rows={3}
              />
              <div>
                <button
                  type="submit"
                  style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    marginRight: '0.5rem'
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setNewFriend({ name: '', memory: '' })
                  }}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {friends.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
              Add some friends to create personalized learning stories!
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {friends.map((friend) => (
                <div key={friend.id} style={{
                  background: '#eff6ff',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: '#1f2937', margin: '0 0 0.5rem 0' }}>{friend.name}</h4>
                      {friend.memory && (
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                          "{friend.memory}"
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFriend(friend.id)}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                      title="Remove friend"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={generateStory}
            disabled={!topic.trim() || friends.length === 0}
            style={{
              background: !topic.trim() || friends.length === 0 ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '1.1rem',
              cursor: !topic.trim() || friends.length === 0 ? 'not-allowed' : 'pointer',
              fontWeight: '500'
            }}
          >
            Create My Learning Story! 📚
          </button>
        </div>

        <div style={{ 
          marginTop: '2rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid #e5e7eb', 
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#6b7280'
        }}>
          🔧 Minimal React version working | Full app will be restored soon
        </div>
      </div>
    </div>
  )
}

export default MinimalApp
