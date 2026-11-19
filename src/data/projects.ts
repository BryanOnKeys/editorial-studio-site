export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  industry: string;
  services: string[];
  overview: string;
  challenge: string;
  solution: string;
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "ladestack",
    title: "LadeStack",
    category: "Developer Ecosystem",
    year: "2024",
    client: "Independent Platform",
    industry: "Developer Tools",
    services: ["Platform Architecture", "UI/UX Design", "Content Strategy"],
    overview: "A central developer-friendly ecosystem and product directory for browser-first utilities, technical documentation, and practical software applications.",
    challenge: "Everyday developers and learners face fragmented websites, intrusive advertising, forced registration, and expensive subscription paywalls for basic daily utilities.",
    solution: "Built an Astro-powered platform uniting specialized tools into an accessible, privacy-conscious ecosystem with zero-setup barriers and clean documentation.",
    demoUrl: "https://ladestack.in",
    githubUrl: "https://github.com/girishlade111",
  },
  {
    slug: "gb-coder",
    title: "GB Coder",
    category: "Browser IDE",
    year: "2024",
    client: "LadeStack",
    industry: "Software Engineering",
    services: ["Monaco Integration", "WebContainers", "Frontend Engineering"],
    overview: "A Monaco-based in-browser IDE and code studio designed for instant static web prototyping and Node.js-oriented development workflows.",
    challenge: "Setting up local development environments and dependency toolchains creates substantial friction for beginners, students, and rapid prototyping sessions.",
    solution: "Implemented Monaco Editor with sandboxed previews and WebContainer browser runtimes, enabling local-first persistence, instant coding, and ZIP project exports without cloud lock-in.",
    demoUrl: "https://ladestack.in",
    githubUrl: "https://github.com/girishlade111",
  },
  {
    slug: "ls-pdf",
    title: "LS PDF",
    category: "Privacy Toolkit",
    year: "2024",
    client: "LadeStack",
    industry: "Document Processing",
    services: ["Client-Side Processing", "Web Workers", "UI/UX Design"],
    overview: "A local-first document utility suite delivering 17 essential PDF operations entirely inside the user's browser without uploading files to remote servers.",
    challenge: "Most commercial web PDF converters force users to upload confidential personal, financial, and legal records to unknown third-party servers.",
    solution: "Engineered browser-local file processing using pdf-lib, PDF.js, and Web Workers, keeping user documents strictly on-device for guaranteed privacy and fast turnaround.",
    demoUrl: "https://ladestack.in",
    githubUrl: "https://github.com/girishlade111",
  },
  {
    slug: "md2pdf",
    title: "MD2PDF",
    category: "Publishing Engine",
    year: "2024",
    client: "LadeStack",
    industry: "Technical Publishing",
    services: ["GFM Parsing", "KaTeX Integration", "Print CSS Layouts"],
    overview: "A developer publishing tool transforming Markdown files, notes, and GitHub repositories into publication-ready PDFs and multi-chapter documentation books.",
    challenge: "Formatting complex technical notes with syntax-highlighted code blocks, mathematical equations, and structured chapters into clean printable documents requires heavy desktop software.",
    solution: "Crafted an Astro-based publishing engine supporting GitHub-Flavored Markdown, KaTeX typesetting, automated table of contents, and print-optimized typography.",
    demoUrl: "https://ladestack.in",
    githubUrl: "https://github.com/girishlade111",
  },
  {
    slug: "bharat-land-converter",
    title: "Bharat Land Converter",
    category: "Regional Measurement",
    year: "2024",
    client: "LadeStack",
    industry: "Real Estate & Agriculture",
    services: ["Algorithm Design", "Responsive Interface", "State Localization"],
    overview: "A region-aware land area conversion application designed to navigate the practical complexity of traditional Indian measurement systems.",
    challenge: "Traditional land units like Guntha, Bigha, and Biswa vary significantly across Indian states and districts, leading to confusion in property discussions.",
    solution: "Created a responsive conversion tool mapping local units against metric and imperial standards with state-specific reference factors for clear preliminary calculations.",
    demoUrl: "https://ladestack.in",
    githubUrl: "https://github.com/girishlade111",
  },
  {
    slug: "swift-resume",
    title: "Swift Resume",
    category: "Career Productivity",
    year: "2024",
    client: "LadeStack",
    industry: "Career & Education",
    services: ["React Architecture", "Live A4 Preview", "PDF Generation"],
    overview: "A clean, ATS-friendly resume builder designed to help students and job seekers craft structured professional resumes with instant live previews.",
    challenge: "Job seekers frequently encounter predatory resume builders that demand payment at the final export step or generate unreadable formatting.",
    solution: "Developed a form-driven interface with instant A4 live preview, structured sections, local browser draft persistence, and free one-click PDF export.",
    demoUrl: "https://ladestack.in",
    githubUrl: "https://github.com/girishlade111",
  },
  {
    slug: "ls-image-compressor",
    title: "LS Image Compressor",
    category: "Media Optimization",
    year: "2024",
    client: "LadeStack",
    industry: "Web Performance",
    services: ["Canvas API", "Image Optimization", "Format Conversion"],
    overview: "A privacy-conscious browser image utility focused on file compression, dimension resizing, and format conversion directly on the user's device.",
    challenge: "Preparing visual media for web publishing or strict upload limits often requires uploading personal photos to external servers or installing heavy tools.",
    solution: "Built client-side Canvas and Web Worker routines supporting JPEG, PNG, and WebP formats with quality controls, dimension limits, and clipboard pasting.",
    demoUrl: "https://ladestack.in",
    githubUrl: "https://github.com/girishlade111",
  },
  {
    slug: "gamehub",
    title: "GameHub",
    category: "Interactive Web",
    year: "2024",
    client: "LadeStack",
    industry: "Web Games",
    services: ["Next.js 15", "Dynamic Code Splitting", "Canvas Game Loops"],
    overview: "An instant-play browser gaming portal hosting 33 curated lightweight arcade, puzzle, strategy, and casual games with zero install overhead.",
    challenge: "Providing dozens of interactive mini-apps within a unified web catalog without degrading performance, bundle size, or mobile responsiveness.",
    solution: "Engineered a modular Next.js application using dynamic imports, canvas animation frames, and responsive touch controls for smooth in-browser play.",
    demoUrl: "https://ladestack.in",
    githubUrl: "https://github.com/girishlade111",
  },
];
