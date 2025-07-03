import React, { useState } from 'react';
import './MedicamentsPage.css'; // Importez le CSS ici

function MedicamentsPage() {
    // États pour gérer les valeurs des champs du formulaire
    const [nomMedicament, setNomMedicament] = useState('');
    const [dose, setDose] = useState('');
    const [heure, setHeure] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState(''); // Optionnel

    // Fonction de gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le comportement par défaut de la soumission de formulaire

        const medicamentData = {
            nom_medicament: nomMedicament,
            dose: dose,
            heure: heure,
            date_debut: dateDebut,
            date_fin: dateFin || null // Si dateFin est vide, envoyez null
        };

        console.log('Données du médicament à envoyer:', medicamentData);

        // --- Début de la logique d'envoi vers le backend (PHP) ---
        // Remplacez 'http://votre-domaine.com/php/save_medicaments.php' par l'URL réelle de votre script PHP
        try {
            const response = await fetch('http://votre-domaine.com/php/save_medicaments.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Nous envoyons du JSON
                    // Si votre backend attend du 'application/x-www-form-urlencoded',
                    // vous devrez convertir medicamentData en FormData ou URLSearchParams
                },
                body: JSON.stringify(medicamentData) // Convertit l'objet JS en chaîne JSON
            });

            if (!response.ok) {
                // Gérer les erreurs de réponse du serveur (par exemple, 404, 500)
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            }

            const result = await response.json(); // Ou response.text() si le PHP ne renvoie pas de JSON
            console.log('Réponse du serveur:', result);
            alert('Médicament enregistré avec succès !');

            // Optionnel: Réinitialiser le formulaire après succès
            setNomMedicament('');
            setDose('');
            setHeure('');
            setDateDebut('');
            setDateFin('');

        } catch (error) {
            console.error('Erreur lors de l\'enregistrement du médicament:', error);
            alert('Échec de l\'enregistrement du médicament. Veuillez réessayer.');
        }
        // --- Fin de la logique d'envoi vers le backend ---
    };

    return (
        <div className="medicaments-page-container"> {/* Conteneur pour le centrage des éléments */}
            <div className="form-container">
                <h2>Enregistrer un Nouveau Médicament</h2>
                <form onSubmit={handleSubmit}> {/* L'événement onSubmit appelle notre fonction React */}
                    <div className="form-group">
                        <label htmlFor="nom_medicament">Nom du médicament :</label>
                        <input
                            type="text"
                            id="nom_medicament"
                            name="nom_medicament"
                            value={nomMedicament} // Liaison avec l'état
                            onChange={(e) => setNomMedicament(e.target.value)} // Mise à jour de l'état
                            required
                            placeholder="Ex: Paracétamol"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dose">Dose :</label>
                        <input
                            type="text"
                            id="dose"
                            name="dose"
                            value={dose}
                            onChange={(e) => setDose(e.target.value)}
                            required
                            placeholder="Ex: 500 mg, 1 comprimé"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="heure">Heure de prise :</label>
                        <input
                            type="time"
                            id="heure"
                            name="heure"
                            value={heure}
                            onChange={(e) => setHeure(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date_debut">Date de début :</label>
                        <input
                            type="date"
                            id="date_debut"
                            name="date_debut"
                            value={dateDebut}
                            onChange={(e) => setDateDebut(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date_fin">Date de fin :</label>
                        <input
                            type="date"
                            id="date_fin"
                            name="date_fin"
                            value={dateFin}
                            onChange={(e) => setDateFin(e.target.value)}
                        />
                        <small style={{ color: '#666', fontSize: '0.85em', marginTop: '5px', display: 'block' }}>Laissez vide si le traitement est continu.</small>
                    </div>

                    <button type="submit">Enregistrer le traitement</button>
                </form>
            </div>
        </div>
    );
}

export default MedicamentsPage;