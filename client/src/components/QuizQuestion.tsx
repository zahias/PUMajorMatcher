import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import type { QuizQuestion, QuizOption } from "@/lib/quizData";
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
  const [sliderValue, setSliderValue] = useState<number[]>([
    answer?.type === 'slider' ? (answer.value as number) : 5
  ]);

  const handleOptionSelect = (option: QuizOption) => {
    onAnswer({
      questionId: question.id,
      value: option.value,
      type: 'multiple-choice',
      weight: option.weight
    });
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onAnswer({
      questionId: question.id,
      value: value[0],
      type: 'slider'
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
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{question.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {question.title}
            </h2>
            <p className="text-gray-600">
              {question.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {question.type === 'multiple-choice' && question.options?.map((option, index) => {
              const isSelected = answer?.value === option.value;
              return (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected 
                      ? 'border-[hsl(220,70%,35%)] bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-[hsl(220,70%,45%)]'
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  data-testid={`option-${question.id}-${index}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'border-[hsl(220,70%,35%)] bg-[hsl(220,70%,35%)]' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      <span className="text-lg">{option.text}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {question.type === 'slider' && (
              <div className="px-6">
                <div className="mb-6">
                  <Slider
                    min={question.min}
                    max={question.max}
                    step={1}
                    value={sliderValue}
                    onValueChange={handleSliderChange}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{question.labels?.[0]}</span>
                  <span className="font-medium text-[hsl(220,70%,35%)]">
                    Value: {sliderValue[0]}
                  </span>
                  <span>{question.labels?.[1]}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={onPrevious}
              disabled={!canGoBack}
              variant="outline"
              className="px-6 py-3 border-[hsl(220,70%,35%)] text-[hsl(220,70%,35%)]"
              data-testid="button-previous"
            >
              ← Previous
            </Button>
            
            <div className="flex space-x-2">
              {Array.from({ length: 3 }, (_, i) => (
                <span
                  key={i}
                  className={`inline-block w-3 h-3 rounded-full ${
                    i === 0 ? 'bg-[hsl(220,70%,35%)]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={onNext}
              disabled={!canGoNext}
              className="px-6 py-3 bg-[hsl(220,70%,25%)] hover:bg-[hsl(220,70%,20%)]"
              data-testid="button-next"
            >
              {isLast ? 'Get Results' : 'Next'} →
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
