import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, HeartPulse, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative z-10">
        
        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-16 min-h-[70vh]"
        >
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Moon className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">A Safe Space for Your Mind</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6 leading-tight"
            >
              You don't have to wait until <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">everything falls apart</span> to ask for help.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We know school, expectations, and overthinking can feel too heavy sometimes. 
              RuangSela is your private, calming emotional journal. Express how you feel safely, without fear of judgment.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/journal">
                <Button size="lg" className="group">
                  Start Journaling
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="ghost">
                How it works
              </Button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex-1 w-full max-w-lg lg:max-w-none relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-3xl rounded-full" />
            <img 
              src="/hero-illustration.png" 
              alt="Calm abstract safe space" 
              className="relative w-full h-auto object-cover rounded-3xl border border-white/10 shadow-2xl glass-card"
            />
          </motion.div>
        </motion.div>

        {/* Features / Value Proposition */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 grid md:grid-cols-3 gap-8"
        >
          <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
            <HeartPulse className="w-10 h-10 text-purple-400 mb-6" />
            <h3 className="text-xl font-medium text-white mb-3">Emotionally Intelligent</h3>
            <p className="text-gray-400 leading-relaxed">
              An AI that listens without judging. Receive warm, human-like reflections that help you understand your feelings and patterns over time.
            </p>
          </div>
          
          <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
            <ShieldCheck className="w-10 h-10 text-blue-400 mb-6" />
            <h3 className="text-xl font-medium text-white mb-3">100% Private & Safe</h3>
            <p className="text-gray-400 leading-relaxed">
              Your journals are strictly private. We never notify your teachers unless you explicitly ask for support or give us permission to connect you.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
              <span className="text-purple-300 font-medium text-sm">BK</span>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">A Bridge to Real Help</h3>
            <p className="text-gray-400 leading-relaxed">
              Not a replacement for counseling, but a gentle stepping stone. When you're ready, we help you quietly reach out to BK teachers you trust.
            </p>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
