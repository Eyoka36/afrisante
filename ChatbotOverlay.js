import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ChatbotOverlay = ({ isActive, onClose }) => {
  return (
    <div
      className={`chatbot-overlay ${isActive ? 'active' : ''}`}
      id="chatbotOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chatHeaderTitle"
      onClick={(e) => {
        if (e.target.id === 'chatbotOverlay') {
          onClose();
        }
      }}
    >
      <div className="chatbot-popup">
        <div className="chat-header">
          <span id="chatHeaderTitle">Assistant Santé Connectée</span>
          <button
            className="close-button"
            id="closeChatbotPopup"
            aria-label="Fermer le chatbot"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {isActive && ( // Only render iframe when active to prevent premature loading
          <iframe src="/chatbot" title="Chatbot Assistant Santé Connectée" frameBorder="0"></iframe>
        )}
      </div>
    </div>
  );
};

export default ChatbotOverlay;