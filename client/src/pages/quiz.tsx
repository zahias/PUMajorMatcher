import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import QuizProgress from "@/components/QuizProgress";
import QuizQuestionComponent from "@/components/QuizQuestion";
import { quizQuestions } from "@/lib/quizData";
import type { QuizAnswer } from "@/lib/matchingAlgorithm";

interface QuizProps {
  onComplete: (answers: QuizAnswer[]) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const handleAnswer = (answer: QuizAnswer) => {
    const newAnswers = answers.filter(a => a.questionId !== answer.questionId);
    newAnswers.push(answer);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Complete the quiz
      onComplete(answers);
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

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
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
