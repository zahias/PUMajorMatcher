import { majorCategories, type OptionLetter, type MajorCategory } from "./quizData";

export interface QuizAnswer {
  questionId: number;
  value: OptionLetter;
}

export interface UserInfo {
  fullName: string;
  contactNumber: string;
  email: string;
  highSchool: string;
}

export interface MajorMatch {
  category: MajorCategory;
  count: number;
  matchPercentage: number;
  reasons: string[];
}

export function calculateMatches(answers: QuizAnswer[]): MajorMatch[] {
  const counts: Record<OptionLetter, number> = {
    'A': 0,
    'B': 0,
    'C': 0,
    'D': 0,
    'E': 0,
    'F': 0
  };

  answers.forEach(answer => {
    counts[answer.value]++;
  });

  const totalQuestions = answers.length;

  const matches: MajorMatch[] = majorCategories.map(category => {
    const count = counts[category.letter];
    const matchPercentage = Math.round((count / totalQuestions) * 100);
    const reasons = generateMatchReasons(category, count, totalQuestions);

    return {
      category,
      count,
      matchPercentage,
      reasons
    };
  });

  return matches.sort((a, b) => b.count - a.count);
}

function generateMatchReasons(category: MajorCategory, count: number, total: number): string[] {
  const reasons: string[] = [];
  const percentage = Math.round((count / total) * 100);

  const categoryReasons: Record<OptionLetter, string[]> = {
    'A': [
      'You show strong leadership and organizational abilities',
      'Your decision-making skills align well with business careers',
      'You thrive in structured, goal-oriented environments'
    ],
    'B': [
      'You have excellent communication and creative expression skills',
      'Your ability to influence and connect with audiences is notable',
      'You enjoy creating content and sharing ideas'
    ],
    'C': [
      'Your analytical and logical thinking skills are exceptional',
      'You enjoy solving complex technical problems',
      'You have a strong interest in technology and systems'
    ],
    'D': [
      'Your visual imagination and design skills stand out',
      'You enjoy creating and visualizing spaces',
      'Your creative approach to problem-solving is evident'
    ],
    'E': [
      'You have a genuine passion for helping others',
      'Your empathy and patience make you well-suited for healthcare',
      'You care deeply about people\'s wellbeing'
    ],
    'F': [
      'Your critical thinking and judgment skills are strong',
      'You enjoy analyzing issues and defending positions',
      'Your interest in justice and fairness is evident'
    ]
  };

  if (percentage >= 40) {
    reasons.push(...categoryReasons[category.letter].slice(0, 3));
  } else if (percentage >= 25) {
    reasons.push(...categoryReasons[category.letter].slice(0, 2));
  } else if (percentage > 0) {
    reasons.push(categoryReasons[category.letter][0]);
  } else {
    reasons.push('This field could offer interesting opportunities for growth');
  }

  return reasons;
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
