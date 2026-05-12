import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Save, Battery, BookOpen, Moon, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTheme, type MoodCategory } from '../context/ThemeContext';

const MOODS: { id: MoodCategory; label: string; emoji: string; desc: string }[] = [
  { id: 'pleasant', label: 'Pleasant', emoji: '✨', desc: 'Feeling good, calm, or happy' },
  { id: 'neutral', label: 'Neutral', emoji: '☁️', desc: 'Just okay, nothing special' },
  { id: 'exhausted', label: 'Exhausted', emoji: '🔋', desc: 'Physically or mentally drained' },
  { id: 'anxious', label: 'Anxious', emoji: '🌪️', desc: 'Worried, stressed, or on edge' },
  { id: 'sad', label: 'Low / Sad', emoji: '🌧️', desc: 'Down, lonely, or heavy' },
];

const EMOTIONS: Record<MoodCategory, string[]> = {
  pleasant: ['Happy', 'Grateful', 'Relieved', 'Confident', 'Calm', 'Motivated', 'Proud', 'Loved'],
  neutral: ['Bored', 'Distracted', 'Okay', 'Apathetic', 'Quiet', 'Waiting', 'Reflective'],
  exhausted: ['Burnout', 'Tired', 'Overwhelmed', 'Sleepy', 'Unmotivated', 'Brain Fog'],
  anxious: ['Stressed', 'Nervous', 'Overthinking', 'Pressured', 'Panicked', 'Fear of Failure'],
  sad: ['Lonely', 'Hurt', 'Disappointed', 'Empty', 'Lost', 'Misunderstood', 'Grieving']
};

export default function Journaling() {
  const { mood, setMood, themeConfig } = useTheme();
  
  const [step, setStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [journalText, setJournalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // Reset theme when leaving the page (optional, but good for UX)
  useEffect(() => {
    return () => setMood('neutral');
  }, [setMood]);

  const handleMoodSelect = (selectedMoodId: MoodCategory) => {
    setMood(selectedMoodId);
    setSelectedTags([]); // Reset tags when mood changes
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate AI reflection
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
      setAiResponse(
        mood === 'pleasant' 
        ? "It's wonderful to hear you're feeling this way! Acknowledging the good moments is just as important as navigating the hard ones. I'm glad you had a moment of peace today."
        : "It sounds like you’ve been carrying a lot by yourself lately. It's completely valid to feel this way. Remember that resting and taking a step back is productive too. I'm here to listen whenever you need a safe space."
      );
    }, 2000);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 min-h-[80vh] flex flex-col justify-center">
      
      {/* Background Animated Blob specific to mood */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`w-[600px] h-[600px] rounded-full blur-[100px] ${themeConfig.glow}`}
        />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: MOOD SELECTION */}
          {step === 1 && (
            <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="text-center">
              <h1 className="text-4xl md:text-5xl font-semibold mb-3">How are you feeling?</h1>
              <p className="text-lg opacity-70 mb-12">Choose the energy that fits you best right now.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {MOODS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => handleMoodSelect(m.id)}
                    className={`p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-3 backdrop-blur-md ${
                      mood === m.id 
                      ? `${themeConfig.accent} scale-105 shadow-xl` 
                      : `${themeConfig.cardBg} border-transparent opacity-70 hover:opacity-100 hover:scale-[1.02]`
                    }`}
                  >
                    <span className="text-4xl drop-shadow-md">{m.emoji}</span>
                    <div>
                      <h3 className="font-medium text-lg">{m.label}</h3>
                      <p className="text-xs opacity-70 mt-1">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <Button onClick={() => setStep(2)} size="lg" className={`px-12 ${themeConfig.accent} hover:brightness-110 border-none`}>
                  Next <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: EMOTION TAGS */}
          {step === 2 && (
            <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="text-center">
              <div className="mb-8">
                <button onClick={() => setStep(1)} className="inline-flex items-center text-sm opacity-70 hover:opacity-100 transition-opacity mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <div className="text-6xl mb-4">{MOODS.find(m => m.id === mood)?.emoji}</div>
                <h1 className="text-3xl md:text-4xl font-semibold mb-2">What best describes this feeling?</h1>
                <p className="opacity-70">Select the emotions that resonate with you today.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto mb-12">
                {EMOTIONS[mood].map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-5 py-2.5 rounded-full text-base transition-all duration-300 backdrop-blur-md border ${
                      selectedTags.includes(tag)
                      ? `${themeConfig.accent} scale-105 font-medium shadow-md`
                      : `${themeConfig.cardBg} border-transparent opacity-80 hover:opacity-100`
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <Button onClick={() => setStep(3)} size="lg" className={`px-12 ${themeConfig.accent} hover:brightness-110 border-none`}>
                  Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: JOURNAL & METRICS */}
          {step === 3 && (
            <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <div className="mb-6">
                <button onClick={() => setStep(2)} className="inline-flex items-center text-sm opacity-70 hover:opacity-100 transition-opacity mb-2">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <h1 className="text-3xl font-semibold mb-2">Write it out.</h1>
                <p className="opacity-70">Empty your mind. This space is private and secure.</p>
              </div>

              <div className={`p-1 rounded-3xl ${themeConfig.glow} backdrop-blur-xl mb-6`}>
                <textarea 
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="I'm feeling this way because..."
                  className={`w-full h-48 ${themeConfig.cardBg} rounded-3xl p-6 placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none transition-all text-lg`}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className={`${themeConfig.cardBg} p-5 rounded-3xl backdrop-blur-md`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm flex items-center gap-2"><Battery className="w-4 h-4" /> Battery</span>
                  </div>
                  <input type="range" min="1" max="10" defaultValue="5" className="w-full accent-current opacity-70" />
                </div>
                <div className={`${themeConfig.cardBg} p-5 rounded-3xl backdrop-blur-md`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm flex items-center gap-2"><Moon className="w-4 h-4" /> Sleep</span>
                  </div>
                  <input type="range" min="1" max="10" defaultValue="4" className="w-full accent-current opacity-70" />
                </div>
                <div className={`${themeConfig.cardBg} p-5 rounded-3xl backdrop-blur-md`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm flex items-center gap-2"><BookOpen className="w-4 h-4" /> Stress</span>
                  </div>
                  <input type="range" min="1" max="10" defaultValue="8" className="w-full accent-current opacity-70" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  size="lg"
                  className={`${themeConfig.accent} hover:brightness-110 border-none px-8`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                      Reflecting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-lg">
                      <Save className="w-5 h-5" /> Save to Journal
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: AI REFLECTION */}
          {step === 4 && (
            <motion.div key="step4" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="text-center py-10">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 relative"
              >
                <div className={`absolute inset-0 rounded-full ${themeConfig.glow} blur-md`} />
                <Sparkles className="w-10 h-10 relative z-10" />
              </motion.div>

              <h1 className="text-3xl font-semibold mb-8">RuangSela Reflection</h1>
              
              <div className={`${themeConfig.cardBg} p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden text-left max-w-2xl mx-auto`}>
                <p className="text-xl leading-relaxed md:leading-loose font-medium opacity-90 relative z-10">
                  "{aiResponse}"
                </p>
              </div>

              <div className="mt-12">
                <Button onClick={() => { setStep(1); setJournalText(''); setSelectedTags([]); }} variant="ghost" className="opacity-70 hover:opacity-100">
                  Return Home
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
