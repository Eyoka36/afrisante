import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

const ChatbotFAB = ({ onClick }) => {
  return (
    <div
      className="chatbot-fab"
      id="openChatbotFAB"
      role="button"
      tabIndex="0"
      aria-label="Ouvrir le chatbot"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <FontAwesomeIcon icon={faCommentDots} />
    </div>
  );
};

export default ChatbotFAB;