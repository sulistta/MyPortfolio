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
  PortfolioNavigationLink,
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

export const featuredProjects: FeaturedProject[] = [
  {
    title: "NEON DREAMS",
    description:
      "An immersive WebGL experience exploring the boundaries of browser-based 3D graphics. Features real-time ray tracing, particle systems, and interactive environments.",
    technologies: ["Three.js", "React", "WebGL", "GLSL"],
    backgroundColor: "#1a0a2e",
    accentColor: "#FF006E",
    previewVariant: "orbit",
    layoutClassName: "lg:col-span-7",
  },
  {
    title: "CODE CANVAS",
    description:
      "A creative coding platform for artists and developers to experiment with generative art. Includes live preview, code sharing, and community galleries.",
    technologies: ["TypeScript", "Canvas API", "Web Workers", "Monaco Editor"],
    backgroundColor: "#0a1a0a",
    accentColor: "#00F5FF",
    previewVariant: "grid",
    layoutClassName: "lg:col-span-5 lg:mt-24",
  },
  {
    title: "DATA FLOW",
    description:
      "Real-time data visualization dashboard for monitoring complex systems. Processes millions of data points with sub-second latency and beautiful animations.",
    technologies: ["D3.js", "React", "WebSocket", "Node.js"],
    backgroundColor: "#0a0a1a",
    accentColor: "#FFE900",
    previewVariant: "bars",
    layoutClassName: "lg:col-span-8 lg:col-start-3 lg:-mt-12",
  },
];

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
