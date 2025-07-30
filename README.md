# 🎓 Atti Tutor

A friendship-based personalized learning app that uses your friends' personalities and memories to create engaging, memorable explanations for any topic.

## ✨ Features

- **Friendship-Based Learning**: Uses your friends' personalities and memories to create relatable analogies
- **Psychology-Based AI**: Creates authentic scenarios that match your friends' psychological profiles
- **Any Topic**: Learn anything from quantum physics to cooking techniques
- **Beautiful UI**: Clean, modern interface inspired by Google Pixel design
- **AI Integration**: Powered by Qwen AI for intelligent, context-aware explanations
- **Mobile Responsive**: Works perfectly on all devices
- **Mobile-First**: Fully responsive design optimized for all devices
- **Extensible**: Modular code structure ready for API integration

## 🚀 Tech Stack

- **React 19** with hooks (useState, useEffect)
- **Vite** for fast development and building
- **Tailwind CSS** for styling and responsive design
- **Modular Architecture** with reusable components

## 📱 Components

- `TopicInput` - Input field for learning topics
- `FriendList` - Manages adding and displaying friends
- `FriendCard` - Individual friend display with memory
- `ResponseCard` - Animated display of AI-generated stories
- `LoadingSpinner` - Beautiful loading animation

## 🎨 Design Philosophy

Inspired by Google Pixel's material design:
- White backgrounds with subtle shadows
- Smooth transitions and animations
- Rounded cards and touch-friendly elements
- Clean typography and spacious layout
- Fade-in and slide-up animations

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nostalgictutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 🤖 AI Integration

The app currently uses mock responses but is prepared for real AI integration:

### Current Setup (Mock)
- Multiple response templates for variety
- Realistic delays and loading states
- Error handling and fallbacks

### Future Setup (Real AI)
1. **Add your OpenAI API key**
   ```bash
   cp .env.example .env
   # Add your API key to .env
   REACT_APP_OPENAI_API_KEY=your_key_here
   ```

2. **The AI service will automatically use the real API** when a key is detected

### Supported AI Features
- Topic explanation using friend analogies
- Creative storytelling with personal connections
- Multiple explanation templates
- Graceful fallback to mock responses

## 📁 Project Structure

```
src/
├── components/
│   ├── TopicInput.jsx      # Topic input field
│   ├── FriendList.jsx      # Friend management
│   ├── FriendCard.jsx      # Individual friend cards
│   ├── ResponseCard.jsx    # AI response display
│   └── LoadingSpinner.jsx  # Loading animation
├── services/
│   └── aiService.js        # AI/Mock response logic
├── App.jsx                 # Main app component
├── main.jsx               # App entry point
├── index.css              # Tailwind + custom styles
└── App.css                # Additional animations
```

## 🎯 Usage Example

1. **Enter a topic**: "Photosynthesis", "Calculus", "Machine Learning"
2. **Add friends**: 
   - "Alex - always forgets homework"
   - "Sam - loves organizing everything"
   - "Jordan - makes everything a game"
3. **Get your story**: Click "Teach me!" and receive a personalized explanation

## 🔮 Future Enhancements

- [ ] Real OpenAI GPT integration
- [ ] User accounts and saved stories
- [ ] More animation options
- [ ] Voice narration
- [ ] Story sharing features
- [ ] Advanced friend categories
- [ ] Difficulty level adjustment
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Google Pixel's material design
- Built with modern React best practices
- Designed for educational technology innovation

---

**Made with ❤️ for better learning experiences**
