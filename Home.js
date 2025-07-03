import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import HealthArticleCard from '../components/HealthArticleCard';

import { faComments, faCalendarAlt, faPills, faBookMedical } from '@fortawesome/free-solid-svg-icons';

const Home = ({ onOpenChatbot }) => {
  return (
    <main>
      <section id="hero" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h2>Votre Santé, Simplifiée, Connectée.</h2>
            <p>Découvrez une nouvelle ère de bien-être grâce à nos outils intelligents et personnalisés.</p>
            <Button to="/#fonctionnalites" className="btn-primary">Explorer les Fonctionnalités</Button>
          </div>
          <div className="hero-image">
            <div
              className="chatbot-animation-placeholder"
              id="openChatbotPlaceholder"
              role="button"
              tabIndex="0"
              aria-label="Ouvrir l'assistant Chatbot"
              onClick={onOpenChatbot}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenChatbot();
                }
              }}
            >
              <img src="/santé.png" alt="Robot médecin animé" className="animated-robot-image" />
              <p>Votre assistant IA est là !</p>
            </div>
          </div>
        </div>
      </section>

      <section id="fonctionnalites" className="features-section">
        <div className="container">
          <h3>Nos Solutions Innovantes</h3>
          <div className="feature-grid">
            <FeatureCard
              icon={faComments}
              title="Chatbot Médical Intelligent"
              description="Obtenez des réponses rapides à vos questions de santé 24/7."
              onClick={onOpenChatbot} // Open chatbot via click handler
            />
            <FeatureCard
              icon={faCalendarAlt}
              title="Calculateur de Cycle Précis"
              description="Suivez votre cycle menstruel et recevez des notifications personnalisées."
              to="/cycle"
            />
            <FeatureCard
              icon={faPills}
              title="Gestionnaire de Médicaments"
              description="Ne manquez plus jamais une prise avec nos rappels intelligents."
              to="/medicaments"
            />
            <FeatureCard
              icon={faBookMedical}
              title="Encyclopédie Santé Fiable"
              description="Accédez à des informations vérifiées sur les maladies courantes (palu, diabète, etc.)."
              to="/info-sante"
            />
          </div>
        </div>
      </section>

      <section id="info-sante" className="health-info-preview-section">
        <div className="container">
          <h3>Focus Santé : Comprendre et Prévenir</h3>
          <div className="info-grid">
            <HealthArticleCard
              title="Paludisme : Symptômes et Prévention"
              preview="Le paludisme est une maladie grave mais évitable. Apprenez à vous protéger..."
              to="/info-sante#palu"
            />
            <HealthArticleCard
              title="Diabète : Gestion au Quotidien"
              preview="Vivre avec le diabète nécessite une bonne gestion. Découvrez nos conseils..."
              to="/info-sante#diabete"
            />
            <HealthArticleCard
              title="Hypertension : Les Silences Dangers"
              preview="Une tension artérielle élevée peut avoir de graves conséquences. Informez-vous..."
              to="/info-sante#hypertension"
            />
          </div>
          <Button to="/info-sante" className="btn-secondary">Voir toutes les informations santé</Button>
        </div>
      </section>
    </main>
  );
};

export default Home;