import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const PolitiqueConfidentialite = () => {
  return (
    <section className="section" style={{ padding: '80px 0', minHeight: 'calc(100vh - 200px)', textAlign: 'left' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '50px', color: 'var(--primary-color)' }}>Politique de Confidentialité</h2>
        <p>Nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.</p>
        
        <h3>Collecte des Informations</h3>
        <p>Nous collectons les informations que vous nous fournissez directement, comme votre nom, votre adresse e-mail, et les données de santé que vous choisissez de partager pour utiliser nos services (par exemple, pour le calculateur de cycle ou le gestionnaire de médicaments).</p>

        <h3>Utilisation des Informations</h3>
        <p>Vos informations sont utilisées pour :</p>
        <ul>
          <li>Fournir et améliorer nos services personnalisés.</li>
          <li>Communiquer avec vous concernant votre compte ou nos mises à jour.</li>
          <li>Analyser l'utilisation de l'application pour l'optimisation.</li>
          <li>Assurer la sécurité de nos systèmes.</li>
        </ul>

        <h3>Partage des Informations</h3>
        <p>Nous ne vendons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager des données anonymisées ou agrégées à des fins statistiques.</p>

        <h3>Vos Droits</h3>
        <p>Vous avez le droit d'accéder à vos données, de les corriger, de les supprimer ou de limiter leur traitement. Contactez-nous pour exercer ces droits.</p>
        
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Button to="/" className="btn-primary">Retour à l'accueil</Button>
        </div>
      </div>
    </section>
  );
};

export default PolitiqueConfidentialite;