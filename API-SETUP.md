# 🚀 Setting up Qwen AI Integration

## 📋 Quick Setup Instructions

### 1. Qwen AI API Key
- ✅ **Already configured!** Your Qwen AI key is set up
- API Key: `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`
- Endpoint: Alibaba Cloud DashScope compatible API

### 2. How It Works
- **Model**: `qwen-turbo` - Fast and creative responses
- **Endpoint**: `https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`
- **Features**: Creative explanations using friend analogies
- **Fallback**: Automatic fallback to mock responses if API fails

### 3. Verify Connection
- Look for the green "Qwen AI Connected" badge in the app header
- If you see yellow "Using Mock AI", there might be an API issue

## 💡 How It Works

- **With Qwen API**: Uses real Qwen AI for creative, personalized explanations
- **Without API**: Uses mock responses with similar format and structure
- **Fallback**: If API fails, automatically falls back to mock responses

## 🔒 Security Notes

- API key is stored in `.env.local` (not committed to version control)
- The `.env.local` file is already in `.gitignore`
- API calls are made directly from the browser for this demo

## 🛠️ Troubleshooting

**Yellow badge showing?**
- Check the server restarted after adding the API key
- Verify the key in `.env.local` matches your Qwen key

**API errors?**
- Check browser console for detailed error messages
- Verify your Qwen AI account is active
- App will automatically fall back to mock responses

## 🎯 Qwen AI Advantages

- **Fast Response**: Optimized for quick, creative responses
- **Cost Effective**: Competitive pricing
- **Creative**: Excellent at analogies and storytelling
- **Reliable**: Stable API with good uptime
