import { useState } from 'react'

function App() {
  const [topic, setTopic] = useState('')
  const [friends, setFriends] = useState([])
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [newFriend, setNewFriend] = useState({ name: '', memory: '' })
  const [showApiSetup, setShowApiSetup] = useState(false)
  const [tempApiKey, setTempApiKey] = useState('')

  const clearApiKey = () => {
    localStorage.removeItem('VITE_QWEN_API_KEY')
    window.location.reload()
  }

  const handleApiKeySubmit = (e) => {
    e.preventDefault()
    if (tempApiKey.trim()) {
      // For demonstration purposes, we'll store it in localStorage
      // Note: In production, this should be handled more securely
      localStorage.setItem('VITE_QWEN_API_KEY', tempApiKey.trim())
      setTempApiKey('')
      setShowApiSetup(false)
      // Reload the page to apply the new API key
      window.location.reload()
    }
  }

  const getApiKey = () => {
    return import.meta.env.VITE_QWEN_API_KEY || localStorage.getItem('VITE_QWEN_API_KEY')
  }

  const addFriend = (e) => {
    e.preventDefault()
    if (newFriend.name.trim()) {
      setFriends([...friends, { 
        id: Date.now(), 
        name: newFriend.name.trim(), 
        memory: newFriend.memory.trim() 
      }])
      setNewFriend({ name: '', memory: '' })
      setShowAddFriend(false)
    }
  }

  const formatAIResponse = (text) => {
    // Convert markdown-style formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<div class="font-medium text-lg mb-2">$1</div>')
      .replace(/^\*\*(.*?)\*\*$/gm, '<div class="font-medium text-lg mb-2">$1</div>')
      .replace(/\n\n/g, '</div><div class="mb-4">')
      .replace(/^\s*-\s+/gm, '<div class="ml-4 mb-1">• ')
      .replace(/🎭|🗣️|🎯|💡|🎉/g, '')
  }

  const removeFriend = (id) => {
    setFriends(friends.filter(friend => friend.id !== id))
  }

  const generateLearningStory = async (topic, friends) => {
    const apiKey = getApiKey()
    
    if (apiKey) {
      try {
        const friendsDescription = friends.map(f => `${f.name}${f.memory ? ` (${f.memory})` : ''}`).join(', ')
        
        // Create a more detailed, fun system prompt
        const systemPrompt = `You are an expert educational psychologist and master storyteller who specializes in creating deeply personalized learning experiences. Your unique talent is analyzing people's personality traits and memories to create authentic, relatable analogies that feel like real-life experiences.

Your approach:
- Analyze each friend's psychological profile from their memories/traits
- Create scenarios that authentically match their personality and past experiences  
- Use psychological principles to make connections that genuinely resonate
- Write 400-600 words with rich detail and authentic dialogue
- Make explanations feel like actual events that could have realistically happened
- Remove ALL markdown formatting (**bold text**) and use HTML-style formatting instead
- Use natural conversation flow and realistic scenarios
- Include specific psychological insights about how each friend would naturally approach problems`

        // Create a detailed user prompt with multiple layers
        const userPrompt = `I need you to explain "${topic}" by creating a realistic scenario using my friends' actual personality traits and memories. Make it feel like something that could genuinely happen based on who they are psychologically.

MY FRIENDS: ${friendsDescription}

INSTRUCTIONS:
1. PSYCHOLOGICAL ANALYSIS: First, analyze each friend's personality type based on their traits/memories
2. AUTHENTIC SCENARIO: Create a realistic situation where they would naturally encounter ${topic}
3. NATURAL REACTIONS: Show how each friend would authentically respond based on their psychology
4. LEARNING JOURNEY: Use their real personalities to explain ${topic} concepts step by step
5. REALISTIC DIALOGUE: Include conversations that sound exactly like how these friends would actually talk
6. LIFE CONNECTION: Connect ${topic} to experiences that would genuinely resonate with their backgrounds

FORMATTING RULES:
- NO markdown formatting (**text**) - use regular text only
- Write 400-600 words minimum
- Make it feel like a real memory or experience
- Use authentic dialogue and realistic scenarios
- Focus on psychological accuracy over entertainment value

Create a story that feels so authentic, I could imagine it actually happening with these specific friends!`

        const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'qwen-turbo',
            messages: [
              {
                role: 'system',
                content: systemPrompt
              },
              {
                role: 'user',
                content: userPrompt
              }
            ],
            max_tokens: 1200,
            temperature: 0.9
          })
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Qwen API error:', response.status, errorText)
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()
        return data.choices[0].message.content
      } catch (error) {
        console.error('Qwen API error:', error)
        return getMockResponse(topic, friends)
      }
    } else {
      return getMockResponse(topic, friends)
    }
  }

  const getMockResponse = (topic, friends) => {
    const friend1 = friends[0]
    const friend2 = friends[1] || friends[0]
    const friend3 = friends[2] || friends[1] || friends[0]
    
    return `<div class="font-medium text-lg mb-3">${friend1.name}'s Friendship-Based Guide to ${topic}</div>

<div class="mb-4">Last week, I was hanging out with ${friend1.name}${friend1.memory ? ` (who, as you know, ${friend1.memory})` : ''} when the topic of ${topic} came up. What happened next was actually a perfect real-life demonstration of how this concept works.</div>

<div class="font-medium mb-2">The Setup Scene</div>
<div class="mb-4">We were at ${friend1.name}'s place, and ${friend1.memory ? `given their personality (${friend1.memory}), they naturally` : 'they'} started approaching ${topic} in their typical methodical way. ${friends.length > 1 ? `${friend2.name} was there too, and ${friend2.memory ? `true to their nature (${friend2.memory}), they` : 'they'} immediately had a completely different perspective.` : ''}</div>

<div class="font-medium mb-2">The Psychology Behind It</div>
<div class="mb-4">${friend1.name}'s approach to ${topic} was fascinating from a psychological standpoint. ${friend1.memory ? `Their background of ${friend1.memory} meant they naturally processed information` : 'They processed information'} in a way that actually mirrors how ${topic} fundamentally works. ${friends.length > 1 ? `Meanwhile, ${friend2.name}'s tendency to ${friend2.memory ? friend2.memory.split(' ').slice(-5).join(' ') : 'think differently'} created this interesting dynamic where they questioned every assumption.` : ''}</div>

<div class="font-medium mb-2">The Real-Life Learning Journey</div>
<div class="mb-4">What struck me was how ${friend1.name} naturally broke down ${topic} into manageable pieces - just like they handle everything in life. ${friend1.memory ? `You know how they ${friend1.memory}? Well, they applied that same logical approach here.` : 'Their methodical nature really showed.'} ${friends.length > 1 ? `${friend2.name} kept asking "but what if..." questions, which actually helped us understand the edge cases and exceptions in ${topic}.` : ''}</div>

${friends.length > 2 ? `<div class="mb-4">${friend3.name} joined the conversation later and, ${friend3.memory ? `being someone who ${friend3.memory}, they` : 'characteristically, they'} brought up practical applications that made everything click into place.</div>` : ''}

<div class="font-medium mb-2">The Breakthrough Moment</div>
<div class="mb-4">The amazing thing was watching how each friend's natural psychological tendencies actually illuminated different aspects of ${topic}. ${friend1.name}'s ${friend1.memory ? `experience with ${friend1.memory.split(' ').slice(0, 3).join(' ')}` : 'systematic thinking'} helped explain the foundational concepts, while ${friends.length > 1 ? `${friend2.name}'s ${friend2.memory ? `habit of ${friend2.memory.split(' ').slice(-3).join(' ')}` : 'questioning nature'} revealed the deeper connections.` : 'their thorough analysis revealed the deeper connections.'}</div>

<div class="font-medium mb-2">The Realistic Application</div>
<div class="mb-4">By the end of our conversation, ${topic} made perfect sense because we'd essentially lived through a real example of it. Every time I encounter ${topic} now, I think about that afternoon and how ${friend1.name}'s natural approach to problem-solving actually demonstrated the core principles. ${friends.length > 1 ? `And ${friend2.name}'s perspective reminds me to always consider the alternative viewpoints.` : ''}</div>

<div class="mb-2">This is exactly how ${topic} works in real life - different people naturally approach it from different angles, and when you combine those perspectives, you get a complete understanding that actually sticks.</div>`
  }

  const handleSubmit = async () => {
    if (!topic.trim() || friends.length === 0) return
    
    setIsLoading(true)
    setResponse('')
    
    try {
      const aiResponse = await generateLearningStory(topic, friends)
      setResponse(formatAIResponse(aiResponse))
    } catch (error) {
      console.error('Error generating story:', error)
      setResponse('Sorry, something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setTopic('')
    setFriends([])
    setResponse('')
    setShowAddFriend(false)
    setNewFriend({ name: '', memory: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-800 mb-4">
            Atti Tutor
          </h1>
          <p className="text-gray-600 text-lg">
            Learn anything through stories about your friends
          </p>
          
          {/* API Status */}
          <div className="mt-4 flex items-center justify-center gap-3">
            {getApiKey() ? (
              <>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Qwen AI Connected
                </div>
                <button
                  onClick={clearApiKey}
                  className="text-xs text-red-600 hover:text-red-800 underline"
                  title="Remove API key to show setup instructions"
                >
                  Remove API Key
                </button>
              </>
            ) : (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                Using Mock AI (Add Qwen API key for real AI)
              </div>
            )}
          </div>

          {/* API Setup Card - Only show when no API key is configured */}
          {!getApiKey() && (
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    🚀 Get Better AI Responses with Qwen API
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Currently using mock responses. For personalized, intelligent explanations powered by Qwen AI, get your free API key!
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium text-blue-600 mr-2">1.</span>
                      Visit <a href="https://dashscope.aliyun.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">DashScope by Alibaba Cloud</a>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium text-blue-600 mr-2">2.</span>
                      Create a free account and get your API key
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="font-medium text-blue-600 mr-2">3.</span>
                      Add your API key below or create <code className="bg-gray-200 px-2 py-1 rounded text-xs">.env.local</code> file with <code className="bg-gray-200 px-2 py-1 rounded text-xs">VITE_QWEN_API_KEY=your_key</code>
                    </div>
                  </div>
                  
                  {/* API Key Input Form */}
                  {showApiSetup ? (
                    <form onSubmit={handleApiKeySubmit} className="mt-4 p-4 bg-white rounded-lg border border-blue-300">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter your Qwen API Key:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value={tempApiKey}
                          onChange={(e) => setTempApiKey(e.target.value)}
                          placeholder="sk-..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          required
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowApiSetup(false)
                            setTempApiKey('')
                          }}
                          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        ⚠️ For demo purposes only. In production, use environment variables.
                      </p>
                    </form>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <a 
                        href="https://dashscope.aliyun.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        Get API Key
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <button
                        onClick={() => setShowApiSetup(true)}
                        className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        Add API Key Here
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                      <a 
                        href="https://help.aliyun.com/zh/dashscope/developer-reference/api-details" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        API Documentation
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>

        <div className="space-y-8">
          {/* Topic Input */}
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
          
          {/* Friends Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-800">
                Your Friends ({friends.length})
              </h2>
              {!showAddFriend && (
                <button
                  onClick={() => setShowAddFriend(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  + Add Friend
                </button>
              )}
            </div>

            {/* Add Friend Form */}
            {showAddFriend && (
              <form onSubmit={addFriend} className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newFriend.name}
                    onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
                    placeholder="Friend's name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    autoFocus
                    required
                  />
                  <textarea
                    value={newFriend.memory}
                    onChange={(e) => setNewFriend({ ...newFriend, memory: e.target.value.slice(0, 300) })}
                    placeholder="Share a detailed fun memory, personality trait, or characteristic about this friend (200+ characters recommended for better AI stories!)"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
                    rows={4}
                    maxLength={300}
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {newFriend.memory.length}/300 {newFriend.memory.length < 200 && newFriend.memory.length > 0 && (
                      <span className="text-amber-600">• Consider adding more details for better stories!</span>
                    )}
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
                      setShowAddFriend(false)
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
                  <div key={friend.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 transition-all duration-200 hover:shadow-md">
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
                        onClick={() => removeFriend(friend.id)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-all duration-200"
                        title="Remove friend"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center space-x-4">
            <button
              onClick={handleSubmit}
              disabled={!topic.trim() || friends.length === 0 || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating your story...' : 'Teach me!'}
            </button>
            
            {(topic || friends.length > 0 || response) && (
              <button
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Over
              </button>
            )}
          </div>

          {/* Loading Animation */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg text-gray-600 font-medium">
                  Crafting your personalized story...
                </p>
              </div>
            </div>
          )}
          
          {/* Response Card */}
          {response && !isLoading && (
            <div className="animate-fade-in">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                    💡
                  </div>
                  <h3 className="text-2xl font-medium text-gray-800">
                    Your Personalized Learning Story
                  </h3>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: response }}
                  />
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 text-center">
                    💡 This explanation was crafted using your friends as analogies to help you remember better!
                  </p>
                  {!getApiKey() && (
                    <p className="text-xs text-blue-600 text-center mt-2">
                      ⚡ Using mock responses. <a href="https://dashscope.aliyun.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">Get Qwen API key</a> for personalized AI explanations!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
