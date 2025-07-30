// AI Service - handles all AI-related functionality
// This can be easily extended to use a real API like OpenAI

const AI_CONFIG = {
  // Add your API key here when ready
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || null,
  baseUrl: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-3.5-turbo',
}

// Mock AI response function - replace with actual API call
export const generateLearningStory = async (topic, friends) => {
  // If API key is available, use real AI (placeholder for future implementation)
  if (AI_CONFIG.apiKey) {
    return await callOpenAI(topic, friends)
  }
  
  // Otherwise, use mock response
  return await getMockResponse(topic, friends)
}

// Mock response generator with various templates
const getMockResponse = async (topic, friends) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const templates = [
        generateAnalogyTemplate,
        generateStoryTemplate,
        generateProjectTemplate,
      ]
      
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
      const response = randomTemplate(topic, friends)
      resolve(response)
    }, 1500 + Math.random() * 1000) // Random delay between 1.5-2.5 seconds
  })
}

// Template 1: Analogy-based explanation
const generateAnalogyTemplate = (topic, friends) => {
  const friend1 = friends[0]
  const friend2 = friends[1] || friends[0]
  
  return `Understanding ${topic} is like organizing the perfect group project with ${friends.map(f => f.name).join(', ')}!

🎯 **The Setup**
Imagine ${friend1.name}${friend1.memory ? ` (who ${friend1.memory})` : ''} is the team leader. Just like how ${friend1.name} approaches things, ${topic} has a systematic way of working.

🔄 **The Process**
${friend2.name}${friend2.memory ? ` (${friend2.memory})` : ''} would probably break this down step by step - and that's exactly how ${topic} works! Each component builds on the previous one, just like how ${friend2.name} tackles challenges.

💡 **The Result**
When ${friends.map(f => f.name).slice(0, 2).join(' and ')} work together, they create something amazing. Similarly, when you understand the key principles of ${topic}, everything clicks into place!

Remember: Every time you think about ${topic}, picture ${friend1.name}'s approach - it'll help the concepts stick!`
}

// Template 2: Story-based explanation
const generateStoryTemplate = (topic, friends) => {
  const mainFriend = friends[0]
  
  return `📚 **${mainFriend.name}'s Guide to ${topic}**

Once upon a time, ${mainFriend.name}${mainFriend.memory ? ` (who ${mainFriend.memory})` : ''} decided to explain ${topic} to everyone...

"Think of it this way," ${mainFriend.name} said, "${topic} is like ${getRandomAnalogy(topic)}."

${friends.length > 1 ? `${friends[1].name} chimed in: "Oh, like when we ${getRandomScenario()}!"` : ''}

The key insight? Just like ${mainFriend.name} always says, break it down into pieces:
• Start with the basics (like ${mainFriend.name} always does)
• Build understanding step by step
• Connect it to what you already know

${friends.length > 2 ? `And as ${friends[2].name} would add: "Practice makes it stick!"` : ''}

Now whenever you encounter ${topic}, you'll hear ${mainFriend.name}'s voice guiding you through it!`
}

// Template 3: Project-based explanation
const generateProjectTemplate = (topic, friends) => {
  return `🚀 **Team ${friends.map(f => f.name).join(' & ')}: ${topic} Edition**

Your friends just got assigned a project on ${topic}. Here's how they'd tackle it:

**Planning Phase (Led by ${friends[0].name})**
${friends[0].name}${friends[0].memory ? ` (${friends[0].memory})` : ''} would start by mapping out all the key concepts. Just like their usual approach, they'd break ${topic} into manageable chunks.

${friends.length > 1 ? `**Research Phase (${friends[1].name}'s Specialty)**
${friends[1].name}${friends[1].memory ? ` (${friends[1].memory})` : ''} would dive deep into understanding how each part connects to the whole.` : ''}

${friends.length > 2 ? `**Implementation (${friends[2].name}'s Turn)**
${friends[2].name} would focus on practical applications and real-world examples.` : ''}

**The Final Presentation**
Together, they'd show how ${topic} is really just a set of interconnected ideas that make perfect sense when you see the big picture.

The secret? Think like your friends: ${friends[0].name}'s organization, ${friends[1]?.name ? `${friends[1].name}'s curiosity, ` : ''}and your own unique perspective!`
}

// Helper functions for generating random content
const getRandomAnalogy = (topic) => {
  const analogies = [
    'a recipe where each ingredient has a specific role',
    'a puzzle where every piece fits perfectly',
    'a dance where each step leads naturally to the next',
    'a story where each chapter builds on the last',
    'a game where you level up by mastering each skill',
  ]
  return analogies[Math.floor(Math.random() * analogies.length)]
}

const getRandomScenario = () => {
  const scenarios = [
    'worked on that group presentation',
    'figured out that tricky problem together',
    'planned our last adventure',
    'organized that memorable event',
    'solved that challenging puzzle',
  ]
  return scenarios[Math.floor(Math.random() * scenarios.length)]
}

// Future: Real OpenAI API integration
const callOpenAI = async (topic, friends) => {
  const prompt = createPrompt(topic, friends)
  
  try {
    const response = await fetch(AI_CONFIG.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: 'You are a creative educator who explains complex topics using personalized analogies based on the user\'s friends and their characteristics. Make explanations engaging, memorable, and fun.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })
    
    if (!response.ok) {
      throw new Error('API request failed')
    }
    
    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('OpenAI API error:', error)
    // Fallback to mock response
    return await getMockResponse(topic, friends)
  }
}

const createPrompt = (topic, friends) => {
  const friendsDescription = friends.map(friend => 
    `${friend.name}${friend.memory ? ` (${friend.memory})` : ''}`
  ).join(', ')
  
  return `Explain "${topic}" using creative analogies that involve these friends: ${friendsDescription}. 
  
  Make the explanation:
  - Fun and memorable
  - Use the friends' characteristics naturally
  - Feel like an inside joke that helps learning
  - About 200-300 words
  - Include specific examples
  
  Topic to explain: ${topic}
  Friends to reference: ${friendsDescription}`
}

export { generateLearningStory }
