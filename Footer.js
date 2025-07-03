import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="container">
        <p>&copy; {currentYear} Santé Connectée. Tous droits réservés.</p>
        <div className="footer-links">
          <Link to="/politique-confidentialite">Politique de Confidentialité</Link>
          <Link to="/conditions-utilisation">Conditions d'Utilisation</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;