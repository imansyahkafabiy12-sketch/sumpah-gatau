import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

export function Navbar() {
  const location = useLocation();
  const { themeConfig } = useTheme();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Journal', path: '/journal' },
    { name: 'Dashboard (BK)', path: '/dashboard' },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md border-b border-white/5 bg-black/5"
    >
      <Link to="/" className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${themeConfig.accent} shadow-lg flex items-center justify-center font-bold text-xs`}>
          RS
        </div>
        <span className="text-xl font-medium tracking-tight">RuangSela</span>
      </Link>

      <div className={`hidden md:flex items-center gap-1 ${themeConfig.cardBg} backdrop-blur-md p-1 rounded-full border border-white/10`}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors relative",
              location.pathname === link.path ? "opacity-100 font-semibold" : "opacity-60 hover:opacity-100"
            )}
          >
            {location.pathname === link.path && (
              <motion.div 
                layoutId="nav-indicator"
                className={`absolute inset-0 ${themeConfig.glow} rounded-full z-0`}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.name}</span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
