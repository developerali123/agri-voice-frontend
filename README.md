# 🌾 Agri-Dost Mentor (Agri-Voice Frontend)

Agri-Dost Mentor is a highly interactive, hands-free AI agricultural assistant for farmers. This application provides a seamless, dynamic interface that helps farmers get instant agricultural advice through voice commands and spoken responses. 

Designed with modern aesthetics, the project features a premium glassmorphic UI, an interactive 3D orb (BioSphere), and a system-aware Day/Night theme switcher to ensure usability across various environmental conditions.

## ✨ Features

- 🎤 **Voice Recognition**: Built-in, hands-free speech recognition (supports native Web Speech API).
- 🔊 **Text-to-Speech (TTS)**: Spoken AI responses with a natural, calm voice for easy auditory feedback.
- 🔮 **Interactive Glassmorphic UI**: Beautiful, premium design featuring a responsive 3D BioSphere and dynamic action cards.
- 🌓 **Day/Night Theme Switcher**: Easily toggle between light and dark modes depending on outdoor visibility.
- ⌨️ **Typewriter Effect**: Engaging, dynamic text rendering for incoming AI responses.
- 📰 **Agricultural Ticker**: Continuous scrolling ticker for quick farming updates.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS with advanced Glassmorphism techniques, CSS animations, and custom theming variables.
- **APIs**: Web Speech API (`SpeechRecognition` and `SpeechSynthesisUtterance`)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd agri-voice-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root of the project and add your backend API URL:
   ```env
   VITE_BACKEND_URL=https://agri-voice-backend-665843018174.us-central1.run.app
   ```
   *(Note: Ensure your backend exposes a `/chat` endpoint for the AI integration).*

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Navigate to `http://localhost:5173` in your browser (preferably Google Chrome for full Speech API support).

## 📂 Project Structure

- `src/App.jsx`: Main application component handling state, themes, speech APIs, and backend communication.
- `src/BioSphere.jsx`: The interactive central orb component indicating listening/loading states.
- `src/ActionCards.jsx`: Quick-action suggestion cards for users.
- `src/Ticker.jsx`: Scrolling informational news ticker.

## 🤝 Integration

This frontend communicates with a Python/Node-based backend that wraps the **Google Gemini API**. The frontend sends the user's transcript and expects a JSON response containing a `reply` property.

---

*Designed and developed to empower the agricultural community with AI.*
