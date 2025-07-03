import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeatureCard = ({ icon, title, description, to, onClick }) => {
  const CardContent = (
    <>
      <FontAwesomeIcon icon={icon} className="feature-icon" />
      <h4>{title}</h4>
      <p>{description}</p>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="feature-card" aria-label={`Accéder au ${title}`}>
        {CardContent}
      </Link>
    );
  }
  
  return (
    <div className="feature-card" onClick={onClick} role="button" tabIndex="0" aria-label={`Accéder au ${title}`}>
      {CardContent}
    </div>
  );
};

export default FeatureCard;