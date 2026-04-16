export type ProjectEntry = {
  id: string
  name: string
  award: string
  competition: string
  date: string
  desc: string
  stack: string[]
  color: string
  github: string
  demo: string
  type: 'hackathon' | 'professional'
  bullets: string[]
}

export const CONFIG: {
  github: { username: string }
  user: Record<string, string>
  skills: Record<string, string[]>
  contact: Record<string, string>
  projects: ProjectEntry[]
  audio: { src: string; title: string; artist: string }
} = {
  github: {
    username: 'Parth12358',
  },
  user: {
    handle: 'parth',
    host: 'archbox',
    name: 'Parth Kshirsagar',
    os: 'Arch Linux x86_64',
    wm: 'Hyprland',
    editor: 'neovim',
    shell: 'zsh',
    terminal: 'kitty',
    theme: 'Gruvbox',
    university: 'Penn State — CS + Entrepreneurship',
    gpa: '3.52',
    role: 'Full Stack & AI Developer',
    location: 'State College, PA',
    website: 'parthk.com',
    email: 'parth.kshirsagar1410@gmail.com',
    linkedin: 'linkedin.com/in/parth-kshirsagar',
  },
  skills: {
    areas:      ['AI/ML', 'Full Stack', 'Mobile Dev', 'Frontend', 'Backend', 'VR/AR', 'Edge AI', 'Robotics', 'Cybersecurity', 'Systems Programming', 'Audio Processing', 'Assistive Tech'],
    languages:  ['Python', 'TypeScript', 'JavaScript', 'Java', 'C', 'C++', 'Dart', 'SQL', 'R', 'HTML/CSS', 'MATLAB', 'C#'],
    frameworks: ['React', 'React Native', 'Next.js', 'Flutter', 'Node.js', 'Flask', 'TensorFlow', 'Langchain', 'Hugging Face', 'MongoDB', 'Supabase', 'Tailwind CSS', 'p5.js', 'OpenCV', 'Pygame', 'Expo', 'NativeWind'],
    tools:      ['Neovim', 'Git', 'GitHub', 'Figma', 'Unity', 'Unreal Engine', 'Android Studio', 'Vivado', 'MATLAB', 'Vercel', 'Docker', 'VS Code'],
    platforms:  ['Meta Quest', 'Raspberry Pi', 'Snapdragon X Elite', 'AWS', 'Fetch.AI Agentverse', 'Linux'],
  },
  contact: {
    github: 'github.com/Parth12358',
    email: 'parth.kshirsagar1410@gmail.com',
    linkedin: 'linkedin.com/in/parth-kshirsagar',
    website: 'parthk.com',
  },
  audio: {
    src: '/audio/track.mp3',
    title: 'From the Start',
    artist: 'Laufey',
  },
  projects: [
    // Hackathon Winners
    {
      id: 'wargames',
      name: 'WarGames',
      award: '3rd Place — $500',
      competition: 'Compiled-6 @ Penn State',
      date: 'Mar 2025',
      desc: "Fully autonomous multi-agent simulation inspired by the Prisoner's Dilemma. 5 AI agents operate with no human in the loop, choosing from 5 actions with asymmetric consequence weighting and permanent threat scores.",
      stack: ['Vite.js', 'MCP', 'Multi-Agent AI', 'Game Theory'],
      color: 'var(--byellow)',
      github: 'https://github.com/Parth12358',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Won 3rd place ($500) at Compiled-6 Hackathon hosted by Transpose Platform',
        'Engineered 5-agent system with permanent threat scores compounding escalation',
        'Designed accountability tracing framework for multi-agent AI pipeline responsibility',
      ],
    },
    {
      id: 'vr-circuit',
      name: 'VR Circuit Simulator',
      award: 'Best VR Hack',
      competition: 'HackUMass @ UMass Amherst',
      date: 'Nov 2024',
      desc: 'Immersive VR circuit simulator featuring realistic breadboards, interactive components, real-time circuit simulation, and educational tutorials for learners at various skill levels.',
      stack: ['Unity', 'Meta Quest', 'Python', 'Pygame', 'NLP'],
      color: 'var(--bpurple)',
      github: 'https://github.com/Parth12358',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Won Best VR Hack at HackUMass with 500+ competitors',
        'Developed NLP-powered Circuit Generator for natural language command processing',
        'Built 2D Circuit Simulator in Pygame for rapid prototyping and testing',
      ],
    },
    {
      id: 'moth-challenge',
      name: 'The Moth Challenge',
      award: '1st Place — Cybersecurity',
      competition: 'Bitcamp @ Univ. of Maryland',
      date: 'Apr 2024',
      desc: 'Gamified cybersecurity puzzle platform inspired by Cicada 3301 and CIA recruitment tests. 7 unique puzzles with progressive difficulty scaling for 550+ competitors.',
      stack: ['Next.js', 'React', 'TypeScript', 'Figma'],
      color: 'var(--borange)',
      github: 'https://github.com/Parth12358',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Won 1st place cybersecurity track at Bitcamp (University of Maryland, 550+ competitors)',
        'Developed 7 unique puzzles with modular Next.js + TypeScript architecture',
        'Implemented seamless Figma-to-React workflow with progressive difficulty scaling',
      ],
    },
    {
      id: 'likhit',
      name: 'Likhit',
      award: 'Recognition',
      competition: 'HackHarvard @ Harvard University',
      date: 'Oct 2023',
      desc: 'Handwriting improvement platform bridging paper and digital writing through AI-powered analysis, custom phrase generation, and adaptive learning via GPT-4 and OCR.',
      stack: ['p5.js', 'Python', 'Flask', 'GPT-4', 'OCR'],
      color: 'var(--baqua)',
      github: 'https://github.com/Parth12358',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Created AI-powered handwriting platform at HackHarvard 2023 (600+ participants)',
        'Built interactive p5.js canvas with real-time input integrated with Flask + OCR backend',
        'Developed progress tracking system with GPT-4 for personalized adaptive learning',
      ],
    },
    {
      id: 'pathfinder',
      name: 'Pathfinder AI',
      award: 'Recognition',
      competition: 'HackPSU @ Penn State',
      date: 'Fall 2024',
      desc: 'Dual-purpose AI platform featuring a career guidance chatbot and RAG-based document summarization. Built to prevent AI hallucination through multi-step retrieval pipelines.',
      stack: ['Next.js', 'React', 'TypeScript', 'Langchain', 'OpenAI', 'Vercel'],
      color: 'var(--bgreen)',
      github: 'https://github.com/Parth12358',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Developed dual-purpose AI platform at HackPSU using Next.js and Langchain',
        'Built two distinct data pipelines: career advice and RAG-based document summarization',
        'Deployed production-ready AI advisor praised by testers for reliability and accuracy',
      ],
    },
    {
      id: 'snom',
      name: 'SNOM Robot',
      award: 'Hardware Category',
      competition: 'Bitcamp @ Univ. of Maryland',
      date: '2025',
      desc: 'Emotionally intelligent AI companion robot for neurodiverse children. Tracks moods through facial expressions and voice tone, provides adaptive conversations and parent dashboard.',
      stack: ['Raspberry Pi 5', 'OpenCV', 'Gemini 2.0 Flash', 'Flask', 'Python'],
      color: 'var(--bblue)',
      github: 'https://github.com/Parth12358',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Built emotionally intelligent robot at Bitcamp 2025 using Raspberry Pi 5 and OpenCV',
        'Integrated Gemini 2.0 Flash for adaptive conversations helping neurodiverse children',
        'Engineered hardware-software system with real-time mood detection and parent dashboard',
      ],
    },
    {
      id: '404found',
      name: '404Found',
      award: 'Recognition',
      competition: 'Hack Dearborn 2025',
      date: '2025',
      desc: '99% automated privacy guardian using Fetch.AI multi-agent system. Analyzes bank statements, flags data brokers, and auto-generates GDPR/CCPA deletion requests.',
      stack: ['Fetch.AI Agentverse', 'Gemini AI', 'MongoDB', 'Python', 'Tesseract OCR'],
      color: 'var(--bred)',
      github: 'https://github.com/Parth12358',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Built 99% automated privacy guardian using Fetch.AI Agentverse multi-agent system',
        'Orchestrated 5 specialized AI agents for OCR, classification, coaching, and request generation',
        'Merged cybersecurity and personal finance into empowerment platform with GDPR compliance',
      ],
    },
    {
      id: 'sonicmind',
      name: 'SonicMind AI',
      award: 'Recognition',
      competition: 'Qualcomm Edge AI @ NYU Tandon',
      date: '2025',
      desc: 'Real-time AI audio engineer built in 24 hours. Custom CNN achieving <10ms latency and 85%+ accuracy on Snapdragon X Elite. Transforms any space into a professional studio.',
      stack: ['TensorFlow', 'Snapdragon X Elite', 'Python', 'Custom CNN', 'DSP'],
      color: 'var(--bpurple)',
      github: 'https://github.com/Parth12358',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Built real-time audio AI at Qualcomm Edge AI Hackathon (NYU Tandon) in 24 hours',
        'Fine-tuned 4 AI models and built CNN from scratch achieving <10ms latency, 85%+ accuracy',
        'Engineered on-device processing on Snapdragon X Elite with lower power than streaming',
      ],
    },
    // Professional
    {
      id: 'detail-connect',
      name: 'Detail Connect',
      award: 'Mobile App Developer Intern',
      competition: 'Detail Connect LLC',
      date: 'May–Aug 2025',
      desc: 'Improved UI responsiveness 30%, integrated SMS OTP security, built Reschedule feature, optimized RESTful APIs improving data access efficiency by 25% across mobile and web platforms.',
      stack: ['Flutter', 'Node.js', 'MongoDB', 'RESTful APIs'],
      color: 'var(--baqua)',
      github: '',
      demo: '',
      type: 'professional',
      bullets: [
        'Improved UI responsiveness by 30% and integrated SMS-based OTP verification',
        'Implemented Reschedule feature reducing support requests by 35%',
        'Optimized RESTful APIs improving data access efficiency by 25%, reduced QA time by 40%',
      ],
    },
    {
      id: 'technocrats',
      name: 'Technocrats',
      award: 'Cofounder',
      competition: 'Technocrats Startup',
      date: 'Jan–Jul 2024',
      desc: 'Cofounded AI startup. Spearheaded multi-modal AI content generation (5+ modes), networked at TechCrunch Disrupt 2024, built Python + React infrastructure for hosting user products.',
      stack: ['Python', 'React', 'Multi-modal AI', 'RESTful APIs', 'Langchain'],
      color: 'var(--byellow)',
      github: '',
      demo: '',
      type: 'professional',
      bullets: [
        'Spearheaded multi-modal AI content generation platform supporting up to 5 modes',
        'Networked at TechCrunch Disrupt 2024 aligning AI solutions with business objectives',
        'Built Python + React infrastructure and RESTful API integrations for scalable deployment',
      ],
    },
  ],
}
