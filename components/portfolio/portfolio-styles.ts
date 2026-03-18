import type { CSSProperties } from "react";
import type {
  ContactDetailAccentTone,
  FeaturedProjectLayout,
} from "./portfolio-types";

type ClassNameValue = false | null | string | undefined;

export function cn(...classNameValues: ClassNameValue[]) {
  return classNameValues.filter(Boolean).join(" ");
}

export const PORTFOLIO_FIXED_HEADER_OFFSET = 112;

export const PORTFOLIO_CONTAINER_CLASS_NAME =
  "mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20";

export const PORTFOLIO_SECTION_SCROLL_STYLE = {
  scrollMarginTop: PORTFOLIO_FIXED_HEADER_OFFSET,
} satisfies CSSProperties;

export const PORTFOLIO_GRID_PATTERN_LIGHT_STYLE = {
  backgroundImage:
    "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
  backgroundSize: "60px 60px",
} satisfies CSSProperties;

export const PORTFOLIO_GRID_PATTERN_DARK_STYLE = {
  backgroundImage:
    "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
  backgroundSize: "80px 80px",
} satisfies CSSProperties;

export const PORTFOLIO_SKILLS_PATTERN_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(45deg, #000, #000 2px, transparent 2px, transparent 20px)",
} satisfies CSSProperties;

export const portfolioLayoutClassNames = {
  shell: "relative noise-overlay",
  contentContainer: cn("relative z-10", PORTFOLIO_CONTAINER_CLASS_NAME),
  contentContainerWide: cn(
    "relative z-10 w-full",
    PORTFOLIO_CONTAINER_CLASS_NAME,
  ),
  sectionIntro: "mb-16 md:mb-24",
  kickerRow: "mb-4 flex items-center gap-4",
  lightSection: "relative overflow-hidden bg-off-white py-24 md:py-32 lg:py-40",
  lightSectionCompact: "relative overflow-hidden bg-off-white py-24 md:py-32",
  creamSection:
    "relative overflow-hidden bg-soft-cream py-24 md:py-32 lg:py-40",
  darkSection: "relative overflow-hidden bg-charcoal py-24 md:py-32 lg:py-40",
} as const;

export const portfolioTypographyClassNames = {
  heroDisplay:
    "font-heading text-[15vw] leading-[0.85] tracking-tight text-ink-black md:text-[12vw] lg:text-[10vw]",
  projectsDisplay:
    "font-heading text-[20vw] leading-[0.85] tracking-tight text-ink-black md:text-[12vw] lg:text-[10vw]",
  lightSectionTitle:
    "font-heading text-5xl text-ink-black md:text-6xl lg:text-7xl",
  darkSectionTitle: "font-heading text-5xl text-white md:text-6xl lg:text-8xl",
  contactSectionTitle:
    "font-heading text-4xl text-ink-black md:text-6xl lg:text-7xl",
  kickerOnLight: "font-accent text-sm tracking-[0.2em] text-light-gray",
  kickerOnDark: "font-accent text-sm tracking-[0.2em] text-gray-400",
  bodyCopy: "font-body text-lg leading-relaxed text-dark-gray",
  heroLead:
    "font-body text-lg leading-relaxed text-ink-black md:text-xl lg:text-2xl",
  cardTitle: "font-heading text-3xl text-ink-black md:text-3xl",
  featuredCardTitle: "font-heading text-2xl text-ink-black md:text-3xl",
  cardSummary: "font-body text-sm leading-relaxed text-light-gray",
  cardDescription: "font-body text-sm leading-relaxed text-dark-gray",
  skillCardTitle:
    "font-accent text-sm font-bold tracking-wider text-ink-black md:text-base",
  statLabel: "font-accent text-xs tracking-wider text-light-gray md:text-sm",
  metaLabel: "font-accent text-xs tracking-wider text-light-gray",
} as const;

export const portfolioSurfaceClassNames = {
  panel: "border-4 border-black bg-white",
  panelShadow: "border-4 border-black bg-white shadow-brutal",
  panelShadowLg: "border-4 border-black bg-white shadow-brutal-lg",
  statCard: "border-4 border-black bg-white p-6 shadow-brutal",
  statCardCompact:
    "border-4 border-black bg-white p-4 transition-all duration-200 shadow-brutal md:p-6",
  contactCard:
    "flex items-center gap-4 border-4 border-black bg-white p-4 shadow-brutal",
  contactIcon:
    "flex h-12 w-12 items-center justify-center border-4 border-black",
  socialButton:
    "flex h-14 w-14 items-center justify-center border-4 border-black bg-white transition-shadow",
  tag: "border-2 border-black px-3 py-1 font-accent text-xs tracking-wider",
  badge: "border-4 border-black px-3 py-1 font-accent text-xs tracking-wider",
  input:
    "w-full border-4 border-black bg-white px-4 py-4 font-body text-lg transition-all duration-200 focus:outline-none",
  textarea:
    "w-full resize-none border-4 border-black bg-white px-4 py-4 font-body text-lg transition-all duration-200 focus:outline-none",
  accentCorner:
    "absolute right-0 top-0 h-0 w-0 border-l-[60px] border-t-[60px]",
  funFactCard:
    "border-4 border-black bg-electric-yellow p-6 shadow-brutal-magenta",
  emptyState:
    "border-4 border-white bg-off-white p-6 text-center shadow-brutal",
} as const;

export const portfolioButtonClassNames = {
  navPrimary:
    "border-4 border-black bg-black px-5 py-2 font-accent text-sm tracking-wider text-white transition-colors hover:bg-electric-yellow hover:text-black",
  hero: "group relative border-4 border-black bg-black px-8 py-4 font-accent text-lg font-bold tracking-wider text-white shadow-brutal transition-shadow duration-200 hover:shadow-brutal-accent",
  primary:
    "border-4 border-black bg-black px-8 py-4 font-accent text-lg font-bold tracking-wider text-white transition-colors duration-200 hover:bg-electric-yellow hover:text-black",
  secondary:
    "inline-flex items-center gap-3 border-4 border-black bg-white px-8 py-4 font-accent text-lg font-bold tracking-wider text-black transition-colors duration-200 hover:bg-electric-yellow hover:text-black",
  accent:
    "border-4 border-black bg-hot-magenta px-8 py-4 font-accent text-xl font-bold tracking-wider text-white shadow-brutal",
  submit:
    "w-full animate-pulse-glow border-4 border-black bg-hot-magenta py-5 font-accent text-lg font-bold tracking-wider text-white transition-colors duration-200 hover:bg-black",
  darkGhost:
    "inline-flex items-center gap-3 border-4 border-white bg-transparent px-8 py-4 font-accent text-lg font-bold tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-black",
  footerGhost:
    "group border-4 border-white bg-transparent px-6 py-3 transition-colors duration-200 hover:bg-white hover:text-black",
  filter:
    "border-4 border-black px-4 py-2 font-accent text-sm font-bold tracking-wider text-black transition-colors",
} as const;

export const portfolioProjectActionLinkClassNames = {
  dark: {
    primary:
      "border-4 border-black bg-black px-4 py-2 font-accent text-sm font-bold tracking-wider text-white transition-colors hover:bg-electric-yellow hover:text-black",
    secondary:
      "border-4 border-black bg-white px-4 py-2 font-accent text-sm font-bold tracking-wider text-black transition-colors hover:bg-electric-yellow hover:text-black",
    accent:
      "border-4 border-black bg-hot-magenta px-4 py-2 font-accent text-sm font-bold tracking-wider text-white transition-colors hover:bg-electric-yellow hover:text-black",
  },
  light: {
    primary:
      "border-4 border-white bg-white px-6 py-3 font-accent font-bold text-black transition-colors hover:bg-electric-yellow",
    secondary:
      "border-4 border-white bg-transparent px-6 py-3 font-accent font-bold text-white transition-colors hover:bg-white hover:text-black",
    accent:
      "border-4 border-white bg-hot-magenta px-6 py-3 font-accent font-bold text-white transition-colors hover:bg-electric-yellow hover:text-black",
  },
} as const;

export const featuredProjectLayoutClassNames: Record<
  FeaturedProjectLayout,
  string
> = {
  lead: "lg:col-span-7",
  support: "lg:col-span-5 lg:mt-24",
  centerpiece: "lg:col-span-8 lg:col-start-3",
};

export const contactDetailAccentClassNames: Record<
  ContactDetailAccentTone,
  string
> = {
  yellow: "bg-electric-yellow",
  cyan: "bg-cyan-blast",
};
