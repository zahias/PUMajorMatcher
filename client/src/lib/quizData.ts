export interface QuizOption {
  text: string;
  value: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which activity do you enjoy the most?",
    options: [
      { text: "Organizing people, plans, or projects", value: "A" },
      { text: "Writing, speaking, or creating media content", value: "B" },
      { text: "Solving technical or logical problems", value: "C" },
      { text: "Designing or visualizing ideas", value: "D" },
      { text: "Caring for or supporting people's health", value: "E" },
      { text: "Debating issues or defending opinions", value: "F" }
    ]
  },
  {
    id: 2,
    question: "Which school subject do you enjoy most?",
    options: [
      { text: "Business studies or economics", value: "A" },
      { text: "English, media, or languages", value: "B" },
      { text: "Mathematics, physics, or computer science", value: "C" },
      { text: "Art, design, or technical drawing", value: "D" },
      { text: "Biology or health sciences", value: "E" },
      { text: "Civics, history, or social studies", value: "F" }
    ]
  },
  {
    id: 3,
    question: "In a group project, you usually:",
    options: [
      { text: "Lead and organize tasks", value: "A" },
      { text: "Present ideas and communicate", value: "B" },
      { text: "Handle technical or analytical work", value: "C" },
      { text: "Create visuals or designs", value: "D" },
      { text: "Support team members' wellbeing", value: "E" },
      { text: "Analyze rules, instructions, or arguments", value: "F" }
    ]
  },
  {
    id: 4,
    question: "What kind of problems interest you the most?",
    options: [
      { text: "How to improve a business or organization", value: "A" },
      { text: "How to communicate ideas effectively", value: "B" },
      { text: "How systems or technology work", value: "C" },
      { text: "How spaces or designs can be improved", value: "D" },
      { text: "How health and care can be improved", value: "E" },
      { text: "How laws, rights, or rules apply", value: "F" }
    ]
  },
  {
    id: 5,
    question: "Which work environment appeals to you most?",
    options: [
      { text: "Corporate office or startup", value: "A" },
      { text: "Media or communication agency", value: "B" },
      { text: "Technology or engineering firm", value: "C" },
      { text: "Architecture or design studio", value: "D" },
      { text: "Hospital, clinic, or health organization", value: "E" },
      { text: "Court, legal office, or public institution", value: "F" }
    ]
  },
  {
    id: 6,
    question: "What personal skill describes you best?",
    options: [
      { text: "Leadership and decision-making", value: "A" },
      { text: "Communication and creativity", value: "B" },
      { text: "Analytical and logical thinking", value: "C" },
      { text: "Visual imagination", value: "D" },
      { text: "Empathy and patience", value: "E" },
      { text: "Critical thinking and judgment", value: "F" }
    ]
  },
  {
    id: 7,
    question: "Which statement best describes you?",
    options: [
      { text: "I enjoy managing people and responsibilities", value: "A" },
      { text: "I enjoy influencing opinions and audiences", value: "B" },
      { text: "I enjoy understanding systems and technology", value: "C" },
      { text: "I enjoy creating visual concepts", value: "D" },
      { text: "I enjoy helping people feel better", value: "E" },
      { text: "I enjoy analyzing issues and arguments", value: "F" }
    ]
  },
  {
    id: 8,
    question: "Which task would you enjoy the most?",
    options: [
      { text: "Managing a project or business plan", value: "A" },
      { text: "Creating a presentation or media campaign", value: "B" },
      { text: "Building or programming something", value: "C" },
      { text: "Designing a structure or space", value: "D" },
      { text: "Assisting patients or communities", value: "E" },
      { text: "Studying a case or legal situation", value: "F" }
    ]
  },
  {
    id: 9,
    question: "You feel most confident when you are:",
    options: [
      { text: "Making decisions", value: "A" },
      { text: "Speaking or writing clearly", value: "B" },
      { text: "Working with numbers or systems", value: "C" },
      { text: "Sketching or visualizing ideas", value: "D" },
      { text: "Caring for others", value: "E" },
      { text: "Defending your point of view", value: "F" }
    ]
  },
  {
    id: 10,
    question: "Which career field sounds most interesting to you?",
    options: [
      { text: "Business and management", value: "A" },
      { text: "Communication and media", value: "B" },
      { text: "Technology or engineering", value: "C" },
      { text: "Architecture and design", value: "D" },
      { text: "Healthcare", value: "E" },
      { text: "Law and legal studies", value: "F" }
    ]
  },
  {
    id: 11,
    question: "When facing a challenge, you prefer to:",
    options: [
      { text: "Plan and organize solutions", value: "A" },
      { text: "Communicate and persuade", value: "B" },
      { text: "Analyze and test solutions", value: "C" },
      { text: "Redesign and improve visually", value: "D" },
      { text: "Care and support people", value: "E" },
      { text: "Apply rules and reasoning", value: "F" }
    ]
  },
  {
    id: 12,
    question: "Which environment do you prefer studying in?",
    options: [
      { text: "Structured and goal-oriented", value: "A" },
      { text: "Interactive and expressive", value: "B" },
      { text: "Technical and problem-focused", value: "C" },
      { text: "Creative and design-oriented", value: "D" },
      { text: "Caring and people-focused", value: "E" },
      { text: "Formal and rule-based", value: "F" }
    ]
  },
  {
    id: 13,
    question: "What motivates you the most?",
    options: [
      { text: "Achievement and leadership", value: "A" },
      { text: "Expression and influence", value: "B" },
      { text: "Innovation and problem-solving", value: "C" },
      { text: "Creativity and design", value: "D" },
      { text: "Helping others", value: "E" },
      { text: "Justice and fairness", value: "F" }
    ]
  },
  {
    id: 14,
    question: "Your future work should mainly involve:",
    options: [
      { text: "Managing and organizing", value: "A" },
      { text: "Communicating ideas", value: "B" },
      { text: "Solving technical problems", value: "C" },
      { text: "Designing and planning", value: "D" },
      { text: "Caring for people", value: "E" },
      { text: "Applying laws and regulations", value: "F" }
    ]
  },
  {
    id: 15,
    question: "Which statement fits you best?",
    options: [
      { text: "I want to lead or manage organizations", value: "A" },
      { text: "I want to influence people through communication", value: "B" },
      { text: "I want to work with technology or engineering", value: "C" },
      { text: "I want to design buildings or spaces", value: "D" },
      { text: "I want to work in health or care services", value: "E" },
      { text: "I want to work in law or legal institutions", value: "F" }
    ]
  }
];

export type OptionLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface MajorCategory {
  letter: OptionLetter;
  name: string;
  majors: string[];
  icon: string;
  college: string;
}

export const majorCategories: MajorCategory[] = [
  {
    letter: 'A',
    name: 'Business Administration',
    majors: ['Business Administration'],
    icon: '💼',
    college: 'College of Business'
  },
  {
    letter: 'B',
    name: 'Communication & Media',
    majors: ['Communication & Media'],
    icon: '📱',
    college: 'College of Arts & Sciences'
  },
  {
    letter: 'C',
    name: 'Computer Science / Engineering',
    majors: ['Computer Science', 'Engineering'],
    icon: '💻',
    college: 'College of Engineering'
  },
  {
    letter: 'D',
    name: 'Architecture',
    majors: ['Architecture'],
    icon: '🏛️',
    college: 'College of Architecture'
  },
  {
    letter: 'E',
    name: 'Health Sciences',
    majors: ['Nursing', 'Public Health', 'Speech Therapy'],
    icon: '🏥',
    college: 'College of Health Sciences'
  },
  {
    letter: 'F',
    name: 'Law',
    majors: ['Law'],
    icon: '⚖️',
    college: 'College of Law'
  }
];
