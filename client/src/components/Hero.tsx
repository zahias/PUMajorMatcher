import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Clock, ChevronRight, Sparkles } from "lucide-react";

interface HeroProps {
  onStartQuiz: () => void;
}

export default function Hero({ onStartQuiz }: HeroProps) {
  return (
    <section className="min-h-screen bg-[hsl(220,70%,22%)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,70%,18%)] via-[hsl(220,65%,22%)] to-[hsl(220,55%,28%)]"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(45,90%,50%)] rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-[hsl(220,70%,25%)]" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Phoenicia University</h2>
              <p className="text-white/70 text-xs">Major Matcher</p>
            </div>
          </div>
          <a 
            href="https://pu.edu.lb" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-sm transition-colors"
            data-testid="link-pu-website"
          >
            Visit pu.edu.lb
          </a>
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium border border-white/20">
              <Sparkles className="w-4 h-4 text-[hsl(45,90%,55%)]" />
              Free Career Discovery Tool
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Find Your Perfect Major at{" "}
            <span className="text-[hsl(45,90%,55%)]">Phoenicia University</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Answer a few questions about your interests and goals, and we'll match you with the programs that fit you best.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="bg-[hsl(45,90%,50%)] hover:bg-[hsl(45,85%,45%)] text-[hsl(220,70%,15%)] px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
              data-testid="button-start-quiz"
            >
              Start the Quiz
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-white/60 text-sm mt-4">Takes about 5 minutes</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <BookOpen className="w-5 h-5 text-[hsl(45,90%,55%)]" />
              </div>
              <div className="text-2xl font-bold text-white">14</div>
              <div className="text-sm text-white/70">Programs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <GraduationCap className="w-5 h-5 text-[hsl(45,90%,55%)]" />
              </div>
              <div className="text-2xl font-bold text-white">6</div>
              <div className="text-sm text-white/70">Colleges</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <Clock className="w-5 h-5 text-[hsl(45,90%,55%)]" />
              </div>
              <div className="text-2xl font-bold text-white">5 min</div>
              <div className="text-sm text-white/70">Quiz Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <Users className="w-5 h-5 text-[hsl(45,90%,55%)]" />
              </div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-white/70">Free</div>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="relative z-10 text-center py-6 text-white/50 text-sm">
        <p>Phoenicia University - Main Campus, District of Zahrani, South Lebanon</p>
      </footer>
    </section>
  );
}
