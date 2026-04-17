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
  type: 'hackathon' | 'professional' | 'personal'
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
    seeking: 'SWE / AI roles — May 2026',
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
    // ─── HACKATHON WINNERS ───────────────────────────────────────────

    {
      id: 'thatsmyecho',
      name: 'ThatsMyEcho',
      award: 'Best Domain Name (MLH/GoDaddy)',
      competition: 'Bitcamp 2026 @ Univ. of Maryland',
      date: 'Apr 2026',
      desc: 'A 2D platformer built in 36 hours where you play as a cat sound spirit. Movement costs sound energy. Your echoes bait enemies. Silence means death.',
      stack: ['Unity', 'C#', 'Rigidbody2D', 'Custom AI', 'Plastic SCM'],
      color: 'var(--baqua)',
      github: 'https://github.com/Parth12358/',
      demo: 'https://catecholl.us/',
      type: 'hackathon',
      bullets: [
        'Won Best Domain Name (MLH/GoDaddy) at Bitcamp 2026 building a Unity 2D platformer in 36 hours',
        'Built frame-by-frame echo recording system — up to 3 simultaneous movement ghosts that interact with the world and bait enemies',
        'Engineered custom platformer controller with coyote time, wall jumping, and pursuit AI that accelerates toward echoes rather than the player',
      ],
    },
    {
      id: 'wargames',
      name: 'WarGames',
      award: '3rd Place — $500',
      competition: 'Compiled-6 @ Penn State',
      date: 'Mar 2025',
      desc: "Fully autonomous multi-agent simulation. 5 AI agents, no human in the loop, exploring AI accountability through an extended Prisoner's Dilemma with permanent threat scores.",
      stack: ['Vite.js', 'MCP', 'Multi-Agent AI', 'Game Theory'],
      color: 'var(--byellow)',
      github: 'https://github.com/Parth12358/Compiled6-wargames',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Won 3rd place ($500) at Compiled-6 Hackathon hosted by Transpose Platform',
        'Engineered 5-agent system with permanent threat scores and asymmetric consequence weighting — no human in the loop',
        'Designed accountability tracing framework to identify which agent caused systemic breakdown',
      ],
    },
    {
      id: 'sonicmind',
      name: 'SonicMind AI',
      award: 'Recognition — Qualcomm Edge AI',
      competition: 'Qualcomm Hackathon @ NYU Tandon',
      date: '2025',
      desc: 'Real-time AI audio engineer built in 24 hours. Custom CNN achieving <10ms latency and 85%+ accuracy on Snapdragon X Elite. Transforms any space into a professional studio.',
      stack: ['TensorFlow', 'Snapdragon X Elite', 'Python', 'Custom CNN', 'DSP'],
      color: 'var(--bpurple)',
      github: 'https://github.com/Nailfighter/SonicMind-AI',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Built real-time audio AI at Qualcomm Edge AI Hackathon (NYU Tandon) in 24 hours',
        'Fine-tuned 4 AI models and built CNN from scratch achieving <10ms latency, 85%+ accuracy on Snapdragon X Elite',
        'Engineered fully on-device processing with lower power consumption than streaming',
      ],
    },
    {
      id: '404found',
      name: '404Found',
      award: 'Recognition — Hack Dearborn',
      competition: 'Hack Dearborn 2025',
      date: '2025',
      desc: '99% automated privacy guardian. 5 specialized AI agents analyze bank statements, flag data brokers, and auto-generate GDPR/CCPA deletion requests.',
      stack: ['Fetch.AI Agentverse', 'Gemini AI', 'MongoDB', 'Python', 'Tesseract OCR'],
      color: 'var(--bred)',
      github: 'https://github.com/Parth12358/404Found',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Built 99% automated privacy guardian using Fetch.AI Agentverse multi-agent system at Hack Dearborn 2025',
        'Orchestrated 5 specialized AI agents for OCR, classification, financial coaching, privacy risk, and request generation',
        'Merged cybersecurity and personal finance into a "last click" empowerment model with GDPR/CCPA compliance',
      ],
    },
    {
      id: 'snom',
      name: 'SNOM Robot',
      award: 'Hardware Category — Bitcamp 2025',
      competition: 'Bitcamp @ Univ. of Maryland',
      date: '2025',
      desc: 'Emotionally intelligent AI companion robot for neurodiverse children. Tracks moods through facial expressions and voice tone, adapts conversations in real time.',
      stack: ['Raspberry Pi 5', 'OpenCV', 'Gemini 2.0 Flash', 'Flask', 'Python'],
      color: 'var(--bblue)',
      github: 'https://github.com/KanikaGupta16/BitCampBot',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Built emotionally intelligent robot at Bitcamp 2025 using Raspberry Pi 5 and OpenCV for autonomous person tracking',
        'Integrated Gemini 2.0 Flash for adaptive conversations helping neurodiverse children build social skills',
        'Engineered complete hardware-software system with real-time mood detection and parent dashboard',
      ],
    },
    {
      id: 'pathfinder',
      name: 'Pathfinder AI',
      award: 'Recognition — HackPSU',
      competition: 'HackPSU @ Penn State',
      date: 'Fall 2024',
      desc: 'Dual-purpose AI platform with a career guidance chatbot and RAG-based document summarization. Zero hallucination through multi-step retrieval pipelines.',
      stack: ['Next.js', 'React', 'TypeScript', 'Langchain', 'OpenAI', 'Vercel'],
      color: 'var(--bgreen)',
      github: 'https://github.com/PabloRogers/hackpsu2024',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Developed dual-purpose AI platform at HackPSU using Next.js and Langchain',
        'Built two distinct pipelines: curated career advice and RAG-based document summarization to prevent hallucination',
        'Deployed production-ready AI advisor praised by testers for reliability and accuracy',
      ],
    },
    {
      id: 'vr-circuit',
      name: 'VR Circuit Simulator',
      award: 'Best VR Hack',
      competition: 'HackUMass @ UMass Amherst',
      date: 'Nov 2024',
      desc: 'Immersive VR circuit simulator with realistic breadboards, NLP-powered circuit generator, and real-time physics simulation for electronics education.',
      stack: ['Unity', 'Meta Quest', 'Python', 'Pygame', 'NLP'],
      color: 'var(--bpurple)',
      github: 'https://github.com/Parth12358/Circuit-Simulator-Kit',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Won Best VR Hack at HackUMass with 500+ competitors',
        'Developed NLP-powered Circuit Generator for natural language command processing',
        'Built 2D Circuit Simulator in Pygame for rapid prototyping, integrated 3 tools into one ecosystem',
      ],
    },
    {
      id: 'moth-challenge',
      name: 'The Moth Challenge',
      award: '1st Place — Cybersecurity',
      competition: 'Bitcamp @ Univ. of Maryland',
      date: 'Apr 2024',
      desc: 'Gamified cybersecurity puzzle platform inspired by Cicada 3301. 7 unique puzzles with progressive difficulty scaling for 550+ competitors.',
      stack: ['Next.js', 'React', 'TypeScript', 'Figma'],
      color: 'var(--borange)',
      github: 'https://github.com/kartikey-onlineGOD/BitCamp-2024-Cyber-',
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
      award: 'Recognition — HackHarvard',
      competition: 'HackHarvard @ Harvard University',
      date: 'Oct 2023',
      desc: 'Handwriting improvement platform bridging paper and digital writing. AI-powered analysis using GPT-4 and OCR for adaptive learning and personalized phrase generation.',
      stack: ['p5.js', 'Python', 'Flask', 'GPT-4', 'OCR'],
      color: 'var(--baqua)',
      github: 'https://github.com/psg0009/Likhit',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Created AI-powered handwriting platform at HackHarvard 2023 (600+ participants)',
        'Built real-time p5.js canvas with Flask + OCR backend and GPT-4 adaptive learning',
        'Developed progress tracking with personalized feedback and data-driven insights',
      ],
    },

    // ─── PROFESSIONAL ────────────────────────────────────────────────

    {
      id: 'detail-connect',
      name: 'Detail Connect',
      award: 'Mobile App Developer Intern',
      competition: 'Detail Connect LLC',
      date: 'May–Aug 2025',
      desc: 'Improved UI responsiveness 30%, integrated SMS OTP security, built Reschedule feature, optimized RESTful APIs improving data access efficiency 25% across mobile and web.',
      stack: ['Flutter', 'Node.js', 'MongoDB', 'RESTful APIs'],
      color: 'var(--baqua)',
      github: '',
      demo: '',
      type: 'professional',
      bullets: [
        'Improved UI responsiveness by 30% and integrated SMS-based OTP verification using Flutter and Node.js',
        'Implemented Reschedule feature with MongoDB reducing support requests by 35%',
        'Optimized RESTful APIs improving data access efficiency by 25%, reduced QA time by 40%',
      ],
    },
    {
      id: 'technocrats',
      name: 'Technocrats',
      award: 'Cofounder',
      competition: 'Technocrats Startup',
      date: 'Jan–Jul 2024',
      desc: 'Cofounded AI startup. Multi-modal content generation (5+ modes), networked at TechCrunch Disrupt 2024, built Python + React infrastructure for hosting user products.',
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

    // ─── CURRENT DEVELOPMENT ─────────────────────────────────────────

    {
      id: 'zeph',
      name: 'Zeph',
      award: 'YHack 2026 @ Yale',
      competition: 'YHack 2026 at Yale University',
      date: '2026',
      desc: 'Natural language network orchestrator for home lab machines. Runs Ollama locally, plans multi-machine workflows via LLM, dispatches commands in parallel. React dashboard + mobile PWA with voice input.',
      stack: ['FastAPI', 'Ollama', 'Python', 'React', 'Vite', 'SQLite', 'WebSockets', 'Flask', 'PWA'],
      color: 'var(--bgreen)',
      github: 'https://github.com/Parth12358/zeph',
      demo: '',
      type: 'hackathon',
      bullets: [
        'Built local AI network orchestrator at YHack 2026 (Yale) — natural language commands dispatch to multiple Arch/Hyprland machines in parallel via LLM-planned workflows',
        'Engineered async multi-machine dispatcher with aiohttp, live WebSocket dashboard, SQLite device registry, and Flask agents with whitelist security',
        'Developed mobile PWA with tap-to-speak voice input and distributed notes system — fully local, zero cloud dependency',
      ],
    },
    {
      id: 'flightapp',
      name: 'theFlightapp',
      award: 'In Development',
      competition: 'Personal Project',
      date: 'Dec 2024–',
      desc: 'Cross-platform flight tracking mobile app. Complete auth system (5+ methods), 15+ flight UI components, persistent dark mode. React Native + Supabase + Zustand.',
      stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Zustand', 'NativeWind'],
      color: 'var(--bblue)',
      github: 'https://github.com/Parth12358',
      demo: '',
      type: 'personal',
      bullets: [
        'Architecting cross-platform flight tracking app with React Native, Expo, and TypeScript with 100% type coverage',
        'Built complete auth system supporting 5+ login methods (OAuth, OTP, magic links) with session persistence and protected routes',
        'Created 15+ reusable flight UI components including boarding passes, status badges, and timelines with 60fps animations',
      ],
    },
  ],
}
