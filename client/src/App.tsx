import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Hero from "@/components/Hero";
import Quiz from "@/pages/quiz";
import Results from "@/pages/results";
import puLogoUrl from "@assets/images-1_1767097536565.jpg";
import type { QuizAnswer } from "@/lib/matchingAlgorithm";

type AppState = 'hero' | 'quiz' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);

  const handleStartQuiz = () => {
    setCurrentState('quiz');
  };

  const handleQuizComplete = (answers: QuizAnswer[]) => {
    setQuizAnswers(answers);
    setCurrentState('results');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers([]);
    setCurrentState('quiz');
  };

  const handleBackToHome = () => {
    setQuizAnswers([]);
    setCurrentState('hero');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen">
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center cursor-pointer" onClick={handleBackToHome}>
                  <img 
                    src={puLogoUrl}
                    alt="Phoenicia University Logo" 
                    className="h-10 w-auto"
                  />
                  <span className="ml-3 text-xl font-bold text-gray-800">
                    PU Major Matcher
                  </span>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                  <a 
                    href="https://pu.edu.lb" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    Visit PU
                  </a>
                  <a 
                    href="https://pu.edu.lb/majors-and-degrees" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    All Majors
                  </a>
                  <a
                    href="https://pu.edu.lb/contacts-and-addresses"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Contact Admissions
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          {currentState === 'hero' && <Hero onStartQuiz={handleStartQuiz} />}
          {currentState === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
          {currentState === 'results' && (
            <Results answers={quizAnswers} onRetakeQuiz={handleRetakeQuiz} />
          )}

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-4">Phoenicia University</h4>
                  <p className="text-gray-300 mb-4">
                    Main Campus<br />
                    District of Zahrani<br />
                    South Lebanon
                  </p>
                  <p className="text-gray-300">
                    <i className="fas fa-phone mr-2"></i>
                    +961 7 420 720<br />
                    <i className="fas fa-envelope mr-2"></i>
                    info@pu.edu.lb
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <a 
                        href="https://pu.edu.lb/about-us" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        About PU
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://pu.edu.lb/majors-and-degrees" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        All Majors
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://pu.edu.lb/life-campus" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        Campus Life
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://pu.edu.lb/contacts-and-addresses" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-2xl">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-2xl">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-2xl">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-2xl">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2025 Phoenicia University. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
