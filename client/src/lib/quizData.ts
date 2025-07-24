export interface QuizOption {
  text: string;
  value: string;
  weight: number;
}

export interface QuizQuestion {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  type: 'multiple-choice' | 'slider';
  options?: QuizOption[];
  min?: number;
  max?: number;
  labels?: [string, string];
  weight_map?: Record<string, Array<{ value: string; weight: number }>>;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    icon: '🎯',
    title: 'What activities do you enjoy most in your free time?',
    subtitle: 'Choose the option that best describes your interests',
    type: 'multiple-choice',
    options: [
      { text: 'Playing video games and exploring new apps', value: 'technology', weight: 3 },
      { text: 'Drawing, designing, or creating art', value: 'creative', weight: 3 },
      { text: 'Volunteering and helping others', value: 'helping', weight: 3 },
      { text: 'Reading about business news and startups', value: 'business', weight: 3 }
    ]
  },
  {
    id: 2,
    icon: '🧠',
    title: 'How do you prefer to solve problems?',
    subtitle: 'Think about your approach to challenges',
    type: 'multiple-choice',
    options: [
      { text: 'Break it down into logical steps and analyze systematically', value: 'analytical', weight: 3 },
      { text: 'Brainstorm creative and innovative approaches', value: 'creative', weight: 3 },
      { text: 'Research thoroughly and consider all perspectives', value: 'research', weight: 3 },
      { text: 'Collaborate with others to find team solutions', value: 'communication', weight: 3 }
    ]
  },
  {
    id: 3,
    icon: '💼',
    title: 'What work environment appeals to you most?',
    subtitle: 'Imagine your ideal workplace',
    type: 'multiple-choice',
    options: [
      { text: 'Modern tech office with cutting-edge equipment', value: 'technology', weight: 2 },
      { text: 'Design studio with creative freedom', value: 'creative', weight: 2 },
      { text: 'Hospital or clinic helping patients', value: 'healthcare', weight: 2 },
      { text: 'Corporate office leading business decisions', value: 'business', weight: 2 }
    ]
  },
  {
    id: 4,
    icon: '🎓',
    title: 'Which school subjects did you excel in or enjoy most?',
    subtitle: 'Think about your academic strengths',
    type: 'multiple-choice',
    options: [
      { text: 'Mathematics and Computer Science', value: 'analytical', weight: 3 },
      { text: 'Art, Design, and Creative Writing', value: 'creative', weight: 3 },
      { text: 'Biology, Chemistry, and Health Sciences', value: 'science', weight: 3 },
      { text: 'History, Economics, and Social Studies', value: 'research', weight: 3 }
    ]
  },
  {
    id: 5,
    icon: '🚀',
    title: 'What motivates you most in life?',
    subtitle: 'Choose what drives your passion',
    type: 'multiple-choice',
    options: [
      { text: 'Creating innovative solutions that change the world', value: 'innovation', weight: 3 },
      { text: 'Making a positive impact on people\'s lives', value: 'helping', weight: 3 },
      { text: 'Building successful businesses and leading teams', value: 'leadership', weight: 3 },
      { text: 'Designing beautiful and functional spaces', value: 'design', weight: 3 }
    ]
  },
  {
    id: 6,
    icon: '🔧',
    title: 'How do you like to work with your hands?',
    subtitle: 'Consider your practical skills preference',
    type: 'multiple-choice',
    options: [
      { text: 'Building and programming computers', value: 'technical', weight: 2 },
      { text: 'Creating architectural models and drawings', value: 'design', weight: 2 },
      { text: 'Working with mechanical parts and engines', value: 'mechanical', weight: 2 },
      { text: 'I prefer working with ideas rather than hands-on tasks', value: 'analytical', weight: 2 }
    ]
  },
  {
    id: 7,
    icon: '🌍',
    title: 'Which global issue matters most to you?',
    subtitle: 'Think about causes you care about',
    type: 'multiple-choice',
    options: [
      { text: 'Digital divide and technology access', value: 'technology', weight: 2 },
      { text: 'Environmental protection and sustainability', value: 'environmental', weight: 2 },
      { text: 'Healthcare access and public health', value: 'healthcare', weight: 2 },
      { text: 'Economic inequality and social justice', value: 'justice', weight: 2 }
    ]
  },
  {
    id: 8,
    icon: '💡',
    title: 'How do you prefer to communicate ideas?',
    subtitle: 'Consider your communication style',
    type: 'multiple-choice',
    options: [
      { text: 'Through code, apps, and digital solutions', value: 'technology', weight: 2 },
      { text: 'Through visual designs and presentations', value: 'creative', weight: 2 },
      { text: 'Through written reports and research', value: 'research', weight: 2 },
      { text: 'Through public speaking and social media', value: 'communication', weight: 2 }
    ]
  },
  {
    id: 9,
    icon: '⭐',
    title: 'What type of impact do you want to make?',
    subtitle: 'Think about your desired legacy',
    type: 'multiple-choice',
    options: [
      { text: 'Develop technology that improves daily life', value: 'innovation', weight: 3 },
      { text: 'Create beautiful buildings and spaces', value: 'design', weight: 3 },
      { text: 'Help people recover from illness or injury', value: 'helping', weight: 3 },
      { text: 'Build businesses that create jobs', value: 'entrepreneurship', weight: 3 }
    ]
  },
  {
    id: 10,
    icon: '🎨',
    title: 'How important is creativity in your ideal career?',
    subtitle: 'Rate the role of creative expression',
    type: 'slider',
    min: 1,
    max: 10,
    labels: ['Not important', 'Very important'],
    weight_map: {
      '1-3': [{ value: 'analytical', weight: 2 }, { value: 'technical', weight: 2 }],
      '4-6': [{ value: 'business', weight: 1 }, { value: 'research', weight: 1 }],
      '7-10': [{ value: 'creative', weight: 3 }, { value: 'design', weight: 3 }]
    }
  },
  {
    id: 11,
    icon: '🤝',
    title: 'How much do you enjoy working with people?',
    subtitle: 'Consider your people interaction preference',
    type: 'slider',
    min: 1,
    max: 10,
    labels: ['Prefer working alone', 'Love working with people'],
    weight_map: {
      '1-3': [{ value: 'analytical', weight: 2 }, { value: 'research', weight: 2 }],
      '4-6': [{ value: 'business', weight: 1 }, { value: 'technical', weight: 1 }],
      '7-10': [{ value: 'helping', weight: 3 }, { value: 'communication', weight: 3 }]
    }
  },
  {
    id: 12,
    icon: '🔬',
    title: 'How interested are you in scientific research?',
    subtitle: 'Rate your interest in discovery and analysis',
    type: 'slider',
    min: 1,
    max: 10,
    labels: ['Not interested', 'Very interested'],
    weight_map: {
      '1-3': [{ value: 'creative', weight: 2 }, { value: 'business', weight: 2 }],
      '4-6': [{ value: 'communication', weight: 1 }, { value: 'design', weight: 1 }],
      '7-10': [{ value: 'science', weight: 3 }, { value: 'research', weight: 3 }]
    }
  }
];
