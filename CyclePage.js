import React, { useState, useEffect } from 'react';
import './CyclePage.css'; // Importez le CSS ici

function CyclePage() {
    const [dernierCycle, setDernierCycle] = useState('');
    const [dureeMoyenne, setDureeMoyenne] = useState(28); // Valeur par défaut
    const [resultat, setResultat] = useState(null);
    const [showResult, setShowResult] = useState(false);

    // Pré-remplir la date du dernier cycle avec la date d'il y a 28 jours au chargement
    useEffect(() => {
        const today = new Date();
        const lastCycleSuggestion = new Date(today.setDate(today.getDate() - 28));
        setDernierCycle(lastCycleSuggestion.toISOString().slice(0, 10));
    }, []);

    const calculerCycle = (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        if (!dernierCycle || isNaN(dureeMoyenne) || dureeMoyenne < 1) {
            setResultat('<p style="color: red;">Veuillez remplir tous les champs correctement.</p>');
            setShowResult(true);
            return;
        }

        const dernierCycleDate = new Date(dernierCycle);
        // Ajouter 1 jour pour compenser le décalage potentiel dû au fuseau horaire
        dernierCycleDate.setDate(dernierCycleDate.getDate() + 1);

        // Calcul du prochain cycle
        const prochainCycleDate = new Date(dernierCycleDate);
        prochainCycleDate.setDate(prochainCycleDate.getDate() + dureeMoyenne);

        // Calcul de la période d'ovulation (environ 14 jours avant le prochain cycle)
        const ovulationStart = new Date(prochainCycleDate);
        ovulationStart.setDate(ovulationStart.getDate() - 15); // Début de la fenêtre fertile (environ 5 jours avant ovulation)
        const ovulationEnd = new Date(prochainCycleDate);
        ovulationEnd.setDate(ovulationEnd.getDate() - 11); // Fin de la fenêtre fertile (environ 1 jour après ovulation)


        // Formatage des dates pour l'affichage en français (ex: "mercredi 2 juillet 2025")
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const prochainCycleFormatted = prochainCycleDate.toLocaleDateString('fr-FR', options);
        const ovulationStartFormatted = ovulationStart.toLocaleDateString('fr-FR', options);
        const ovulationEndFormatted = ovulationEnd.toLocaleDateString('fr-FR', options);

        setResultat(`
            <p><strong>Votre prochain cycle devrait commencer le :</strong> <br>${prochainCycleFormatted}</p>
            <p style="margin-top: 15px;"><strong>Votre période d'ovulation estimée est entre le :</strong><br> ${ovulationStartFormatted} et le ${ovulationEndFormatted}</p>
        `);
        setShowResult(true); // Active l'animation d'apparition
    };

    return (
        <> {/* Fragment React pour retourner plusieurs éléments */}
            <section className="page-hero">
                <div className="container">
                    <h2>📅 Calculateur de Cycle Menstruel</h2>
                    <p>Comprenez mieux votre corps. Prédisez vos prochaines périodes et votre fenêtre de fertilité.</p>
                </div>
            </section>

            <section className="content-section">
                <div className="container">
                    <div className="card cycle-calculator-card">
                        <h3>Calcul Rapide</h3>
                        <form onSubmit={calculerCycle}>
                            <div className="form-group">
                                <label htmlFor="dernierCycle">Date de début de vos dernières règles :</label>
                                <input
                                    type="date"
                                    id="dernierCycle"
                                    name="dernier"
                                    value={dernierCycle}
                                    onChange={(e) => setDernierCycle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dureeMoyenne">Durée moyenne de votre cycle (en jours) :</label>
                                <input
                                    type="number"
                                    id="dureeMoyenne"
                                    name="duree"
                                    value={dureeMoyenne}
                                    onChange={(e) => setDureeMoyenne(parseInt(e.target.value, 10))}
                                    min="20"
                                    max="45"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Calculer Mon Cycle</button>
                        </form>

                        {resultat && (
                            <div
                                id="resultatCycle"
                                className={`result-display ${showResult ? 'show' : ''}`}
                                dangerouslySetInnerHTML={{ __html: resultat }}
                            />
                        )}

                        <div className="info-box">
                            <h4>Comprendre Votre Cycle</h4>
                            <p>Le cycle menstruel varie d'une personne à l'autre. La durée moyenne est de 28 jours, mais elle peut aller de 21 à 35 jours. Nos prédictions sont des estimations basées sur vos données.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CyclePage;