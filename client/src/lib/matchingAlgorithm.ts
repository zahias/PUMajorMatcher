import type { Major } from "@shared/schema";
import type { QuizQuestion } from "./quizData";

export interface QuizAnswer {
  questionId: number;
  value: string | number;
  type: 'multiple-choice' | 'slider';
  weight?: number;
}

export interface MajorMatch {
  major: Major;
  score: number;
  matchPercentage: number;
  reasons: string[];
}

export function calculateMatches(
  answers: QuizAnswer[],
  questions: QuizQuestion[],
  majors: Major[]
): MajorMatch[] {
  // Initialize scores for each major
  const scores: Record<string, number> = {};
  const matchedKeywords: Record<string, Set<string>> = {};
  
  majors.forEach(major => {
    scores[major.key] = 0;
    matchedKeywords[major.key] = new Set();
  });

  // Calculate scores based on answers
  answers.forEach((answer, index) => {
    const question = questions[index];
    if (!question) return;

    if (answer.type === 'multiple-choice' && answer.weight) {
      // Direct keyword matching for multiple choice
      majors.forEach(major => {
        if (major.keywords.includes(answer.value as string)) {
          scores[major.key] += answer.weight!;
          matchedKeywords[major.key].add(answer.value as string);
        }
      });
    } else if (answer.type === 'slider' && question.weight_map) {
      // Handle slider scoring based on weight_map
      const value = answer.value as number;
      Object.keys(question.weight_map).forEach(range => {
        const [min, max] = range.split('-').map(Number);
        if (value >= min && value <= max) {
          question.weight_map![range].forEach(scoreItem => {
            majors.forEach(major => {
              if (major.keywords.includes(scoreItem.value)) {
                scores[major.key] += scoreItem.weight;
                matchedKeywords[major.key].add(scoreItem.value);
              }
            });
          });
        }
      });
    }
  });

  // Calculate max score for percentage calculation
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  const scoreRange = maxScore - minScore || 1;

  // Create match results with reasons
  const matches: MajorMatch[] = majors.map(major => {
    const score = scores[major.key];
    const matchPercentage = Math.round(((score - minScore) / scoreRange) * 100);
    
    // Generate reasons based on matched keywords
    const reasons = generateMatchReasons(major, matchedKeywords[major.key]);
    
    return {
      major,
      score,
      matchPercentage: Math.max(matchPercentage, 10), // Minimum 10% to avoid 0%
      reasons
    };
  });

  // Sort by score descending
  return matches.sort((a, b) => b.score - a.score);
}

function generateMatchReasons(major: Major, matchedKeywords: Set<string>): string[] {
  const reasons: string[] = [];
  
  const keywordReasons: Record<string, string> = {
    'technology': 'You show strong interest in technology and digital solutions',
    'creative': 'Your creative nature aligns well with this field',
    'helping': 'Your desire to help others matches this career path',
    'business': 'Your business mindset fits well with this program',
    'analytical': 'Your analytical thinking skills are perfect for this field',
    'design': 'Your design interests align with this program',
    'healthcare': 'Your interest in healthcare makes this a great fit',
    'research': 'Your research interests match this academic path',
    'communication': 'Your communication skills are valuable in this field',
    'leadership': 'Your leadership qualities suit this career path',
    'engineering': 'Your technical and problem-solving skills fit engineering',
    'science': 'Your scientific interests align with this program',
    'innovation': 'Your innovative mindset matches this field',
    'people-oriented': 'Your people skills are essential for this career',
    'hands-on': 'Your practical approach suits this hands-on field'
  };

  // Add reasons based on matched keywords
  Array.from(matchedKeywords).forEach(keyword => {
    if (keywordReasons[keyword]) {
      reasons.push(keywordReasons[keyword]);
    }
  });

  // Add program-specific reasons
  if (major.key === 'computer-science' && matchedKeywords.has('technology')) {
    reasons.push('The program\'s focus on AI and software development matches your interests');
  }
  if (major.key === 'architecture' && matchedKeywords.has('creative')) {
    reasons.push('The creative design aspects appeal to your artistic nature');
  }
  if (major.key === 'nursing' && matchedKeywords.has('helping')) {
    reasons.push('Your compassionate nature is perfect for healthcare');
  }
  if (major.key === 'business-administration' && matchedKeywords.has('leadership')) {
    reasons.push('Your leadership skills align with business management roles');
  }

  // Ensure at least one reason
  if (reasons.length === 0) {
    reasons.push('This program offers diverse career opportunities that may interest you');
  }

  return reasons.slice(0, 3); // Limit to 3 reasons
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
