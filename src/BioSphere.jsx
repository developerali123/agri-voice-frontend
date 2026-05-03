import React from 'react';
import './BioSphere.css';

const BioSphere = ({ loading, isListening, onClick }) => {
  return (
    <div className="biosphere-container" onClick={onClick}>
      <div className={`biosphere ${loading ? 'is-loading' : ''} ${isListening ? 'is-listening' : ''}`}>
        <div className="biosphere-aura"></div>
        <div className="biosphere-glass">
          <div className="biosphere-core">
            <div className="core-ring ring-1"></div>
            <div className="core-ring ring-2"></div>
            <div className="core-ring ring-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioSphere;
