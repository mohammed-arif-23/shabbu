export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  link?: string;
}

export interface SkillNode {
  name: string;
  category: "Embedded & IoT" | "Programming" | "Databases & Backend" | "Frontend & Design";
  level: number; // 0 to 100
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  cols: string; // Tailwinds col-span
}

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Smart Home Automation System",
    category: "Embedded & IoT Project",
    description: "Built an energy-saving smart home automation system with voice control, integrating bulbs, occupancy/motion sensors, Wi-Fi/Bluetooth modules, and Arduino routines to manage home power consumption efficiently.",
    image: "/images/looking_outside_cyber.jpg", 
    tech: ["Arduino", "Embedded Systems", "Wi-Fi Module", "Bluetooth", "Sensors"],
    link: "#",
  },
  {
    id: "proj-2",
    title: "Symposium Paper Presentation",
    category: "Technical Research & Circuitry",
    description: "Authored and presented original research on Embedded Systems at a national-level technical symposium, analyzing real-time micro-controller integrations, wireless communication, and board-level layouts.",
    image: "/images/traditional_cyber.jpg", 
    tech: ["Research", "Embedded Logic", "Microcontrollers", "Protocols"],
    link: "#",
  },
  {
    id: "proj-3",
    title: "Full-Stack Development Projects",
    category: "Software Engineering Study",
    description: "Explored backend database applications using Core Java, Python, and SQL. Practices include Oracle databases, JDBC connectivity, Hibernate architectures, and designing minimal REST APIs.",
    image: "/images/creative_artist_cyber.jpg", 
    tech: ["Core Java", "Python", "SQL", "Hibernate", "REST APIs"],
    link: "#",
  },
];

export const SKILL_NODES: SkillNode[] = [
  { name: "Embedded & Arduino", category: "Embedded & IoT", level: 95, description: "Hands-on micro-controller coding, sensors mapping, Bluetooth/Wi-Fi configurations, and board layouts." },
  { name: "Core Java & Python", category: "Programming", level: 90, description: "Object-oriented program principles, multi-threading, structure algorithms, and data logic script writing." },
  { name: "Oracle SQL & JDBC", category: "Databases & Backend", level: 85, description: "Relational database tables design, complex query queries, Hibernate mapping, and REST API connectivity." },
  { name: "React.js Basics", category: "Frontend & Design", level: 80, description: "Building modern responsive user interface layouts using states, props, and custom components." },
  { name: "Circuit Design & IoT", category: "Embedded & IoT", level: 92, description: "Integrating sensor boards, testing power electronic relays, and configuring wireless network protocols." },
  { name: "Technical Research", category: "Programming", level: 88, description: "Analyzing hardware integrations and presenting original papers at national technical symposiums." },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "AI & Embedded IoT Intern",
    organization: "Artifai Tech / SANS Innovation, Salem",
    period: "2025 (14 Days)",
    description: "Explored AI-enabled embedded IoT system designs and automation scenarios. Developed hardware integration sketches and tested sensors.",
    highlights: [
      "Designed and coded Arduino routines connecting multiple relays and status sensors.",
      "Configured Wi-Fi and Bluetooth wireless communication protocols on test boards.",
      "Gained hands-on problem solving skills within standard lab and hardware parameters."
    ],
  },
  {
    id: "exp-2",
    role: "Java Virtual Intern",
    organization: "Besant Technologies, Bengaluru",
    period: "2025 (1 Month)",
    description: "Completed comprehensive virtual tasks focused on Java backend development, backend integrations, and server logic.",
    highlights: [
      "Practiced database connectivity using JDBC and Object-Relational Mapping (ORM) via Hibernate.",
      "Built clean, modular backend application layers and mock REST API architectures.",
      "Strengthened relational database operations using Oracle and structured SQL querying."
    ],
  },
  {
    id: "exp-3",
    role: "Bachelor of Engineering (ECE)",
    organization: "AVS Engineering College, Salem",
    period: "2023 - 2027",
    description: "Electronics and Communication Engineering study under Anna University. CGPA: 8.2 / 10. Focusing on Embedded Systems, Microcontrollers, and Wireless Protocols.",
    highlights: [
      "Presented original research paper on embedded integrations at a national symposium.",
      "Participated in workshops on image sensor integration and circuit board designs.",
      "Active team collaboration on automation projects."
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Dr. R. Elangovan",
    role: "Head of ECE Department",
    company: "AVS Engineering College",
    quote: "Shabana demonstrates exceptional commitment in both software and hardware logic. Her national-level symposium paper on embedded system integrations highlighted outstanding analytical research skills and technical leadership.",
    avatar: "/images/close_portrait_cyber.jpg",
  },
  {
    id: "t-2",
    name: "S. Karthik",
    role: "Senior Embedded Trainer",
    company: "Artifai Tech Salem",
    quote: "During her IoT internship, Shabana showed great speed in mastering multi-sensor networks and Arduino wireless protocols. She is highly self-motivated, adaptable, and approaches problem-solving with rigorous clarity.",
    avatar: "/images/premium_studio_cyber.jpg",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Shabana Mirza J",
    description: "Editorial portrait beside the arched studio windows, Salem.",
    image: "/images/hero_portrait_cyber.jpg",
    cols: "md:col-span-8",
  },
  {
    id: "gal-2",
    title: "Moments of Inspiration",
    description: "Calm morning tea reflection beside the window, studying code logs.",
    image: "/images/looking_outside_cyber.jpg",
    cols: "md:col-span-4",
  },
  {
    id: "gal-3",
    title: "Greenhouse Library Study",
    description: "Reviewing embedded systems and python scripting reference literature.",
    image: "/images/reading_cyber.jpg",
    cols: "md:col-span-4",
  },
  {
    id: "gal-4",
    title: "Traditional Saree Style",
    description: "Wearing a premium lavender silk saree beside old palace arches.",
    image: "/images/traditional_cyber.jpg",
    cols: "md:col-span-8",
  },
  {
    id: "gal-5",
    title: "Minimalist Modern Style",
    description: "Pinterest-inspired editorial attire for technical design showcases.",
    image: "/images/modern_fashion_cyber.jpg",
    cols: "md:col-span-6",
  },
  {
    id: "gal-6",
    title: "Atelier Art Studio",
    description: "Creating digital sketches and botanical watercolor textures for web UI layouts.",
    image: "/images/creative_artist_cyber.jpg",
    cols: "md:col-span-6",
  },
];
