import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'; // Ligne corrigée ici

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import ChatbotFAB from './components/ChatbotFAB';
import ChatbotOverlay from './components/ChatbotOverlay';

// Import pages
import Home from './pages/Home';
import ChatbotPage from './pages/ChatbotPage';
import CyclePage from './pages/CyclePage';
import MedicamentsPage from './pages/MedicamentsPage';
import InfoSantePage from './pages/InfoSantePage';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import ConditionsUtilisation from './pages/ConditionsUtilisation';


function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const openChatbot = () => {
    setIsChatbotOpen(true);
    document.body.classList.add('no-scroll');
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
    document.body.classList.remove('no-scroll');
  };

  // Effect to handle Escape key for chatbot overlay
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isChatbotOpen) {
        closeChatbot();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isChatbotOpen]);

  // Scroll to section when navigating to hash links
  function ScrollToHashElement() {
    const location = useLocation();
    useEffect(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0); // Scroll to top on regular page load
      }
    }, [location]);
    return null;
  }

  return (
    <Router>
      <ScrollToHashElement />
      <Header onOpenChatbot={openChatbot} />
      <Routes>
        <Route path="/" element={<Home onOpenChatbot={openChatbot} />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/cycle" element={<CyclePage />} />
        <Route path="/medicaments" element={<MedicamentsPage />} />
        <Route path="/info-sante" element={<InfoSantePage />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
        {/* Add a catch-all for 404 if desired */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: 'calc(100vh - 200px)' }}>
            <h2>404 - Page Non Trouvée</h2>
            <p>Désolé, la page que vous recherchez n'existe pas.</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Retour à l'accueil</Link>
          </div>
        } />
      </Routes>
      <Footer />
      <ChatbotFAB onClick={openChatbot} />
      <ChatbotOverlay isActive={isChatbotOpen} onClose={closeChatbot} />
    </Router>
  );
}

export default App;