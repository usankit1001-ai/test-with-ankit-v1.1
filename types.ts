
export interface Skill {
  id: string;
  name: string;
  category: 'Manual' | 'API' | 'Database' | 'Automation' | 'Tools';
  level: number; // 1-100
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  company?: string;
  role: string;
  description: string;
  challenges: string;
  outcome: string;
  tags: string[];
  link?: string;
  type: 'Web' | 'Mobile' | 'API';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  location?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year?: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  date: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string; // Markdown or HTML
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
}

export interface Profile {
  name: string;
  navbarTitle: string; // e.g. "TWA"
  heroTitle: string;   // e.g. "Test With Ankit"
  tagline: string;
  intro: string;       // Line 1
  intro2: string;      // Line 2
  about: string;
  email: string;
  linkedin: string;
  github: string;
  resumeLink: string;
  location: string;
  phone: string;
}

export interface AppData {
  profile: Profile;
  skills: Skill[];
  services: Service[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
}

export const INITIAL_DATA: AppData = {
  profile: {
    name: "Ankit Patel",
    navbarTitle: "TWA",
    heroTitle: "Test With Ankit",
    tagline: "Senior QA Engineer | Web, Mobile & API Testing | Automation Lead",
    intro: "Quality Assurance • Manual Testing • API Testing • Database Testing.",
    intro2: "I help teams ship stable, high-quality web and mobile applications through systematic testing and clear communication.",
    about: "Senior Quality Assurance Engineer with 7+ years of experience ensuring seamless digital experiences across Web, Mobile, and API platforms. Skilled in manual, functional, and exploratory testing with strong exposure to automation tools and AI-driven QA practices.\n\nI specialize in designing robust QA strategies - from test planning to release validation - using tools like Postman, Selenium WebDriver, JMeter, TestRail, and MySQL. My approach focuses on minimizing defect leakage, optimizing test coverage, and maintaining agility in every sprint.\n\nMy next goal: Transition into a QA Automation Lead role, driving scalable automation frameworks and mentoring teams to deliver quality at speed.",
    email: "ankitpatel.ljmca@gmail.com",
    phone: "9898101167",
    linkedin: "https://www.linkedin.com/in/ankit-patel-230b5619a",
    github: "https://github.com",
    resumeLink: "#",
    location: "Ahmedabad, Gujarat, India"
  },
  skills: [
    { id: '1', name: 'Selenium WebDriver', category: 'Automation', level: 90 },
    { id: '2', name: 'Postman & REST API', category: 'API', level: 95 },
    { id: '3', name: 'Manual Testing', category: 'Manual', level: 100 },
    { id: '4', name: 'JMeter', category: 'Tools', level: 80 },
    { id: '5', name: 'TestRail', category: 'Tools', level: 85 },
    { id: '6', name: 'SQL / MySQL', category: 'Database', level: 75 },
    { id: '7', name: 'Mobile App Testing', category: 'Manual', level: 90 },
    { id: '8', name: 'JIRA', category: 'Tools', level: 95 },
    { id: '9', name: 'Generative AI for QA', category: 'Tools', level: 70 },
  ],
  services: [
    { id: '1', title: 'Mobile App Testing', description: 'Comprehensive testing on real Android and iOS devices to reproduce crash bugs and ensure UI responsiveness.', icon: 'Smartphone', tags: ['iOS', 'Android', 'Real Devices'] },
    { id: '2', title: 'API Validation', description: 'Integrated Postman & JMeter for rigorous backend testing, ensuring data integrity and performance.', icon: 'Server', tags: ['REST', 'Performance'] },
    { id: '3', title: 'Test Strategy & Planning', description: 'Designing robust test plans, test cases, and regression suites to ensure zero-defect releases.', icon: 'FileText', tags: ['Documentation', 'Strategy'] },
    { id: '4', title: 'Bug Reproduction', description: 'Expert in isolating complex edge cases and providing detailed video reports for developers.', icon: 'CheckCircle', tags: ['Video Reports', 'Logs'] }
  ],
  projects: [
    {
      id: '1',
      title: 'Mobile App Testing & Bug Report',
      company: 'Freelance / Upwork',
      role: 'QA Engineer',
      type: 'Mobile',
      description: 'Performed deep-dive testing on Android and iOS real devices. Identified usability issues, functionality gaps, and crash scenarios.',
      challenges: 'Device specific crashes that were hard to reproduce on emulators.',
      outcome: 'Delivered detailed video reports and logs, helping the client stabilize the build before launch.',
      tags: ['Android', 'iOS', 'Bug Reporting'],
      link: '#'
    },
    {
      id: '2',
      title: 'Crash Bug Reproduction & Analysis',
      company: 'Freelance',
      role: 'QA Analyst',
      type: 'Mobile',
      description: 'Investigated a critical crash affecting 20% of users on a specific Android version.',
      challenges: 'Limited logs and intermittent reproduction steps.',
      outcome: 'Successfully isolated the root cause and provided a consistent reproduction path for devs.',
      tags: ['Crashlytics', 'Android', 'Debugging'],
      link: '#'
    },
    {
      id: '3',
      title: 'AI-Powered Test Case Generator',
      company: 'Internal Tool',
      role: 'QA Lead',
      type: 'Web',
      description: 'Leveraged Google Sheets and Open API to generate test cases automatically using Generative AI.',
      challenges: 'Ensuring AI output was relevant and accurate to the business logic.',
      outcome: 'Reduced test case writing time by 50% for standard features.',
      tags: ['GenAI', 'Automation', 'Productivity'],
      link: '#'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Pandit Ventures Pvt. Ltd.',
      role: 'Senior Quality Assurance Engineer',
      period: 'May 2022 - Present',
      location: 'Ahmedabad, Gujarat',
      description: [
        'Lead end-to-end testing initiatives and collaborate with developers to deliver zero-defect releases.',
        'Designed and executed 500+ manual and regression test cases across mobile & web platforms.',
        'Integrated Postman & JMeter for API validation, cutting defect turnaround time by 20%.',
        'Mentored junior testers in bug reporting, improving team efficiency by 30%.'
      ]
    },
    {
      id: '2',
      company: 'Radixweb',
      role: 'Quality Assurance Engineer',
      period: 'Jan 2022 - May 2022',
      location: 'India',
      description: ['Ensured quality for diverse web applications.', 'Collaborated with cross-functional teams for rapid delivery.']
    },
    {
      id: '3',
      company: 'Intelivita',
      role: 'Quality Assurance Engineer',
      period: 'Mar 2020 - May 2021',
      location: 'Ahmedabad, Gujarat',
      description: ['Worked on Food Delivery Apps (Portal, Customer App, Delivery Boy App).', 'Highlighted client wants to solution for quality assurance for end-to-end visibility.', 'Executed testing on both Android and iOS platforms.']
    },
    {
      id: '4',
      company: 'Lodestone Software Services',
      role: 'Quality Assurance Engineer',
      period: 'Apr 2018 - Nov 2019',
      location: 'Ahmedabad, Gujarat',
      description: ['Responsible for manual testing and regression cycles.', 'Documented test artifacts and participated in daily standups.']
    }
  ],
  education: [
    {
      id: '1',
      school: 'Kadi Sarva Vishwavidyalaya, Gandhinagar',
      degree: 'BCA (Bachelor of Computer Applications)',
      year: 'Graduated'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'Generative AI Overview for Project Managers',
      provider: 'Project Management Institute',
      date: 'Jan 2025'
    },
    {
      id: '2',
      name: 'Introduction to Selenium',
      provider: 'Simplilearn',
      date: 'April 2025'
    },
    {
      id: '3',
      name: 'MongoDB Logging Basics',
      provider: 'MongoDB',
      date: 'April 2025'
    },
    {
      id: '4',
      name: 'The Basics of Scrum',
      provider: 'Scrum.org',
      date: '2024'
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Lindsay K.',
      role: 'Client',
      company: 'Upwork',
      text: 'Find an iPhone app that tracks employee time on tasks... Ankit did a great job.'
    },
    {
      id: '2',
      name: 'Matt G.',
      role: 'Client',
      company: 'Upwork',
      text: 'Ankit did a fantastic job with the deliverables on the Web Site Review and Testing.'
    }
  ],
  blogs: [
    {
      id: '1',
      title: 'The Future of Manual Testing in an AI World',
      excerpt: 'Why human intuition is still irreplaceable despite the rise of automated and AI-driven testing tools.',
      date: 'Oct 12, 2024',
      category: 'Thought Leadership',
      content: 'Full article content here...',
      link: '#'
    },
    {
      id: '2',
      title: 'Best Practices for API Testing with Postman',
      excerpt: 'A guide to structuring your collections and using environments efficiently.',
      date: 'Sep 28, 2024',
      category: 'Tutorial',
      content: 'Full article content here...',
      link: '#'
    }
  ]
};
