import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Clock, ChevronRight } from "lucide-react";

interface HeroProps {
  onStartQuiz: () => void;
}

export default function Hero({ onStartQuiz }: HeroProps) {
  return (
    <section className="min-h-screen bg-[hsl(220,70%,22%)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,70%,18%)] via-[hsl(220,65%,22%)] to-[hsl(220,55%,28%)]"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[hsl(45,90%,50%)] rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-20 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 text-[hsl(220,70%,25%)]" />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm sm:text-lg leading-tight">Phoenicia University</h2>
              <p className="text-white/70 text-xs hidden sm:block">Major Matcher</p>
            </div>
          </div>
          <a 
            href="https://pu.edu.lb" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-xs sm:text-sm transition-colors"
            data-testid="link-pu-website"
          >
            Visit pu.edu.lb
          </a>
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
          >
            Find Your{" "}
            <span className="text-[hsl(45,90%,55%)]">Perfect Major</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Answer a few questions about your interests and goals, and we'll match you with the programs that fit you best.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 sm:mb-12"
          >
            <Button
              onClick={onStartQuiz}
              size="lg"
              className="bg-[hsl(45,90%,50%)] hover:bg-[hsl(45,85%,45%)] text-[hsl(220,70%,15%)] px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group w-full sm:w-auto max-w-xs sm:max-w-none"
              data-testid="button-start-quiz"
            >
              Start the Quiz
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-white/60 text-xs sm:text-sm mt-3 sm:mt-4">Takes about 5 minutes</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-2xl mx-auto px-2"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(45,90%,55%)]" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">14</div>
              <div className="text-xs sm:text-sm text-white/70">Programs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(45,90%,55%)]" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">6</div>
              <div className="text-xs sm:text-sm text-white/70">Colleges</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(45,90%,55%)]" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">5 min</div>
              <div className="text-xs sm:text-sm text-white/70">Quiz Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[hsl(45,90%,55%)]" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
              <div className="text-xs sm:text-sm text-white/70">Free</div>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="relative z-10 text-center py-4 sm:py-6 text-white/50 text-xs sm:text-sm px-4">
        <p>Phoenicia University - Main Campus, District of Zahrani, South Lebanon</p>
      </footer>
    </section>
  );
}
