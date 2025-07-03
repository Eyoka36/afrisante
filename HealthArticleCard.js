import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const HealthArticleCard = ({ title, preview, to }) => {
  return (
    <article className="health-article-card">
      <h5>{title}</h5>
      <p>{preview}</p>
      <Link to={to} className="read-more">
        Lire la suite <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </article>
  );
};

export default HealthArticleCard;