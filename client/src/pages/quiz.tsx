import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuizProgress from "@/components/QuizProgress";
import QuizQuestionComponent from "@/components/QuizQuestion";
import UserInfoForm from "@/components/UserInfoForm";
import { quizQuestions } from "@/lib/quizData";
import type { QuizAnswer, UserInfo } from "@/lib/matchingAlgorithm";
import { Info } from "lucide-react";

interface QuizProps {
  onComplete: (answers: QuizAnswer[], userInfo: UserInfo) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState<'info' | 'disclaimers' | 'quiz'>('info');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    setStep('disclaimers');
  };

  const handleStartQuiz = () => {
    setStep('quiz');
  };

  const handleAnswer = (answer: QuizAnswer) => {
    const newAnswers = answers.filter(a => a.questionId !== answer.questionId);
    newAnswers.push(answer);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (userInfo) {
        onComplete(answers, userInfo);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const canGoBack = currentQuestionIndex > 0;
  const canGoNext = currentAnswer !== undefined;
  const isLast = currentQuestionIndex === quizQuestions.length - 1;

  if (step === 'info') {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <UserInfoForm onSubmit={handleUserInfoSubmit} />
        </div>
      </section>
    );
  }

  if (step === 'disclaimers') {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[hsl(45,90%,50%)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="w-8 h-8 text-[hsl(220,70%,15%)]" />
              </div>
              <h2 className="text-2xl font-bold text-[hsl(220,30%,15%)] mb-2">
                Before You Start
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-[hsl(220,50%,30%)] text-sm sm:text-base">
                  <span className="font-semibold">Read each question carefully</span> and choose ONE answer that best describes you.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-800 text-sm sm:text-base">
                  <span className="font-semibold">There are no right or wrong answers.</span> Be honest about your preferences.
                </p>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm sm:text-base">
                  Your answers will help identify the <span className="font-semibold">PU undergraduate major</span> that best matches your interests and strengths.
                </p>
              </div>
            </div>

            <div className="text-center text-gray-600 mb-6">
              <p className="text-sm">
                This assessment has <span className="font-semibold">15 questions</span> and takes about <span className="font-semibold">5 minutes</span> to complete.
              </p>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full bg-[hsl(45,90%,50%)] hover:bg-[hsl(45,85%,45%)] text-[hsl(220,70%,15%)] py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start Assessment
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuizProgress 
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
        />

        <AnimatePresence mode="wait">
          <QuizQuestionComponent
            key={currentQuestion.id}
            question={currentQuestion}
            answer={currentAnswer}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
            isLast={isLast}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
