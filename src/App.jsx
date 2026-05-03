import { useState, useEffect, useRef } from 'react'
import BioSphere from './BioSphere'
import ActionCards from './ActionCards'
import Ticker from './Ticker'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('Aslam-o-Alaikum! Main Agri-Dost hoon. Main aap ki kya madad kar sakta hoon?')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [theme, setTheme] = useState('dark')

  const typewriterRef = useRef(null)

  // URL loaded from .env file
  const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/chat`

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const playTypewriter = (text) => {
    if (typewriterRef.current) clearInterval(typewriterRef.current);
    setOutput('');
    let i = 0;
    typewriterRef.current = setInterval(() => {
      setOutput(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(typewriterRef.current);
      }
    }, 30); // 30ms per character
  }

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      // Optional: adjust voice/rate for natural calm voice
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  const askGemini = async (textToSend = input) => {
    if (!textToSend) return
    setLoading(true)
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      })
      const data = await response.json()
      playTypewriter(data.reply);
      speakText(data.reply);
    } catch (error) {
      const errorMsg = "Maaf kijie, connection ka masla hai. Dobara koshish karein.";
      playTypewriter(errorMsg);
      speakText(errorMsg);
    }
    setLoading(false)
  }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser does not support Speech Recognition. Please use Chrome.");
      return;
    }
    
    // Stop speaking if currently speaking
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // or 'ur-PK' based on needs
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setInput('');
      setOutput('Listening...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      askGemini(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      setOutput('Error listening. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px 80px 20px',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-main)',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 10px var(--glass-shadow)'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {theme === 'dark' ? (
          // Moon Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        ) : (
          // Sun Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        )}
      </button>

      <h1 style={{ 
        color: 'var(--accent)', 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        marginBottom: '10px',
        textShadow: '0 0 20px var(--glass-border)'
      }}>
        🌾 Agri-Dost Mentor
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>Tap the Orb to Speak</p>
      
      <BioSphere loading={loading} isListening={isListening} onClick={startListening} />
      
      <ActionCards />
      
      <div style={{ 
        background: 'var(--glass-bg)', 
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid var(--glass-border)',
        padding: '30px', 
        borderRadius: '24px', 
        boxShadow: '0 20px 40px var(--glass-shadow)', 
        maxWidth: '500px', 
        width: '100%',
        marginTop: '20px'
      }}>
        <div style={{ 
          minHeight: '80px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <p style={{ 
            fontSize: '1.15rem', 
            color: 'var(--text-main)', 
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            {output}
            {loading && <span style={{ animation: 'pulse 1s infinite' }}>...</span>}
          </p>
        </div>
        
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sawaal likhein ya Orb ko tap karein..."
          style={{ 
            width: '100%', 
            padding: '16px', 
            borderRadius: '12px', 
            border: '1px solid var(--glass-border)', 
            backgroundColor: 'var(--input-bg)',
            color: 'var(--text-main)',
            fontSize: '1rem',
            marginBottom: '16px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
        />

        <button 
          onClick={() => askGemini()}
          disabled={loading || isListening}
          style={{ 
            width: '100%', 
            padding: '16px', 
            borderRadius: '12px', 
            backgroundColor: loading ? 'var(--accent-hover)' : 'var(--accent)', 
            color: '#fff', 
            border: 'none', 
            fontSize: '1.1rem',
            fontWeight: '600', 
            cursor: loading ? 'wait' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: loading ? 'none' : '0 4px 15px var(--glass-border)'
          }}
          onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px var(--glass-border)')}
          onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 15px var(--glass-border)')}
        >
          {loading ? "Soch raha hoon..." : "Sawaal Poochein 🎤"}
        </button>
      </div>
      
      <Ticker />
    </div>
  )
}

export default App