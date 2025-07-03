import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const ConditionsUtilisation = () => {
  return (
    <section className="section" style={{ padding: '80px 0', minHeight: 'calc(100vh - 200px)', textAlign: 'left' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '50px', color: 'var(--primary-color)' }}>Conditions d'Utilisation</h2>
        <p>Bienvenue sur Santé Connectée. En utilisant notre application, vous acceptez les présentes conditions d'utilisation.</p>
        
        <h3>Acceptation des Conditions</h3>
        <p>En accédant à Santé Connectée, vous reconnaissez avoir lu, compris et accepté d'être lié par ces conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre application.</p>

        <h3>Utilisation des Services</h3>
        <p>Nos services sont conçus pour vous fournir des informations générales sur la santé et des outils de gestion personnelle. Ils ne remplacent en aucun cas un avis médical professionnel, un diagnostic ou un traitement.</p>

        <h3>Contenu Utilisateur</h3>
        <p>Vous êtes responsable de tout contenu que vous soumettez ou publiez via notre application. Vous garantissez que vous avez les droits nécessaires pour soumettre ce contenu et qu'il ne viole pas les droits de tiers ou les lois applicables.</p>

        <h3>Limitation de Responsabilité</h3>
        <p>Santé Connectée n'est pas responsable des décisions prises sur la base des informations fournies par l'application. Consultez toujours un professionnel de la santé pour toute question médicale.</p>

        <h3>Modifications des Conditions</h3>
        <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur cette page.</p>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Button to="/" className="btn-primary">Retour à l'accueil</Button>
        </div>
      </div>
    </section>
  );
};

export default ConditionsUtilisation;