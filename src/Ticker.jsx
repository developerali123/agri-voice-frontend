import React from 'react';
import './Ticker.css';

const Ticker = () => {
  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        <div className="ticker-content">
          <span className="ticker-item">💧 Soil Moisture: <strong className="ticker-value">34%</strong></span>
          <span className="ticker-separator">•</span>
          <span className="ticker-item">🌱 Nitrogen: <strong className="ticker-value">Optimal</strong></span>
          <span className="ticker-separator">•</span>
          <span className="ticker-item">⛈️ Next Rain: <strong className="ticker-value">48h</strong></span>
          <span className="ticker-separator">•</span>
          <span className="ticker-item">🌡️ Temperature: <strong className="ticker-value">28°C</strong></span>
          <span className="ticker-separator">•</span>
        </div>
        {/* Duplicate for infinite scrolling effect */}
        <div className="ticker-content">
          <span className="ticker-item">💧 Soil Moisture: <strong className="ticker-value">34%</strong></span>
          <span className="ticker-separator">•</span>
          <span className="ticker-item">🌱 Nitrogen: <strong className="ticker-value">Optimal</strong></span>
          <span className="ticker-separator">•</span>
          <span className="ticker-item">⛈️ Next Rain: <strong className="ticker-value">48h</strong></span>
          <span className="ticker-separator">•</span>
          <span className="ticker-item">🌡️ Temperature: <strong className="ticker-value">28°C</strong></span>
          <span className="ticker-separator">•</span>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
