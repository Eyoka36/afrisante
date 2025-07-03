import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const InfoSantePage = () => {
  return (
    <section className="section" style={{ padding: '80px 0', minHeight: 'calc(100vh - 200px)', textAlign: 'left' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '50px', color: 'var(--primary-color)' }}>Notre Encyclopédie Santé</h2>

        <article style={{ marginBottom: '40px' }} id="palu">
          <h3 style={{ color: 'var(--accent-color)', marginBottom: '15px' }}>Paludisme : Symptômes et Prévention</h3>
          <p>Le paludisme est une maladie potentiellement mortelle causée par des parasites transmis à l'homme par les piqûres de moustiques femelles infectés. Il est largement répandu dans les régions tropicales et subtropicales.</p>
          <h4>Symptômes courants :</h4>
          <ul>
            <li>Fièvre</li>
            <li>Frissons</li>
            <li>Transpiration abondante</li>
            <li>Maux de tête</li>
            <li>Nausées et vomissements</li>
            <li>Douleurs musculaires</li>
            <li>Fatigue</li>
          </ul>
          <h4>Prévention :</h4>
          <p>La prévention est essentielle, surtout dans les zones à risque. Utilisez des moustiquaires imprégnées d'insecticide, des répulsifs cutanés, portez des vêtements couvrants le soir, et prenez une chimioprophylaxie si recommandée par un professionnel de santé.</p>
        </article>

        <hr style={{ borderColor: 'var(--border-color)', margin: '40px 0' }} />

        <article style={{ marginBottom: '40px' }} id="diabete">
          <h3 style={{ color: 'var(--accent-color)', marginBottom: '15px' }}>Diabète : Gestion au Quotidien</h3>
          <p>Le diabète est une maladie chronique caractérisée par un excès de sucre dans le sang (hyperglycémie). Il existe principalement deux types : le diabète de type 1 (auto-immun) et le diabète de type 2 (souvent lié au mode de vie).</p>
          <h4>Conseils pour la gestion :</h4>
          <ul>
            <li><strong>Alimentation équilibrée :</strong> Privilégiez les aliments à faible indice glycémique, les fibres, les légumes et les protéines maigres.</li>
            <li><strong>Activité physique régulière :</strong> L'exercice aide à réguler la glycémie.</li>
            <li><strong>Suivi régulier :</strong> Mesurez votre glycémie, consultez votre médecin et respectez le plan de traitement.</li>
            <li><strong>Gestion du stress :</strong> Le stress peut influencer la glycémie.</li>
          </ul>
        </article>

        <hr style={{ borderColor: 'var(--border-color)', margin: '40px 0' }} />

        <article style={{ marginBottom: '40px' }} id="hypertension">
          <h3 style={{ color: 'var(--accent-color)', marginBottom: '15px' }}>Hypertension : Les Dangers Silencieux</h3>
          <p>L'hypertension artérielle, ou tension artérielle élevée, est une affection courante où la force du sang contre les parois des artères est trop élevée. Souvent asymptomatique, elle est un facteur de risque majeur pour les maladies cardiovasculaires.</p>
          <h4>Facteurs de risque et prévention :</h4>
          <ul>
            <li><strong>Alimentation saine :</strong> Réduisez votre consommation de sel, de graisses saturées et de sucre.</li>
            <li><strong>Maintien d'un poids sain :</strong> L'obésité est un facteur de risque important.</li>
            <li><strong>Exercice physique :</strong> L'activité régulière aide à abaisser la tension.</li>
            <li><strong>Modération de l'alcool :</strong> Une consommation excessive peut augmenter la tension.</li>
            <li><strong>Arrêt du tabac :</strong> Le tabac endommage les vaisseaux sanguins.</li>
            <li><strong>Gestion du stress :</strong> Les techniques de relaxation peuvent être bénéfiques.</li>
          </ul>
        </article>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Button to="/" className="btn-primary">Retour à l'accueil</Button>
        </div>
      </div>
    </section>
  );
};

export default InfoSantePage;