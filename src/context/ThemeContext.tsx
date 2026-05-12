import React, { createContext, useContext, useState } from 'react';

export type MoodCategory = 'neutral' | 'pleasant' | 'sad' | 'anxious' | 'exhausted';

interface ThemeContextType {
  mood: MoodCategory;
  setMood: (mood: MoodCategory) => void;
  themeConfig: {
    bgFrom: string;
    bgTo: string;
    text: string;
    glow: string;
    cardBg: string;
    accent: string;
  };
}

const THEMES: Record<MoodCategory, ThemeContextType['themeConfig']> = {
  neutral: {
    bgFrom: '#0B0A10',
    bgTo: '#161224',
    text: 'text-gray-200',
    glow: 'bg-purple-600/10',
    cardBg: 'bg-white/5',
    accent: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  pleasant: {
    bgFrom: '#FFFBF2',
    bgTo: '#FCE7CC',
    text: 'text-amber-950',
    glow: 'bg-yellow-400/20',
    cardBg: 'bg-white/40',
    accent: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
  },
  sad: {
    bgFrom: '#0A1128',
    bgTo: '#1C315E',
    text: 'text-blue-100',
    glow: 'bg-blue-500/20',
    cardBg: 'bg-white/5',
    accent: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
  },
  anxious: {
    bgFrom: '#1A0B16',
    bgTo: '#301326',
    text: 'text-pink-100',
    glow: 'bg-pink-600/20',
    cardBg: 'bg-white/5',
    accent: 'bg-pink-500/20 text-pink-200 border-pink-500/30',
  },
  exhausted: {
    bgFrom: '#121212',
    bgTo: '#212121',
    text: 'text-gray-300',
    glow: 'bg-gray-500/10',
    cardBg: 'bg-white/5',
    accent: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState<MoodCategory>('neutral');

  const themeConfig = THEMES[mood];

  return (
    <ThemeContext.Provider value={{ mood, setMood, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
