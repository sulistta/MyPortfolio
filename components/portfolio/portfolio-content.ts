import { Mail, MapPin } from "lucide-react";
import {
  FaDribbble,
  FaGithub,
  FaLinkedinIn,
  FaWandMagicSparkles,
  FaXTwitter,
} from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import {
  SiFigma,
  SiGit,
  SiGraphql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import type {
  CareerStat,
  ContactDetail,
  ContactFieldDefinition,
  FeaturedProject,
  PortfolioProject,
  PortfolioNavigationLink,
  ProjectFilterOption,
  SkillHighlight,
  SocialProfileLink,
} from "./portfolio-types";

export const portfolioBrand = {
  headerMark: "VÍTOR",
  heroPrimaryHeading: "VÍTOR",
  heroSecondaryHeading: "DEV",
  heroRole: "Creative Developer",
  heroSubtitle: "Digital Artist",
  heroTagline: "I BUILD DIGITAL EXPERIENCES THAT DEFY EXPECTATIONS",
  heroPrimaryActionLabel: "VIEW MY WORK",
  primaryNavigationActionLabel: "HIRE ME",
  availabilityLabel: "AVAILABLE FOR WORK",
  footerPrimaryLabel: "VÍTOR",
  footerAccentLabel: "DEV",
  footerSubtitle: "Creative Developer & Digital Artist",
  footerBackgroundWord: "VÍTOR DEV",
} as const;

export const portfolioNavigationLinks: PortfolioNavigationLink[] = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export const aboutSectionContent = {
  heading: "ABOUT ME",
  profileMonogram: "372",
  introHighlight: "creative developer",
  experienceHighlight: "5+ years of experience",
  paragraphs: [
    "I'm a creative developer based in San Francisco, crafting immersive digital experiences at the intersection of design and technology. I believe code is an art form, and every project is an opportunity to push boundaries.",
    "With 5+ years of experience, I specialize in building performant, accessible, and visually stunning web applications that leave lasting impressions. From interactive 3D experiences to sleek user interfaces, I bring ideas to life with meticulous attention to detail.",
    "When I'm not coding, you'll find me exploring generative art, experimenting with WebGL, or hunting for the perfect cup of coffee.",
  ],
} as const;

export const skillsSectionContent = {
  kicker: "WHAT I DO",
  title: "SKILL SET",
} as const;

export const featuredProjectsSectionContent = {
  kicker: "SELECTED WORK",
  title: "FEATURED",
  highlightedTitle: "PROJECTS",
  secondaryActionLabel: "VIEW ALL PROJECTS",
} as const;

export const projectsPageHeroContent = {
  kicker: "FULL CATALOG",
  title: "ALL",
  highlightedTitle: "PROJECTS",
  intro:
    "A wider look at the interfaces, experiments, and systems I design to feel alive on screen. Each project pushes a different corner of motion, interaction, and frontend craft.",
  primaryActionLabel: "BROWSE THE GRID",
  secondaryActionLabel: "START A PROJECT",
} as const;

export const projectsCatalogSectionContent = {
  kicker: "FILTER BY DISCIPLINE",
  title: "PROJECT LINEUP",
  highlightedTitle: "IN MOTION",
  emptyStateTitle: "No projects in this lane yet.",
  emptyStateDescription:
    "Switch categories to explore another slice of the portfolio.",
  actionLabels: {
    live: "VIEW",
    repo: "CODE",
    caseStudy: "CASE STUDY",
  },
} as const;

export const contactSectionContent = {
  headingWords: ["LET'S", "CREATE", "SOMETHING", "AMAZING"],
  intro: "Have a project in mind? Let's talk about it.",
  followLabel: "FOLLOW ME",
  funFactLabel: "FUN FACT",
  funFactCopy:
    "I once debugged code for 8 hours straight, only to find it was a missing semicolon. Now I use linters religiously.",
  submitLabel: "SEND MESSAGE",
} as const;

export const careerStats: CareerStat[] = [
  { value: 5, suffix: "+", label: "YEARS EXPERIENCE" },
  { value: 50, suffix: "+", label: "PROJECTS DELIVERED" },
  { value: 999, suffix: "+", label: "CUPS OF COFFEE" },
];

export const technicalSkills: SkillHighlight[] = [
  { name: "React", icon: SiReact, color: "#00F5FF", proficiency: 95 },
  { name: "TypeScript", icon: SiTypescript, color: "#FFE900", proficiency: 90 },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", proficiency: 88 },
  { name: "Node.js", icon: SiNodedotjs, color: "#FF006E", proficiency: 85 },
  { name: "Three.js", icon: SiThreedotjs, color: "#00F5FF", proficiency: 80 },
  {
    name: "GSAP",
    icon: FaWandMagicSparkles,
    color: "#FFE900",
    proficiency: 85,
  },
  {
    name: "Tailwind",
    icon: RiTailwindCssFill,
    color: "#00F5FF",
    proficiency: 95,
  },
  { name: "Figma", icon: SiFigma, color: "#FF006E", proficiency: 75 },
  { name: "Git", icon: SiGit, color: "#FFE900", proficiency: 90 },
  { name: "GraphQL", icon: SiGraphql, color: "#FF006E", proficiency: 70 },
];

export const projectFilterOptions: ProjectFilterOption[] = [
  { label: "All", accentColor: "#FFE900" },
  { label: "Web Experience", accentColor: "#00F5FF" },
  { label: "Creative Coding", accentColor: "#FF006E" },
  { label: "Dashboard", accentColor: "#FFE900" },
  { label: "UI System", accentColor: "#00F5FF" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "project-neon-dreams",
    slug: "neon-dreams",
    title: "NEON DREAMS",
    summary: "Immersive 3D storytelling for a fashion campaign landing experience.",
    description:
      "An immersive WebGL experience exploring the boundaries of browser-based 3D graphics with interactive scenes, ray-marched lighting, and layered audio cues.",
    year: "2025",
    category: "Creative Coding",
    technologies: ["Three.js", "React", "WebGL", "GLSL"],
    backgroundColor: "#1a0a2e",
    accentColor: "#FF006E",
    previewVariant: "orbit",
    availability: "live",
    isFeatured: true,
    featuredLayoutClassName: "lg:col-span-7",
    liveUrl: "https://example.com/neon-dreams",
    repoUrl: "https://github.com/example/neon-dreams",
    caseStudyUrl: "https://example.com/case-study/neon-dreams",
  },
  {
    id: "project-code-canvas",
    slug: "code-canvas",
    title: "CODE CANVAS",
    summary: "Generative art playground built for designers who want code-level control.",
    description:
      "A creative coding platform for artists and developers to experiment with generative art, save compositions, and remix live sketches with collaborators.",
    year: "2024",
    category: "Creative Coding",
    technologies: ["TypeScript", "Canvas API", "Web Workers", "Monaco Editor"],
    backgroundColor: "#0a1a0a",
    accentColor: "#00F5FF",
    previewVariant: "grid",
    availability: "private",
    isFeatured: true,
    featuredLayoutClassName: "lg:col-span-5 lg:mt-24",
    repoUrl: "https://github.com/example/code-canvas",
    caseStudyUrl: "https://example.com/case-study/code-canvas",
  },
  {
    id: "project-data-flow",
    slug: "data-flow",
    title: "DATA FLOW",
    summary: "A live operations dashboard tuned for high-volume streams and quick decisions.",
    description:
      "Real-time data visualization dashboard for monitoring complex systems. It processes millions of data points with sub-second latency and high-signal motion cues.",
    year: "2025",
    category: "Dashboard",
    technologies: ["D3.js", "React", "WebSocket", "Node.js"],
    backgroundColor: "#0a0a1a",
    accentColor: "#FFE900",
    previewVariant: "bars",
    availability: "live",
    isFeatured: true,
    featuredLayoutClassName: "lg:col-span-8 lg:col-start-3 lg:-mt-12",
    liveUrl: "https://example.com/data-flow",
  },
  {
    id: "project-mono-market",
    slug: "mono-market",
    title: "MONO MARKET",
    summary: "Editorial commerce concept blending campaign storytelling with retail motion.",
    description:
      "A storefront concept focused on editorial pacing, motion-forward merchandising, and a flexible content system for fast campaign turnarounds.",
    year: "2024",
    category: "Web Experience",
    technologies: ["Next.js", "TypeScript", "Stripe", "Sanity"],
    backgroundColor: "#101010",
    accentColor: "#00F5FF",
    previewVariant: "stack",
    availability: "live",
    isFeatured: false,
    liveUrl: "https://example.com/mono-market",
    caseStudyUrl: "https://example.com/case-study/mono-market",
  },
  {
    id: "project-pulse-atlas",
    slug: "pulse-atlas",
    title: "PULSE ATLAS",
    summary: "Control room interface for campaign analytics, release pacing, and alerting.",
    description:
      "An internal analytics workspace designed to keep performance, velocity, and anomalies readable across large teams without losing visual polish.",
    year: "2023",
    category: "Dashboard",
    technologies: ["React", "GraphQL", "Node.js", "Framer Motion"],
    backgroundColor: "#170c24",
    accentColor: "#FF006E",
    previewVariant: "signal",
    availability: "private",
    isFeatured: false,
    caseStudyUrl: "https://example.com/case-study/pulse-atlas",
  },
  {
    id: "project-frame-forge",
    slug: "frame-forge",
    title: "FRAME FORGE",
    summary: "Component system and design tooling for fast, expressive campaign builds.",
    description:
      "A UI system package that connects tokens, layouts, and motion presets so product teams can ship new story-driven pages with consistent craft.",
    year: "2025",
    category: "UI System",
    technologies: ["React", "Storybook", "TypeScript", "Design Tokens"],
    backgroundColor: "#102326",
    accentColor: "#FFE900",
    previewVariant: "grid",
    availability: "live",
    isFeatured: false,
    repoUrl: "https://github.com/example/frame-forge",
    caseStudyUrl: "https://example.com/case-study/frame-forge",
  },
  {
    id: "project-signal-stories",
    slug: "signal-stories",
    title: "SIGNAL STORIES",
    summary: "Interactive newsroom presentation layer for scroll-driven explainers.",
    description:
      "A long-form publishing experience combining modular storytelling blocks, responsive motion, and content orchestration for editorial teams.",
    year: "2024",
    category: "Web Experience",
    technologies: ["Next.js", "MDX", "GSAP", "Vercel"],
    backgroundColor: "#1f1408",
    accentColor: "#FFE900",
    previewVariant: "bars",
    availability: "live",
    isFeatured: false,
    liveUrl: "https://example.com/signal-stories",
    repoUrl: "https://github.com/example/signal-stories",
  },
  {
    id: "project-material-motion-lab",
    slug: "material-motion-lab",
    title: "MATERIAL MOTION LAB",
    summary: "A prototyping sandbox for kinetic surfaces, shaders, and interaction studies.",
    description:
      "An R&D lab for testing motion systems, tactile UI behaviors, and lightweight shader treatments before they land in production work.",
    year: "2023",
    category: "UI System",
    technologies: ["React", "Framer Motion", "WebGL", "Figma"],
    backgroundColor: "#0d1324",
    accentColor: "#00F5FF",
    previewVariant: "orbit",
    availability: "concept",
    isFeatured: false,
    caseStudyUrl: "https://example.com/case-study/material-motion-lab",
  },
];

export const featuredProjects: FeaturedProject[] = portfolioProjects.filter(
  (portfolioProject) => portfolioProject.isFeatured,
);

export const socialProfileLinks: SocialProfileLink[] = [
  { label: "GitHub", icon: FaGithub, href: "#" },
  { label: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  { label: "Twitter", icon: FaXTwitter, href: "#" },
  { label: "Dribbble", icon: FaDribbble, href: "#" },
];

export const contactDetails: ContactDetail[] = [
  {
    label: "EMAIL",
    value: "uvitor372@gmail.com",
    icon: Mail,
    iconContainerClassName: "bg-electric-yellow",
  },
  {
    label: "LOCATION",
    value: "San Francisco, CA",
    icon: MapPin,
    iconContainerClassName: "bg-cyan-blast",
  },
];

export const contactFieldDefinitions: ContactFieldDefinition[] = [
  { name: "name", label: "YOUR NAME", inputType: "text" },
  { name: "email", label: "YOUR EMAIL", inputType: "email" },
  { name: "message", label: "YOUR MESSAGE", inputType: "textarea", rows: 5 },
];
