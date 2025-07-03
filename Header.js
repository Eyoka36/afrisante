import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onOpenChatbot }) => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
    document.body.classList.toggle('no-scroll', !isNavActive);
  };

  const closeNav = () => {
    setIsNavActive(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <header className="main-header">
      <div className="container">
        <Link to="/" className="logo" aria-label="Accueil Santé Connectée">
          <img src="afrik.png" alt="Logo Santé Connectée" className="logo-img" /> Santé Connectée
        </Link>
        <button
          className="menu-toggle"
          aria-label="Ouvrir le menu de navigation"
          aria-expanded={isNavActive}
          onClick={toggleNav}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <nav className={`main-nav ${isNavActive ? 'active' : ''}`} aria-label="Navigation principale">
          <ul>
            <li><Link to="/" onClick={closeNav}>Accueil</Link></li>
            <li><Link to="/#fonctionnalites" onClick={closeNav}>Fonctionnalités</Link></li>
            <li><Link to="/info-sante" onClick={closeNav}>Infos Santé</Link></li>
            <li><Link to="/chatbot" onClick={closeNav}>Chatbot</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;