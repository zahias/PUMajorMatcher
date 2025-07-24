import { majors, quizResults, type Major, type InsertMajor, type QuizResult, type InsertQuizResult } from "@shared/schema";

export interface IStorage {
  getMajors(): Promise<Major[]>;
  getMajorByKey(key: string): Promise<Major | undefined>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResult(sessionId: string): Promise<QuizResult | undefined>;
}

export class MemStorage implements IStorage {
  private majors: Map<number, Major>;
  private quizResults: Map<number, QuizResult>;
  private majorCurrentId: number;
  private quizCurrentId: number;

  constructor() {
    this.majors = new Map();
    this.quizResults = new Map();
    this.majorCurrentId = 1;
    this.quizCurrentId = 1;
    this.initializeMajors();
  }

  private initializeMajors() {
    const puMajors: InsertMajor[] = [
      {
        key: 'computer-science',
        name: 'Bachelor of Science in Computer Science',
        college: 'College of Arts and Sciences',
        description: 'Focus on algorithms, software development, AI, and problem-solving through hands-on learning including software engineering, web development, operating systems and networking.',
        careers: ['Software Developer', 'AI Engineer', 'Data Scientist', 'Web Developer', 'Systems Engineer'],
        icon: '💻',
        url: 'https://pu.edu.lb/bachelor-science-computer-science',
        keywords: ['technology', 'programming', 'problem-solving', 'innovation', 'analytical', 'logical', 'digital'],
        degree_type: 'Bachelor'
      },
      {
        key: 'business-administration',
        name: 'Bachelor of Business Administration',
        college: 'College of Business',
        description: 'Comprehensive business education with concentrations in Accounting & Finance, Marketing & Entrepreneurship, Operations & Human Capital Management.',
        careers: ['Business Manager', 'Marketing Specialist', 'Financial Analyst', 'Entrepreneur', 'Operations Manager'],
        icon: '📊',
        url: 'https://pu.edu.lb/bachelor-business-administration',
        keywords: ['leadership', 'business', 'management', 'entrepreneurship', 'communication', 'strategic', 'finance'],
        degree_type: 'Bachelor'
      },
      {
        key: 'architecture',
        name: 'Bachelor of Architecture',
        college: 'College of Architecture and Design',
        description: 'Comprehensive design education covering structural principles, design theory, architectural history, construction techniques, and visual representation.',
        careers: ['Architect', 'Urban Planner', 'Design Consultant', 'Construction Manager', 'Interior Designer'],
        icon: '🏗️',
        url: 'https://pu.edu.lb/bachelor-architecture',
        keywords: ['creative', 'design', 'spatial', 'artistic', 'technical', 'visual', 'construction'],
        degree_type: 'Bachelor'
      },
      {
        key: 'nursing',
        name: 'Bachelor of Science in Nursing',
        college: 'College of Public Health',
        description: 'Professional healthcare education preparing compassionate and skilled nursing professionals for modern healthcare environments.',
        careers: ['Registered Nurse', 'Healthcare Manager', 'Public Health Specialist', 'Clinical Researcher', 'Nurse Practitioner'],
        icon: '🏥',
        url: 'https://pu.edu.lb/bachelor-science-nursing-program',
        keywords: ['helping', 'healthcare', 'compassionate', 'science', 'people-oriented', 'medical', 'caring'],
        degree_type: 'Bachelor'
      },
      {
        key: 'civil-engineering',
        name: 'Bachelor of Engineering in Civil and Environmental Engineering',
        college: 'College of Engineering',
        description: 'Engineering solutions for infrastructure, construction, and environmental challenges with focus on sustainable development.',
        careers: ['Civil Engineer', 'Environmental Engineer', 'Project Manager', 'Construction Engineer', 'Infrastructure Specialist'],
        icon: '🌉',
        url: 'https://pu.edu.lb/bachelor-engineering-civil-and-environmental-engineering',
        keywords: ['building', 'infrastructure', 'environmental', 'technical', 'problem-solving', 'construction', 'engineering'],
        degree_type: 'Bachelor'
      },
      {
        key: 'electrical-engineering',
        name: 'Bachelor of Engineering in Electrical and Communication Engineering',
        college: 'College of Engineering',
        description: 'Focus on electrical systems, telecommunications, and communication technologies for the digital age.',
        careers: ['Electrical Engineer', 'Telecommunications Engineer', 'Systems Engineer', 'Technology Consultant', 'Network Engineer'],
        icon: '⚡',
        url: 'https://pu.edu.lb/bachelor-engineering-electrical-and-communication-engineering',
        keywords: ['technology', 'electrical', 'communication', 'systems', 'innovation', 'digital', 'engineering'],
        degree_type: 'Bachelor'
      },
      {
        key: 'mechanical-engineering',
        name: 'Bachelor of Engineering in Mechanical Engineering',
        college: 'College of Engineering',
        description: 'Design and development of mechanical systems, machines, and manufacturing processes with hands-on learning approach.',
        careers: ['Mechanical Engineer', 'Manufacturing Engineer', 'Product Designer', 'Automotive Engineer', 'Quality Engineer'],
        icon: '⚙️',
        url: 'https://pu.edu.lb/bachelor-engineering-mechanical-engineering',
        keywords: ['mechanical', 'design', 'manufacturing', 'technical', 'hands-on', 'engineering', 'innovation'],
        degree_type: 'Bachelor'
      },
      {
        key: 'petroleum-engineering',
        name: 'Bachelor of Engineering in Petroleum Engineering',
        college: 'College of Engineering',
        description: 'Specialized training in oil and gas exploration, extraction, and production technologies for the energy sector.',
        careers: ['Petroleum Engineer', 'Reservoir Engineer', 'Drilling Engineer', 'Energy Consultant', 'Production Engineer'],
        icon: '🛢️',
        url: 'https://pu.edu.lb/bachelor-engineering-petroleum-engineering',
        keywords: ['energy', 'technical', 'analytical', 'specialized', 'industry', 'engineering', 'resources'],
        degree_type: 'Bachelor'
      },
      {
        key: 'public-health',
        name: 'Bachelor of Science in Public Health',
        college: 'College of Public Health',
        description: 'Focus on community health, disease prevention, healthcare policy and management for population wellness.',
        careers: ['Public Health Specialist', 'Health Policy Analyst', 'Community Health Worker', 'Epidemiologist', 'Health Educator'],
        icon: '🌍',
        url: 'https://pu.edu.lb/bachelor-science-public-health',
        keywords: ['community', 'health', 'helping', 'research', 'policy', 'prevention', 'social'],
        degree_type: 'Bachelor'
      },
      {
        key: 'communication',
        name: 'Bachelor of Arts in Communication and Social Media',
        college: 'College of Arts and Sciences',
        description: 'Modern communication strategies, digital media, and social media management for the connected world.',
        careers: ['Social Media Manager', 'Communications Specialist', 'Digital Marketer', 'Content Creator', 'Public Relations Manager'],
        icon: '📱',
        url: 'https://pu.edu.lb/bachelor-arts-communication-and-social-media',
        keywords: ['creative', 'communication', 'media', 'social', 'digital', 'marketing', 'content'],
        degree_type: 'Bachelor'
      },
      {
        key: 'speech-therapy',
        name: 'Bachelor of Arts in Speech Therapy',
        college: 'College of Arts and Sciences',
        description: 'Specialized training in speech and language disorders, therapeutic interventions for communication improvement.',
        careers: ['Speech Therapist', 'Language Pathologist', 'Rehabilitation Specialist', 'Clinical Therapist', 'Special Education Teacher'],
        icon: '🗣️',
        url: 'https://pu.edu.lb/bachelor-arts-speech-therapy',
        keywords: ['helping', 'healthcare', 'communication', 'therapy', 'people-oriented', 'medical', 'rehabilitation'],
        degree_type: 'Bachelor'
      },
      {
        key: 'law',
        name: 'Bachelor of Laws',
        college: 'College of Law and Political Science',
        description: 'Comprehensive legal education covering civil, commercial, and international law with critical thinking focus.',
        careers: ['Lawyer', 'Legal Consultant', 'Judge', 'Legal Researcher', 'Corporate Counsel'],
        icon: '⚖️',
        url: 'https://pu.edu.lb/bachelor-law',
        keywords: ['analytical', 'justice', 'communication', 'research', 'advocacy', 'logical', 'debate'],
        degree_type: 'Bachelor'
      },
      {
        key: 'mba',
        name: 'Master of Business Administration',
        college: 'College of Business',
        description: 'Advanced business leadership and management education for experienced professionals seeking executive roles.',
        careers: ['Executive Manager', 'Business Consultant', 'CEO', 'Strategic Planner', 'Director'],
        icon: '🎓',
        url: 'https://pu.edu.lb/master-business-administration',
        keywords: ['leadership', 'advanced', 'management', 'strategic', 'business', 'executive', 'professional'],
        degree_type: 'Master'
      },
      {
        key: 'llm',
        name: 'Master of Laws (LL.M.)',
        college: 'College of Law and Political Science',
        description: 'Advanced legal studies in commercial regulation, litigation, and arbitration for legal professionals.',
        careers: ['Senior Lawyer', 'Legal Specialist', 'Arbitrator', 'Legal Academic', 'International Law Expert'],
        icon: '📚',
        url: 'https://pu.edu.lb/master-laws-llm-commercial-regulation-litigation-and-arbitration',
        keywords: ['advanced', 'specialized', 'legal', 'research', 'expert', 'professional', 'analytical'],
        degree_type: 'Master'
      }
    ];

    puMajors.forEach(major => {
      const id = this.majorCurrentId++;
      this.majors.set(id, { ...major, id });
    });
  }

  async getMajors(): Promise<Major[]> {
    return Array.from(this.majors.values());
  }

  async getMajorByKey(key: string): Promise<Major | undefined> {
    return Array.from(this.majors.values()).find(major => major.key === key);
  }

  async createQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = this.quizCurrentId++;
    const result: QuizResult = { ...insertResult, id };
    this.quizResults.set(id, result);
    return result;
  }

  async getQuizResult(sessionId: string): Promise<QuizResult | undefined> {
    return Array.from(this.quizResults.values()).find(
      result => result.session_id === sessionId
    );
  }
}

export const storage = new MemStorage();
