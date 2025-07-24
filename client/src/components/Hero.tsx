import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface HeroProps {
  onStartQuiz: () => void;
}

export default function Hero({ onStartQuiz }: HeroProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
            alt="High school students taking quiz together" 
            className="mx-auto rounded-2xl shadow-2xl w-full max-w-2xl h-64 object-cover"
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Discover Your Perfect Major at{" "}
          <span className="text-yellow-300">Phoenicia University</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 opacity-90"
        >
          Take our fun interactive quiz and find the major that matches your interests, skills, and career dreams!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            onClick={onStartQuiz}
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-full text-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
          >
            <i className="fas fa-play mr-2"></i>
            Start Your Journey
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <Card className="bg-white bg-opacity-20 backdrop-blur-sm border-white border-opacity-30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">14</div>
              <div className="text-sm opacity-90">Programs</div>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-20 backdrop-blur-sm border-white border-opacity-30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">6</div>
              <div className="text-sm opacity-90">Colleges</div>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-20 backdrop-blur-sm border-white border-opacity-30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">5min</div>
              <div className="text-sm opacity-90">Quiz Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white bg-opacity-20 backdrop-blur-sm border-white border-opacity-30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-90">Free</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
