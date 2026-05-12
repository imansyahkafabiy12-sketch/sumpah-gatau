import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Journaling from './pages/Journaling';

function AppContent() {
  const { themeConfig } = useTheme();

  return (
    <motion.div 
      animate={{ 
        backgroundColor: themeConfig.bgFrom,
        backgroundImage: `linear-gradient(to bottom, ${themeConfig.bgFrom}, ${themeConfig.bgTo})`,
        color: themeConfig.text === 'text-gray-200' ? '#E5E7EB' : (themeConfig.text === 'text-amber-950' ? '#451a03' : '#DBEAFE')
      }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      className={`min-h-screen font-sans selection:bg-purple-500/30 transition-colors duration-1000 ${themeConfig.text}`}
      style={{
        backgroundSize: '100% 100%',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />
      <main className="pt-20 min-h-screen relative z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journaling />} />
        </Routes>
      </main>
    </motion.div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
