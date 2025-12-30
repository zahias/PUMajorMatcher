import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MajorCard from "@/components/MajorCard";
import { motion } from "framer-motion";
import { calculateMatches, generateSessionId } from "@/lib/matchingAlgorithm";
import { quizQuestions } from "@/lib/quizData";
import type { QuizAnswer, MajorMatch } from "@/lib/matchingAlgorithm";
import type { Major } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface ResultsProps {
  answers: QuizAnswer[];
  onRetakeQuiz: () => void;
}

export default function Results({ answers, onRetakeQuiz }: ResultsProps) {
  const [matches, setMatches] = useState<MajorMatch[]>([]);
  const [sessionId] = useState(() => generateSessionId());

  const { data: majors, isLoading } = useQuery<Major[]>({
    queryKey: ['/api/majors'],
  });

  useEffect(() => {
    if (majors && answers.length > 0) {
      const calculatedMatches = calculateMatches(answers, quizQuestions, majors);
      setMatches(calculatedMatches);
      
      // Save results to backend
      saveResults(calculatedMatches);
    }
  }, [majors, answers]);

  const saveResults = async (matches: MajorMatch[]) => {
    try {
      await apiRequest("POST", "/api/quiz-results", {
        session_id: sessionId,
        answers,
        top_matches: matches.slice(0, 3).map(m => m.major.key),
        scores: matches.reduce((acc, match) => ({
          ...acc,
          [match.major.key]: match.score
        }), {}),
        created_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to save quiz results:', error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'My PU Major Match Results',
      text: `I just found my perfect major at Phoenicia University! My top match is ${matches[0]?.major.name}. Take the quiz to find yours!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Results link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(220,70%,35%)] mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your matches...</p>
        </div>
      </div>
    );
  }

  const topMatches = matches.slice(0, 3);
  const otherMatches = matches.slice(3);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-[hsl(220,70%,25%)] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎓</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(220,30%,15%)] mb-4">
            Your Perfect Matches
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your answers, here are the top 3 majors that align with your interests and goals
          </p>
        </motion.div>

        {/* Top 3 Matches */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {topMatches.map((match, index) => (
            <MajorCard
              key={match.major.key}
              match={match}
              rank={index + 1}
              isTopMatch={index === 0}
            />
          ))}
        </motion.div>

        {/* Other Programs */}
        {otherMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Explore All Our Programs
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherMatches.map((match, index) => (
                    <div key={match.major.key} className="bg-gray-50 rounded-lg p-4 hover:bg-white hover:shadow-md transition-all">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{match.major.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {match.major.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {match.major.college}
                          </p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">Match</span>
                          <span className="text-xs font-bold text-gray-700">
                            {match.matchPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-gray-400 h-1 rounded-full transition-all duration-500"
                            style={{ width: `${match.matchPercentage}%` }}
                          />
                        </div>
                      </div>
                      <a 
                        href={match.major.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[hsl(220,70%,35%)] hover:text-[hsl(220,70%,25%)] text-sm font-medium transition-colors"
                        data-testid={`link-major-${match.major.key}`}
                      >
                        Learn More →
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <Button
            onClick={onRetakeQuiz}
            variant="outline"
            className="w-full sm:w-auto border-[hsl(220,70%,35%)] text-[hsl(220,70%,35%)] hover:bg-[hsl(220,70%,35%)] hover:text-white px-8 py-3"
            data-testid="button-retake-quiz"
          >
            Retake Quiz
          </Button>
          <Button
            onClick={handleShare}
            className="w-full sm:w-auto bg-[hsl(45,90%,50%)] hover:bg-[hsl(45,85%,45%)] text-[hsl(220,70%,15%)] px-8 py-3"
            data-testid="button-share-results"
          >
            Share Results
          </Button>
          <Button
            asChild
            className="w-full sm:w-auto bg-[hsl(220,70%,25%)] hover:bg-[hsl(220,70%,20%)] text-white px-8 py-3"
          >
            <a href="https://pu.edu.lb/contacts-and-addresses" target="_blank" rel="noopener noreferrer" data-testid="link-contact-admissions">
              Contact Admissions
            </a>
          </Button>
        </motion.div>

        {/* About PU Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    Why Choose Phoenicia University?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-[hsl(220,70%,25%)] text-white rounded-full p-2 mr-4 flex-shrink-0">
                        <span className="block w-4 h-4">🎓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Academic Excellence</h4>
                        <p className="text-gray-600">Licensed by Lebanon's Ministry of Education with rigorous international standards</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[hsl(220,60%,35%)] text-white rounded-full p-2 mr-4 flex-shrink-0">
                        <span className="block w-4 h-4">📍</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Strategic Location</h4>
                        <p className="text-gray-600">Just 40 minutes from Beirut International Airport in beautiful Southern Lebanon</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-[hsl(45,90%,50%)] text-[hsl(220,70%,15%)] rounded-full p-2 mr-4 flex-shrink-0">
                        <span className="block w-4 h-4">👥</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Job-Ready Graduates</h4>
                        <p className="text-gray-600">Student-centered approach preparing you for competitive career success</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:text-right">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                    alt="University students in different majors studying" 
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
