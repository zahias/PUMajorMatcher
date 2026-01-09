import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { QuizQuestion } from "@/lib/quizData";
import type { QuizAnswer } from "@/lib/matchingAlgorithm";

interface QuizQuestionProps {
  question: QuizQuestion;
  answer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isLast: boolean;
}

export default function QuizQuestionComponent({
  question,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
  canGoNext,
  isLast
}: QuizQuestionProps) {
  const handleOptionSelect = (value: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => {
    onAnswer({
      questionId: question.id,
      value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-tight">
              {question.question}
            </h2>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {question.options.map((option) => {
              const isSelected = answer?.value === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left flex items-start gap-3 ${
                    isSelected
                      ? 'border-[hsl(220,70%,50%)] bg-[hsl(220,70%,97%)]'
                      : 'border-gray-200 hover:border-[hsl(220,70%,70%)] hover:bg-gray-50'
                  }`}
                  data-testid={`option-${question.id}-${option.value}`}
                >
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isSelected
                      ? 'bg-[hsl(220,70%,50%)] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.value}
                  </span>
                  <span className={`flex-1 text-sm sm:text-base ${
                    isSelected ? 'text-[hsl(220,70%,30%)] font-medium' : 'text-gray-700'
                  }`}>
                    {option.text}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-[hsl(220,70%,50%)] flex-shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-6 sm:mt-8 gap-2">
            <Button
              onClick={onPrevious}
              disabled={!canGoBack}
              variant="outline"
              className="px-3 sm:px-6 py-2 sm:py-3 border-[hsl(220,70%,35%)] text-[hsl(220,70%,35%)] text-sm sm:text-base"
              data-testid="button-previous"
            >
              <span className="hidden sm:inline">← Previous</span>
              <span className="sm:hidden">← Back</span>
            </Button>
            
            <Button
              onClick={onNext}
              disabled={!canGoNext}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base ${
                isLast
                  ? 'bg-[hsl(45,90%,50%)] hover:bg-[hsl(45,85%,45%)] text-[hsl(220,70%,15%)]'
                  : 'bg-[hsl(220,70%,25%)] hover:bg-[hsl(220,70%,20%)] text-white'
              }`}
              data-testid="button-next"
            >
              <span className="hidden sm:inline">{isLast ? 'See Results' : 'Next'} →</span>
              <span className="sm:hidden">{isLast ? 'Results' : 'Next'} →</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
