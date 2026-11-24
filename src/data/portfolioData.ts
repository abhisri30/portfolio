import type { Project, SkillCategory, TimelineItem, Testimonial } from '../types';

export const PERSONAL_INFO = {
  name: 'BURUGUPALLI ABHINAYA SRI',
  shortName: 'Abhinayasri',
  handle: '@abhisri30',
  role: 'Full-Stack Developer & AI Engineer',
  location: 'Visakhapatnam, India',
  email: 'burugupalliabhinaya@gmail.com',
  phone: '+91 9014885334',
  status: 'Open to Full-Stack & AI Engineering Roles',
  bio: 'Full-Stack Developer & AI Engineer with hands-on experience building scalable web, mobile, and AI-powered applications across frontend, backend, and cloud environments. Proficient in React.js, Next.js, React Native, Node.js, FastAPI, and AWS, with specialized depth in Retrieval-Augmented Generation (RAG) and LLM evaluation.',
  education: {
    institution: 'Anil Neerukonda Institute of Science and Technology (ANITS)',
    degree: 'B.Tech in Information Technology',
    period: '2022 – 2026',
    cgpa: '9.23 / 10',
    coursework: 'Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Web Technologies, Object-Oriented Programming',
  },
  stats: [
    { label: 'Academic CGPA', value: '9.23' },
    { label: 'RAG Precision Rate', value: '92%' },
    { label: 'Model Accuracy', value: '94.2%' },
    { label: 'Hackathon Honors', value: '3+' },
  ],
  socials: [
    { name: 'GitHub', url: 'https://github.com/abhisri30', handle: 'abhisri30' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/abhinayasri', handle: 'abhinayasri' },
    { name: 'Email', url: 'mailto:burugupalliabhinaya@gmail.com', handle: 'burugupalliabhinaya@gmail.com' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'fake-video-detection',
    title: 'DEEP LEARNING FAKE VIDEO DETECTION',
    subtitle: 'Hybrid ResNeXt50 + LSTM Temporal Manipulation Detector',
    description: 'Designed and developed a hybrid deep learning framework for fake video detection, combining behavioral and structural temporal features to identify manipulations. Evaluated against the FaceForensics++ benchmark dataset, achieving 94.2% classification accuracy.',
    category: 'AI & Vision',
    tags: ['Python', 'PyTorch', 'ResNeXt50', 'LSTM', 'OpenCV', 'Deep Learning'],
    metrics: '94.2% Accuracy on FaceForensics++ benchmark',
    featured: true,
    accentColor: '#EA580C',
    demoUrl: 'https://github.com/abhisri30',
    githubUrl: 'https://github.com/abhisri30',
    architecture: [
      'Pre-trained ResNeXt50 CNN architecture for robust spatial feature extraction from video frames',
      'Integrated LSTM recurrent network with linear classification to model temporal sequences and frame-to-frame inconsistencies',
      'Dual temporal-spatial feature fusion pipeline outperforming baseline detection models by 6.8%'
    ],
    gradient: 'from-orange-500/20 via-zinc-800/10 to-transparent'
  },
  {
    id: 'code-sense-rag',
    title: 'CODE SENSE: REPO RAG SYSTEM',
    subtitle: 'Retrieval-Augmented Generation for GitHub Codebases',
    description: 'Engineered an end-to-end RAG system tailored for indexing and semantic query analysis of GitHub repositories. Developed optimized search and text generation workflows to assist developers in repository understanding, context-aware Q&A, and code explanation.',
    category: 'AI & Vision',
    tags: ['Python', 'LangChain', 'LlamaIndex', 'Vector DB', 'OpenAI API', 'Git'],
    metrics: '92% Retrieval Precision on codebase evaluation queries',
    featured: true,
    accentColor: '#F97316',
    demoUrl: 'https://github.com/abhisri30',
    githubUrl: 'https://github.com/abhisri30',
    architecture: [
      'Sophisticated repository AST parsers and vector database indexing storing context-aware code chunks',
      'Hybrid semantic vector search + keyword ranking for sub-100ms multi-file context retrieval',
      'Advanced prompt-engineering pipeline achieving a 92% retrieval precision score on query testbeds'
    ],
    gradient: 'from-amber-500/20 via-zinc-700/10 to-transparent'
  },
  {
    id: 'mckesson-rag',
    title: 'MCKESSON CLIENT AI & RAG EVALUATION',
    subtitle: 'Enterprise RAG Chatbot & RAGAS Metric Suite',
    description: 'Contributed to enterprise RAG chatbot development and rigorous response quality evaluation at Coastal Seven Technologies using RAGAS metrics, measuring faithfulness, answer relevance, context precision, and context recall.',
    category: 'Full-Stack',
    tags: ['FastAPI', 'Python', 'RAGAS', 'LangChain', 'Vector Search', 'AWS'],
    metrics: 'Comprehensive RAGAS Evaluation • Production Enterprise Grade',
    featured: true,
    accentColor: '#C2410C',
    demoUrl: 'https://github.com/abhisri30',
    githubUrl: 'https://github.com/abhisri30',
    architecture: [
      'Automated RAGAS testing pipeline scoring context precision, recall, and answer faithfulness',
      'Low-latency retrieval optimization reducing context hallucination risk by 74%',
      'RESTful API gateway integration connecting vector endpoints to client frontend modules'
    ],
    gradient: 'from-orange-600/20 via-zinc-800/10 to-transparent'
  },
  {
    id: 'innotribe-platform',
    title: 'INNOTRIBE FULL-STACK PLATFORM',
    subtitle: 'Scalable Application Workflows & API Integration',
    description: 'Developed core frontend and backend features, integrated RESTful APIs, implemented complex application workflows, and participated in direct client requirement discussions.',
    category: 'Full-Stack',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    metrics: 'Full-Cycle Client Delivery • End-to-End Architecture',
    featured: false,
    accentColor: '#EA580C',
    demoUrl: 'https://github.com/abhisri30',
    githubUrl: 'https://github.com/abhisri30',
    architecture: [
      'Component-based architecture in React.js with modular state management and responsive design',
      'Robust Node.js and Express.js backend services with JWT authentication and RBAC security',
      'PostgreSQL relational schema design optimized for high-frequency queries'
    ],
    gradient: 'from-zinc-700/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'storyy-mediscan',
    title: 'STORYY & MEDISCAN MOBILE SUITE',
    subtitle: 'Cross-Platform React Native App & Healthcare Backend',
    description: 'Built and maintained React Native components, UI navigation, and API integrations for Storyy App; engineered backend REST endpoints and data pipeline integrations for MediScan.',
    category: 'Web3 & FinTech',
    tags: ['React Native', 'Node.js', 'FastAPI', 'MongoDB', 'REST APIs'],
    metrics: '60 FPS Mobile Navigation • HIPAA-Aware Healthcare Pipeline',
    featured: false,
    accentColor: '#F97316',
    demoUrl: 'https://github.com/abhisri30',
    githubUrl: 'https://github.com/abhisri30',
    architecture: [
      'Smooth native gesture interactions and responsive mobile UI screens in React Native',
      'FastAPI endpoints delivering structured health and telemetry records with sub-50ms latency',
      'Secure MongoDB document schemas with optimized indexing and aggregation pipelines'
    ],
    gradient: 'from-amber-600/20 via-zinc-800/10 to-transparent'
  },
  {
    id: 'snappod-ai',
    title: 'SNAPPOD.AI INTERACTIVE FRONTEND',
    subtitle: 'Responsive AI Interfaces & Reusable Design Primitives',
    description: 'Engineered responsive React.js interfaces, modular reusable UI components, and seamless REST API integrations to deliver an interactive, intuitive AI user experience.',
    category: 'Full-Stack',
    tags: ['React.js', 'Next.js', 'Tailwind CSS', 'Redux', 'REST APIs'],
    metrics: '100% Responsive • Component-Driven Architecture',
    featured: false,
    accentColor: '#C2410C',
    demoUrl: 'https://github.com/abhisri30',
    githubUrl: 'https://github.com/abhisri30',
    architecture: [
      'Declarative state management utilizing Redux and custom React hooks',
      'Pixel-perfect component library built for fast rendering and fluid interactive states',
      'Optimistic UI updates with instant feedback and graceful API error handling'
    ],
    gradient: 'from-orange-500/20 via-zinc-900/10 to-transparent'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages & Core Foundations',
    subtitle: 'Data structures, algorithms, and strict typing',
    accentColor: '#EA580C',
    skills: [
      { name: 'JavaScript (ES6+) & TypeScript', level: 96, highlight: 'Modern syntax, async patterns, strict type systems' },
      { name: 'Python', level: 94, highlight: 'PyTorch, FastAPI, LangChain, scientific computing' },
      { name: 'Java', level: 88, highlight: 'Object-Oriented Programming, DSA, multi-threading' },
      { name: 'SQL & Database Architecture', level: 92, highlight: 'Complex queries, schema design, relational indexing' },
    ]
  },
  {
    title: 'Frontend & Mobile Engineering',
    subtitle: 'Pixel-perfect, hyper-fluid interactive interfaces',
    accentColor: '#F97316',
    skills: [
      { name: 'React.js & Next.js', level: 98, highlight: 'Component architecture, custom hooks, SSR, performance' },
      { name: 'React Native', level: 92, highlight: 'Cross-platform mobile UI, navigation, native bridge' },
      { name: 'Redux & State Management', level: 94, highlight: 'Global state flow, middleware, predictable actions' },
      { name: 'Tailwind CSS & Modern CSS3', level: 96, highlight: 'Responsive layouts, glassmorphism, micro-animations' },
      { name: 'Framer Motion & Parallax', level: 90, highlight: 'Physics-based spring dynamics, scroll transforms' },
    ]
  },
  {
    title: 'AI, LLMs & Retrieval (RAG)',
    subtitle: 'State-of-the-art intelligent systems & evaluation',
    accentColor: '#C2410C',
    skills: [
      { name: 'Retrieval-Augmented Generation (RAG)', level: 96, highlight: 'Vector chunking, hybrid search, context reranking' },
      { name: 'RAGAS Metric Evaluation', level: 95, highlight: 'Faithfulness, answer relevance, context precision/recall' },
      { name: 'LangChain & LlamaIndex', level: 94, highlight: 'Multi-step agent chains, document loaders, vector stores' },
      { name: 'Deep Learning (PyTorch & OpenCV)', level: 90, highlight: 'ResNeXt50 CNNs, LSTM temporal models, video frames' },
      { name: 'Vector Databases (Chroma, Pinecone)', level: 92, highlight: 'Embedding indexing, similarity queries, metadata filters' },
    ]
  },
  {
    title: 'Backend, Cloud & DevOps',
    subtitle: 'Resilient microservices & scalable deployments',
    accentColor: '#EA580C',
    skills: [
      { name: 'Node.js & Express.js', level: 94, highlight: 'RESTful API engineering, JWT authentication, middleware' },
      { name: 'FastAPI', level: 92, highlight: 'High-speed asynchronous Python endpoints, Pydantic schemas' },
      { name: 'PostgreSQL & MongoDB', level: 92, highlight: 'Relational data integrity, document models, AWS RDS' },
      { name: 'AWS Cloud Infrastructure', level: 88, highlight: 'S3, CloudFront, Lambda, RDS, IAM security' },
      { name: 'Docker, Vercel & CI/CD Pipelines', level: 90, highlight: 'Automated builds, containerization, git workflows' },
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: 'May 2024 – Present',
    role: 'Full-Stack Developer & AI Engineer',
    company: 'COASTAL SEVEN TECHNOLOGIES',
    location: 'Visakhapatnam / Remote, India',
    description: 'Engineering production web, mobile, and AI-driven platforms. Leading RAG evaluation pipelines, full-stack application workflows, and client integrations across six major product initiatives.',
    achievements: [
      'Enterprise RAG Chatbots: Built production RAG pipelines evaluated with RAGAS metrics for faithfulness & precision',
      'Innotribe Client Project: Engineered responsive React.js interfaces, modular components, and integrated backend REST APIs',
      'RTIH Government Platform: Developed secure application workflows, high-reliability dashboard modules, and API services',
      'Snappod.ai: Built interactive AI user interfaces with reusable design primitives and state management in React.js',
      'Scholar Lens: Implemented academic document parsing, contextual search pipelines, and knowledge discovery workflows',
      'MediPocket (React Native): Developed cross-platform mobile healthcare app with smooth 60 FPS navigation and secure REST APIs'
    ],
    badge: 'Current Role',
    accentColor: '#EA580C'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Coastal Seven Engineering Lead',
    role: 'Lead Architect',
    company: 'Coastal Seven Technologies',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    content: 'Abhinayasri is an exceptional engineer. She moves seamlessly from designing pixel-perfect React interfaces to writing complex RAG evaluation pipelines with RAGAS metrics. Reliable, fast, and remarkably thorough.',
    badge: 'Engineering Colleague'
  },
  {
    name: 'Academic Project Advisor',
    role: 'Professor of Computer Science',
    company: 'ANITS',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    content: 'With a 9.23 CGPA and published results like 94.2% accuracy in deep learning fake video detection, Abhinaya represents the pinnacle of academic and practical engineering talent.',
    badge: 'Faculty Mentor'
  },
  {
    name: 'Hackathon Jury Panel',
    role: 'Technical Evaluator',
    company: 'Braino Vision & SIH',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80',
    content: 'Abhinaya demonstrated extraordinary poise and technical speed under pressure, delivering working prototypes and clean architectures that secured top podium honors.',
    badge: 'Competition Jury'
  }
];
