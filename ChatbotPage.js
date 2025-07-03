import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Assurez-vous d'avoir installé Font Awesome
import { useNavigate } from 'react-router-dom'; // Si vous utilisez React Router pour la navigation

import './ChatbotPage.css'; // Importez le CSS

function ChatbotPage() {
    // État pour stocker tous les messages de la conversation
    const [messages, setMessages] = useState([]);
    // État pour la saisie de l'utilisateur
    const [userInput, setUserInput] = useState('');
    // État pour gérer la logique de la conversation
    const [conversationState, setConversationState] = useState('start');
    // État pour les réponses rapides à afficher
    const [quickReplies, setQuickReplies] = useState([]);
    // Référence pour faire défiler automatiquement le chat vers le bas
    const chatMessagesRef = useRef(null);

    const navigate = useNavigate(); // Hook pour la navigation

    // Fonction pour ajouter un message à l'état des messages
    const addMessage = (sender, text) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                sender,
                text,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        ]);
    };

    // Fonction pour gérer la logique du chatbot
    const processMessage = (message, isUserManualInput = false) => {
        let botResponseText = "";
        let nextQuickReplies = [];
        let nextConversationState = conversationState;

        switch (conversationState) {
            case 'start':
                botResponseText = "Bonjour ! Je suis votre assistant Santé Connectée. Comment puis-je vous aider aujourd'hui ?";
                nextQuickReplies = [
                    { text: "Infos sur une maladie", action: "maladie_info" },
                    { text: "Conseils bien-être", action: "bien_etre" },
                    { text: "Questions techniques (app)", action: "tech_app" },
                    { text: "Autre", action: "autre_demande" }
                ];
                nextConversationState = 'main_menu';
                break;

            case 'main_menu':
                if (message === 'maladie_info') {
                    botResponseText = "Quel sujet de santé vous intéresse ? Vous pouvez taper ou choisir parmi les options ci-dessous :";
                    nextQuickReplies = [
                        { text: "Paludisme", action: "info_paludisme" },
                        { text: "Diabète", action: "info_diabete" },
                        { text: "Hypertension", action: "info_hypertension" },
                        { text: "Maux de tête", action: "info_maux_de_tete" },
                        { text: "Anémie", action: "info_anemie" },
                        { text: "Allergies", action: "info_allergies" },
                        { text: "Fatigue persistante", action: "info_fatigue" },
                        { text: "Retour au menu principal", action: "start" }
                    ];
                    nextConversationState = 'maladie_selection';
                } else if (message === 'bien_etre') {
                    botResponseText = "Je peux vous donner des conseils sur l'alimentation, l'exercice, le sommeil ou la gestion du stress. Quel domaine vous intéresse ?";
                    nextQuickReplies = [
                        { text: "Alimentation", action: "conseil_alimentation" },
                        { text: "Exercice", action: "conseil_exercice" },
                        { text: "Sommeil", action: "conseil_sommeil" },
                        { text: "Gestion du stress", action: "conseil_stress" },
                        { text: "Retour au menu principal", action: "start" }
                    ];
                    nextConversationState = 'bien_etre_selection';
                } else if (message === 'tech_app') {
                    botResponseText = "Pour les questions techniques sur l'application, je peux vous orienter. Quelle est votre question ?";
                    nextQuickReplies = [
                        { text: "Problème de connexion", action: "tech_connexion" },
                        { text: "Fonctionnalité ne marche pas", action: "tech_fonctionnalite" },
                        { text: "Suggestions d'amélioration", action: "tech_suggestions" },
                        { text: "Retour au menu principal", action: "start" }
                    ];
                    nextConversationState = 'tech_selection';
                } else if (message === 'autre_demande') {
                    botResponseText = "D'accord, décrivez brièvement votre demande, et je ferai de mon mieux pour vous aider. Ou vous pouvez revenir au menu principal.";
                    nextQuickReplies = [{ text: "Retour au menu principal", action: "start" }];
                    nextConversationState = 'free_text_mode';
                } else {
                    botResponseText = "Désolé, je n'ai pas compris votre choix. Veuillez sélectionner une option du menu principal.";
                    nextQuickReplies = [
                        { text: "Infos sur une maladie", action: "maladie_info" },
                        { text: "Conseils bien-être", action: "bien_etre" },
                        { text: "Questions techniques (app)", action: "tech_app" },
                        { text: "Autre", action: "autre_demande" }
                    ];
                    nextConversationState = 'main_menu';
                }
                break;

            case 'maladie_selection':
                if (message === 'info_paludisme') {
                    botResponseText = "Le paludisme est une maladie grave transmise par les moustiques. Les symptômes incluent fièvre, frissons, maux de tête. La prévention passe par les moustiquaires et les répulsifs. Pour des informations complètes, consultez notre <a href='#' onClick={(e) => { e.preventDefault(); alert(\"Lien vers info-sante.php (à implémenter)\"); }}>section Paludisme</a>.";
                    nextQuickReplies = [{ text: "Retour aux maladies", action: "maladie_info" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'info_diabete') {
                    botResponseText = "Le diabète est une maladie chronique liée au sucre dans le sang. Il existe plusieurs types, mais la gestion implique souvent alimentation et exercice. Pour plus de détails, visitez notre <a href='#' onClick={(e) => { e.preventDefault(); alert(\"Lien vers info-sante.php (à implémenter)\"); }}>section Diabète</a>.";
                    nextQuickReplies = [{ text: "Retour aux maladies", action: "maladie_info" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'info_hypertension') {
                    botResponseText = "L'hypertension, ou pression artérielle élevée, est souvent silencieuse mais peut causer de graves problèmes cardiaques. Un mode de vie sain est essentiel. Plus d'infos sur notre <a href='#' onClick={(e) => { e.preventDefault(); alert(\"Lien vers info-sante.php (à implémenter)\"); }}>section Hypertension</a>.";
                    nextQuickReplies = [{ text: "Retour aux maladies", action: "maladie_info" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'info_maux_de_tete') {
                    botResponseText = "Les maux de tête sont très courants. Ils peuvent être de tension, migraines, etc. Hydratation, repos et gestion du stress aident souvent. Quand s'inquiéter ? Si la douleur est soudaine et intense ou accompagnée d'autres symptômes graves. Pour des détails, consultez notre <a href='#' onClick={(e) => { e.preventDefault(); alert(\"Lien vers info-sante.php (à implémenter)\"); }}>section Maux de Tête</a>.";
                    nextQuickReplies = [{ text: "Retour aux maladies", action: "maladie_info" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'info_anemie') {
                    botResponseText = "L'anémie est souvent due à un manque de fer, entraînant fatigue et pâleur. Une alimentation riche en fer et des suppléments peuvent aider. Pour des informations complètes, consultez notre <a href='#' onClick={(e) => { e.preventDefault(); alert(\"Lien vers info-sante.php (à implémenter)\"); }}>section Anémie</a>.";
                    nextQuickReplies = [{ text: "Retour aux maladies", action: "maladie_info" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'info_allergies') {
                    botResponseText = "Les allergies sont des réactions immunitaires excessives à des substances inoffensives. Les symptômes varient (respiratoires, cutanés, digestifs). L'éviction de l'allergène et les antihistaminiques sont les traitements courants. Plus d'infos sur notre <a href='#' onClick={(e) => { e.preventDefault(); alert(\"Lien vers info-sante.php (à implémenter)\"); }}>section Allergies</a>.";
                    nextQuickReplies = [{ text: "Retour aux maladies", action: "maladie_info" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'info_fatigue') {
                    botResponseText = "La fatigue persistante peut avoir de nombreuses causes, du manque de sommeil aux carences nutritionnelles ou maladies chroniques. Si elle dure, consultez un médecin. Découvrez plus de détails sur notre <a href='#' onClick={(e) => { e.preventDefault(); alert(\"Lien vers info-sante.php (à implémenter)\"); }}>section Fatigue</a>.";
                    nextQuickReplies = [{ text: "Retour aux maladies", action: "maladie_info" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'start') {
                    processMessage('start');
                    return;
                } else {
                    botResponseText = "Je n'ai pas trouvé d'informations spécifiques pour ce sujet. Veuillez choisir une option ou revenir au menu principal.";
                    nextQuickReplies = [{ text: "Retour aux maladies", action: "maladie_info" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'maladie_selection';
                }
                break;

            case 'bien_etre_selection':
                if (message === 'conseil_alimentation') {
                    botResponseText = "Pour une bonne alimentation, privilégiez les fruits, légumes, céréales complètes et protéines maigres. Limitez les sucres ajoutés et les graisses saturées.";
                    nextQuickReplies = [{ text: "Autres conseils bien-être", action: "bien_etre" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'conseil_exercice') {
                    botResponseText = "Visez au moins 30 minutes d'activité physique modérée la plupart des jours de la semaine. La marche rapide, la natation ou le vélo sont d'excellents choix.";
                    nextQuickReplies = [{ text: "Autres conseils bien-être", action: "bien_etre" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'conseil_sommeil') {
                    botResponseText = "Pour un meilleur sommeil, établissez une routine, évitez les écrans avant de dormir, et assurez-vous que votre chambre est sombre et fraîche.";
                    nextQuickReplies = [{ text: "Autres conseils bien-être", action: "bien_etre" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'conseil_stress') {
                    botResponseText = "La gestion du stress peut inclure la méditation, la respiration profonde, le yoga ou des activités relaxantes comme la lecture. N'hésitez pas à demander de l'aide si le stress devient trop lourd.";
                    nextQuickReplies = [{ text: "Autres conseils bien-être", action: "bien_etre" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'start') {
                    processMessage('start');
                    return;
                } else {
                    botResponseText = "Désolé, je n'ai pas compris ce conseil spécifique. Veuillez choisir une option.";
                    nextQuickReplies = [
                        { text: "Alimentation", action: "conseil_alimentation" },
                        { text: "Exercice", action: "conseil_exercice" },
                        { text: "Sommeil", action: "conseil_sommeil" },
                        { text: "Gestion du stress", action: "conseil_stress" },
                        { text: "Retour au menu principal", action: "start" }
                    ];
                    nextConversationState = 'bien_etre_selection';
                }
                break;

            case 'tech_selection':
                if (message === 'tech_connexion') {
                    botResponseText = "Si vous rencontrez des problèmes de connexion, veuillez vérifier votre connexion internet. Si le problème persiste, essayez de redémarrer l'application ou votre appareil. Si rien ne fonctionne, contactez notre support technique via l'onglet 'Contact' sur la page d'accueil.";
                    nextQuickReplies = [{ text: "Autre question technique", action: "tech_app" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'tech_fonctionnalite') {
                    botResponseText = "Pour un problème avec une fonctionnalité spécifique, veuillez nous décrire le plus précisément possible ce qui ne fonctionne pas et sur quelle fonctionnalité, et nous transmettrons l'information à notre équipe de développement.";
                    nextQuickReplies = [{ text: "Autre question technique", action: "tech_app" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'tech_suggestions') {
                    botResponseText = "Vos suggestions sont précieuses ! N'hésitez pas à nous les envoyer via la section 'Contact' sur la page d'accueil. Nous sommes toujours à l'écoute pour améliorer l'application.";
                    nextQuickReplies = [{ text: "Autre question technique", action: "tech_app" }, { text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                } else if (message === 'start') {
                    processMessage('start');
                    return;
                } else {
                    botResponseText = "Je ne peux pas répondre à cette question technique de manière générique. Veuillez choisir une option.";
                    nextQuickReplies = [
                        { text: "Problème de connexion", action: "tech_connexion" },
                        { text: "Fonctionnalité ne marche pas", action: "tech_fonctionnalite" },
                        { text: "Suggestions d'amélioration", action: "tech_suggestions" },
                        { text: "Retour au menu principal", action: "start" }
                    ];
                    nextConversationState = 'tech_selection';
                }
                break;

            case 'free_text_mode':
                if (message === 'start') {
                    processMessage('start');
                    return;
                } else {
                    // Ici, vous pourriez envoyer le message de l'utilisateur à un backend pour un traitement IA
                    // ou simplement donner une réponse générique.
                    botResponseText = "Merci pour votre demande. Notre équipe examine les requêtes personnalisées. Si c'est une urgence, veuillez consulter un professionnel de santé. Retour au menu principal ?";
                    nextQuickReplies = [{ text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                }
                break;

            case 'info_displayed':
                // Après avoir affiché une info, on propose de revenir au menu principal
                if (message === 'start') {
                    processMessage('start');
                    return;
                } else if (['maladie_info', 'bien_etre', 'tech_app'].includes(message)) {
                    processMessage(message); // Permet de revenir à la sélection d'un sous-menu
                    return;
                } else {
                    botResponseText = "Puis-je vous aider avec autre chose ? Choisissez une option ou revenez au menu principal.";
                    nextQuickReplies = [{ text: "Menu principal", action: "start" }];
                    nextConversationState = 'info_displayed';
                }
                break;

            default:
                botResponseText = "Désolé, une erreur est survenue ou je n'ai pas compris. Veuillez recommencer.";
                nextConversationState = 'start';
                nextQuickReplies = [{ text: "Démarrer", action: "start" }];
                break;
        }
        addMessage('bot', botResponseText);
        setQuickReplies(nextQuickReplies);
        setConversationState(nextConversationState);
    };

    // Gérer l'envoi de message par l'utilisateur (via input text ou bouton)
    const handleSendMessage = () => {
        if (userInput.trim() !== '') {
            addMessage('user', userInput.trim());
            processMessage(userInput.trim(), true); // Indique que c'est une saisie manuelle
            setUserInput(''); // Efface l'input
        }
    };

    // Gérer le clic sur une réponse rapide
    const handleQuickReplyClick = (text, action) => {
        addMessage('user', text); // Affiche le message de l'utilisateur
        // Ne vide pas les quick replies tout de suite, car processMessage les mettra à jour.
        processMessage(action);
        // Réactive la saisie manuelle (désactivée par les quick replies)
        // L'input sera désactivé/activé par la logique de processMessage via les quickReplies
    };

    // Effet pour faire défiler le chat vers le bas à chaque nouveau message
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]); // Se déclenche à chaque fois que 'messages' est mis à jour

    // Démarrer la conversation au chargement du composant (équivalent de DOMContentLoaded)
    useEffect(() => {
        processMessage('start');
    }, []); // Le tableau vide assure que cela ne s'exécute qu'une seule fois au montage

    return (
        <div className="chatbot-page-container">
            <section className="chatbot-container">
                <div className="chat-header">
                    <button className="back-button" onClick={() => navigate(-1)}> {/* Utilise navigate pour revenir */}
                        <FontAwesomeIcon icon="arrow-left" />
                    </button>
                    Assistant Santé Connectée
                </div>
                <div className="chat-messages" id="chat-messages" ref={chatMessagesRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.sender}-message`}>
                            <p dangerouslySetInnerHTML={{ __html: msg.text }}></p> {/* dangerouslySetInnerHTML pour les liens */}
                            <span className="message-timestamp">{msg.timestamp}</span>
                        </div>
                    ))}
                </div>
                <div className="quick-replies" id="quick-replies">
                    {quickReplies.map((reply, index) => (
                        <button
                            key={index}
                            className="quick-reply-button"
                            onClick={() => handleQuickReplyClick(reply.text, reply.action)}
                        >
                            {reply.text}
                        </button>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        id="user-input"
                        placeholder="Tapez votre message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSendMessage();
                        }}
                        disabled={quickReplies.length > 0 && conversationState !== 'free_text_mode'} // Désactive si quick replies et pas en mode texte libre
                    />
                    <button id="send-button" onClick={handleSendMessage}
                            disabled={quickReplies.length > 0 && conversationState !== 'free_text_mode' && userInput.trim() === ''}>
                        <FontAwesomeIcon icon="paper-plane" />
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ChatbotPage;