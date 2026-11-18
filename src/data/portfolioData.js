export const personalInfo = {
  name: "Ahmed Fayyad",
  title: "Frontend Developer & Computer Science Graduate",
  focus: "React • TypeScript • Modern Web Engineering",
  location: "Cairo, Egypt",
  phone: "+20 101 456 3940",
  email: "ahfayyad.m@gmail.com",
  github: "https://github.com/Ah-Fayyad/",
  linkedin: "https://www.linkedin.com/in/ahmad-fayyad-97a727265",
  cvUrl: "/Ahmed Fayyad_CV.pdf",
  bio: "Frontend Developer and Computer Science graduate building responsive, production-ready React and TypeScript web applications with solid REST API integration. Delivered a full-stack graduation project selected among the Top 80 of 1,000+ projects, with a strong foundation in data structures, algorithms, and modern frontend architecture.",
  metrics: [
    { label: "Graduation Award", value: "Top 80", sub: "of 1,000+ projects" },
    { label: "Degree", value: "B.Sc. CS", sub: "Arab Open University (2026)" },
    { label: "Production Apps", value: "4+", sub: "Full-Stack & Frontend" },
    { label: "Core Stack", value: "React & TS", sub: "Tailwind, Node, Postgres" },
  ]
};

export const skillsData = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React.js", level: "Advanced", icon: "FaReact", color: "#61DAFB" },
      { name: "TypeScript", level: "Proficient", icon: "SiTypescript", color: "#3178C6" },
      { name: "Next.js", level: "Proficient", icon: "SiNextdotjs", color: "#ffffff" },
      { name: "Tailwind CSS", level: "Advanced", icon: "SiTailwindcss", color: "#06B6D4" },
      { name: "JavaScript (ES6+)", level: "Advanced", icon: "FaJsSquare", color: "#F7DF1E" },
      { name: "HTML5 & CSS3", level: "Advanced", icon: "FaHtml5", color: "#E34C26" },
      { name: "Material UI", level: "Proficient", icon: "SiMui", color: "#007FFF" },
      { name: "Responsive Design", level: "Advanced", icon: "FaMobileAlt", color: "#10B981" }
    ]
  },
  {
    category: "Backend & Real-Time",
    skills: [
      { name: "Node.js", level: "Proficient", icon: "FaNode", color: "#68A063" },
      { name: "Express.js", level: "Proficient", icon: "SiExpress", color: "#ffffff" },
      { name: "REST APIs", level: "Advanced", icon: "FaServer", color: "#38BDF8" },
      { name: "Socket.IO", level: "Proficient", icon: "SiSocketdotio", color: "#010101" },
      { name: "Auth & JWT", level: "Proficient", icon: "FaLock", color: "#F59E0B" }
    ]
  },
  {
    category: "Databases & ORMs",
    skills: [
      { name: "PostgreSQL", level: "Proficient", icon: "SiPostgresql", color: "#4169E1" },
      { name: "Prisma ORM", level: "Proficient", icon: "SiPrisma", color: "#2D3748" },
      { name: "Supabase", level: "Proficient", icon: "SiSupabase", color: "#3FCF8E" },
      { name: "Firebase", level: "Proficient", icon: "SiFirebase", color: "#FFCA28" },
      { name: "MongoDB", level: "Familiar", icon: "SiMongodb", color: "#47A248" },
      { name: "SQL", level: "Proficient", icon: "FaDatabase", color: "#0284C7" }
    ]
  },
  {
    category: "Programming Languages",
    skills: [
      { name: "TypeScript", level: "Proficient", icon: "SiTypescript", color: "#3178C6" },
      { name: "JavaScript", level: "Advanced", icon: "FaJsSquare", color: "#F7DF1E" },
      { name: "Python", level: "Familiar", icon: "SiPython", color: "#3776AB" },
      { name: "Java", level: "Familiar", icon: "FaJava", color: "#EA2D2E" },
      { name: "C++", level: "Familiar", icon: "SiCplusplus", color: "#00599C" }
    ]
  },
  {
    category: "Tools & Computer Science",
    skills: [
      { name: "Git & GitHub", level: "Advanced", icon: "FaGitAlt", color: "#F1502F" },
      { name: "Vite", level: "Advanced", icon: "SiVite", color: "#646CFF" },
      { name: "Data Structures", level: "Strong", icon: "FaBrain", color: "#A855F7" },
      { name: "OOP Principles", level: "Strong", icon: "FaCogs", color: "#EC4899" },
      { name: "Problem Solving", level: "Strong", icon: "FaLightbulb", color: "#F59E0B" }
    ]
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Roommates Platform",
    subtitle: "Graduation Project (Top 80 of 1,000+ Projects)",
    awardBadge: "Top 80 of 1,000+ Projects",
    description:
      "A comprehensive, AI-powered roommate matching and housing discovery platform engineered for students and expatriates. Features real-time Socket.IO chat, identity verification, interactive map-based property search, and an administrative moderation suite.",
    extendedHighlights: [
      "Engineered responsive React & TypeScript frontend with Tailwind CSS and Vite, managing global state cleanly via Context API.",
      "Architected backend Node.js and Express REST APIs with robust JWT authentication, authorization middleware, and PostgreSQL data persistence via Prisma ORM.",
      "Implemented bi-directional real-time chat with Socket.IO for instant tenant-roommate communication and automated visit scheduling notifications.",
      "Built AI-powered personality and preference matching algorithms to optimize roommate compatibility.",
      "Presented and defended the platform before academic and industry technical evaluators, achieving selection in the top 8% of university cohorts."
    ],
    image: "/Roommates.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "Express.js", "PostgreSQL", "Prisma", "Socket.IO", "AI Matching"],
    github: "https://github.com/Ah-Fayyad/Roommates-Frontend",
    live: "https://roommates-frontend.vercel.app/",
    featured: true
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    subtitle: "Almdrasa Frontend Development Diploma Capstone",
    awardBadge: "Full-Stack Shopping Platform",
    description:
      "Full-stack e-commerce web application featuring dynamic catalog navigation, cart and checkout workflows, responsive UI design with Tailwind CSS and Material UI, and cloud backend powered by Supabase.",
    extendedHighlights: [
      "Built complete product discovery, categorization, search, and persistent shopping cart flows in React with Vite.",
      "Integrated Supabase for user authentication, PostgreSQL database queries, and cloud storage for product assets.",
      "Designed clean, mobile-first responsive interfaces blending Tailwind CSS utilities with Material UI components."
    ],
    image: "/e-commerce.png",
    tags: ["React", "React Router", "Vite", "Tailwind CSS", "Material UI", "Supabase", "PostgreSQL"],
    github: "https://github.com/Ah-Fayyad/E-commerce-App",
    live: "https://project-e-commerce-app.netlify.app/",
    featured: true
  },
  {
    id: 3,
    title: "Around the World (Country Guide)",
    subtitle: "Interactive Global Explorer & Data Visualization",
    awardBadge: "REST API & Data Visualization",
    description:
      "An interactive web application integrating REST Countries API to provide comprehensive geographical, demographic, and economic metrics for every nation worldwide with interactive visual charts.",
    extendedHighlights: [
      "Integrated public REST APIs with client-side caching, search, and region-based filtering.",
      "Rendered demographic data and comparative population metrics using Charts.js data visualization."
    ],
    image: "/round.png",
    tags: ["React", "Vite", "REST API", "Charts.js", "Tailwind CSS", "Material UI"],
    github: "https://github.com/Ah-Fayyad/Around-the-world?tab=readme-ov-file",
    live: "https://around-the-world-sepia.vercel.app/",
    featured: false
  },
  {
    id: 4,
    title: "Repo Finder",
    subtitle: "GitHub Developer Search Tool",
    awardBadge: "Developer Tooling",
    description:
      "A developer productivity tool interfacing with the GitHub REST API to search repositories, inspect stars, forks, and code branches through an intuitive, streamlined UI.",
    extendedHighlights: [
      "Real-time repository query debouncing and error boundary handling against GitHub rate limits.",
      "Clean UI presentation highlighting primary programming languages and commit activities."
    ],
    image: "/Repo-Finder.png",
    tags: ["React", "GitHub API", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/Ah-Fayyad/Repo-Finder",
    live: "https://ah-fayyad.github.io/Repo-Finder/",
    featured: false
  }
];

export const educationData = [
  {
    degree: "Bachelor of Science (B.Sc.) in Computer Science",
    institution: "Arab Open University",
    location: "Cairo, Egypt",
    period: "2022 – 2026",
    status: "Final Year / Graduating 2026",
    summary:
      "Comprehensive computer science curriculum focused on software engineering principles, algorithms, data structures, relational database systems, computer networking, and object-oriented architecture.",
    keyAchievements: [
      "Top 80 selection out of 1,000+ graduation projects for Roommates Platform.",
      "Core Coursework: Data Structures & Algorithms, OOP, Database Systems (SQL), Operating Systems, Software Engineering, Web Technologies."
    ]
  }
];

export const experienceData = [
  {
    role: "Lead Full-Stack & Frontend Engineer",
    project: "Roommates Platform (Graduation Project)",
    period: "2024 – 2025",
    type: "Academic & Capstone Engineering",
    description:
      "Led the frontend and full-stack architecture for an enterprise-level student housing matching platform selected as one of the Top 80 graduation projects across more than 1,000 university submissions.",
    highlights: [
      "Designed and delivered 20+ responsive views in React and TypeScript with Tailwind CSS.",
      "Engineered real-time messaging pipeline utilizing Socket.IO with sub-100ms message delivery.",
      "Structured PostgreSQL schemas and Prisma ORM migrations for complex tenant/landlord relationships."
    ]
  },
  {
    role: "Frontend Engineer (Diploma Project)",
    project: "Almdrasa Platform Full-Stack E-Commerce",
    period: "2024",
    type: "Professional Certification Capstone",
    description:
      "Developed a complete end-to-end e-commerce store with user authentication, catalog management, and transactional cart flows as part of the Almdrasa Frontend Development Diploma.",
    highlights: [
      "Integrated Supabase Auth and database tables for real-time order and cart synchronization.",
      "Implemented responsive Material UI and Tailwind layouts tested across mobile, tablet, and desktop."
    ]
  }
];

export const initialCertificates = [
  {
    id: "cert-almdrasa-fe",
    title: "Frontend Development Diploma",
    issuer: "Almdrasa",
    issuerLogo: "almdrasa",
    issueDate: "2024",
    category: "Frontend & Full-Stack",
    description:
      "Intensive professional diploma covering modern frontend engineering: Advanced JavaScript (ES6+), React.js, Next.js, state management, REST APIs, responsive CSS architecture, and full-stack application development.",
    skills: ["React.js", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS", "REST APIs", "State Management", "Git"],
    credentialId: "ALM-FE-2024",
    credentialUrl: "https://almdrasa.com/",
    imageUrl: "/portofolio.png",
    featured: true
  }
];

export const organizationLogos = {
  edraak: {
    name: "Edraak",
    color: "#009688",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#009688"/><path d="M25 50C25 36.19 36.19 25 50 25C63.81 25 75 36.19 75 50C75 63.81 63.81 75 50 75" stroke="white" stroke-width="8" stroke-linecap="round"/><circle cx="50" cy="50" r="10" fill="white"/><path d="M70 30L85 15M85 15H72M85 15V28" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  almdrasa: {
    name: "Almdrasa",
    color: "#2563EB",
    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/></svg>`
  },
  google: {
    name: "Google",
    color: "#4285F4",
    svg: `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>`
  },
  meta: {
    name: "Meta",
    color: "#0668E1",
    svg: `<svg viewBox="0 0 24 24" fill="#0668E1"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>`
  },
  microsoft: {
    name: "Microsoft",
    color: "#00A4EF",
    svg: `<svg viewBox="0 0 24 24"><path fill="#F25022" d="M1 1h10v10H1z"/><path fill="#7FBA00" d="M13 1h10v10H13z"/><path fill="#00A4EF" d="M1 13h10v10H1z"/><path fill="#FFB900" d="M13 13h10v10H13z"/></svg>`
  },
  ibm: {
    name: "IBM",
    color: "#054ADA",
    svg: `<svg viewBox="0 0 24 24" fill="#054ADA"><path d="M2 5h4v1H2zm6 0h3v1H8zm5 0h3v1h-3zm5 0h4v1h-4zM2 7h4v1H2zm6 0h3v1H8zm5 0h3v1h-3zm5 0h4v1h-4zM2 9h4v1H2zm6 0h3v1H8zm5 0h3v1h-3zm5 0h4v1h-4zM2 11h4v1H2zm6 0h3v1H8zm5 0h3v1h-3zm5 0h4v1h-4zM2 13h4v1H2zm6 0h3v1H8zm5 0h3v1h-3zm5 0h4v1h-4zM2 15h4v1H2zm6 0h3v1H8zm5 0h3v1h-3zm5 0h4v1h-4zM2 17h4v1H2zm6 0h3v1H8zm5 0h3v1h-3zm5 0h4v1h-4zM2 19h4v1H2zm6 0h3v1H8zm5 0h3v1h-3zm5 0h4v1h-4z"/></svg>`
  },
  aws: {
    name: "AWS",
    color: "#FF9900",
    svg: `<svg viewBox="0 0 24 24" fill="#FF9900"><path d="M8.5 14.5c-2.3 0-3.8-1.3-3.8-3.3 0-2.4 2-3.4 5.3-3.5v-.4c0-1.2-.7-1.8-2.2-1.8-1.2 0-2.3.4-3.2 1.1l-.8-1.3c1.2-.9 2.7-1.4 4.3-1.4 2.7 0 4.1 1.3 4.1 3.5v5.3h-2.1v-1.1c-.8.9-1.9 1.4-3.6 1.4zm.5-1.6c1.6 0 2.8-.9 3.2-2.1v-.8c-2.4.1-3.6.8-3.6 2 0 1 .8 1.5 2 1.5zm10.7-5.9h2.3l-2.6 7.3h-2.1l-1.6-4.9-1.6 4.9h-2.1l-2.6-7.3h2.3l1.4 4.9 1.6-4.9h2l1.6 4.9 1.3-4.9zm-15 11.2c5.9 3.2 13.5 3.2 19.4 0l.4.8c-6.3 3.5-14.4 3.5-20.7 0l.9-.8z"/></svg>`
  },
  coursera: {
    name: "Coursera",
    color: "#0056D2",
    svg: `<svg viewBox="0 0 24 24" fill="#0056D2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>`
  },
  udemy: {
    name: "Udemy",
    color: "#A435F0",
    svg: `<svg viewBox="0 0 24 24" fill="#A435F0"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3.2l7 3.5v6.6l-7 3.5-7-3.5V8.7l7-3.5z"/></svg>`
  },
  udacity: {
    name: "Udacity",
    color: "#02B3E4",
    svg: `<svg viewBox="0 0 24 24" fill="#02B3E4"><path d="M12 2L2 8l10 6 10-6-10-6zm0 13L4 9.5V17l8 5 8-5V9.5L12 15z"/></svg>`
  },
  iti: {
    name: "ITI",
    color: "#E53935",
    svg: `<svg viewBox="0 0 24 24" fill="#E53935"><rect width="24" height="24" rx="4" fill="#E53935"/><text x="12" y="16" fill="white" font-size="9" font-weight="900" text-anchor="middle" font-family="sans-serif">ITI</text></svg>`
  },
  maharatech: {
    name: "Mahara-Tech",
    color: "#2E7D32",
    svg: `<svg viewBox="0 0 24 24" fill="#2E7D32"><rect width="24" height="24" rx="4" fill="#2E7D32"/><text x="12" y="16" fill="white" font-size="8" font-weight="bold" text-anchor="middle" font-family="sans-serif">MT</text></svg>`
  },
  aou: {
    name: "AOU",
    color: "#1E3A8A",
    svg: `<svg viewBox="0 0 24 24" fill="#1E3A8A"><rect width="24" height="24" rx="4" fill="#1E3A8A"/><path d="M12 4L4 9v6l8 5 8-5V9l-8-5z" fill="white"/><text x="12" y="15" fill="#1E3A8A" font-size="7" font-weight="bold" text-anchor="middle">AOU</text></svg>`
  },
  freecodecamp: {
    name: "freeCodeCamp",
    color: "#0A0A23",
    svg: `<svg viewBox="0 0 24 24" fill="#0A0A23"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`
  }
};
