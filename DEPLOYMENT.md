# GitHub Pages Setup Instructions for Atti Tutor

## 🚀 Enable GitHub Pages

1. Go to your repository: https://github.com/smdhussain06/AttiTutor
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The deployment will automatically start when you push to the main branch

## 🌐 Your Live Site

Once GitHub Pages is enabled, your app will be available at:
**https://smdhussain06.github.io/AttiTutor/**

## ⚡ Automatic Deployment

The app is configured with GitHub Actions for automatic deployment:
- Every push to the `main` branch will trigger a new deployment
- The workflow builds the React app and deploys it to GitHub Pages
- Check the "Actions" tab in your repository to see deployment status

## 🔧 Development

To continue developing locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/smdhussain06/AttiTutor.git
   cd AttiTutor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🎯 Next Steps

1. Enable GitHub Pages in repository settings
2. Add your Qwen AI API key to `.env.local` for local development
3. The app works in mock mode on GitHub Pages (no API key needed for live demo)
4. Customize the app further as needed

Your Atti Tutor app is now live and ready to help people learn through friendship-based stories! 🎉
