import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export type PortfolioNavigationLink = {
  label: string;
  href: string;
};

export type CareerStat = {
  value: number;
  suffix: string;
  label: string;
};

export type SkillHighlight = {
  name: string;
  icon: IconType;
  color: string;
  proficiency: number;
};

export type ProjectCategory =
  | "Web Experience"
  | "Creative Coding"
  | "Dashboard"
  | "UI System";

export type ProjectPreviewVariant =
  | "orbit"
  | "grid"
  | "bars"
  | "signal"
  | "stack";

export type ProjectAvailability = "live" | "private" | "concept";

export type FeaturedProjectLayout = "lead" | "support" | "centerpiece";

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: string;
  category: ProjectCategory;
  technologies: string[];
  backgroundColor: string;
  accentColor: string;
  previewVariant: ProjectPreviewVariant;
  availability: ProjectAvailability;
  isFeatured: boolean;
  featuredLayout?: FeaturedProjectLayout;
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
};

export type FeaturedProject = PortfolioProject;

export type ProjectFilterOption = {
  label: "All" | ProjectCategory;
  accentColor: string;
};

export type SocialProfileLink = {
  label: string;
  icon: IconType;
  href: string;
};

export type ContactDetailAccentTone = "yellow" | "cyan";

export type ContactDetail = {
  label: string;
  value: string;
  icon: LucideIcon;
  accentTone: ContactDetailAccentTone;
};

export type ContactFieldName = "name" | "email" | "message";

export type ContactFormState = Record<ContactFieldName, string>;

export type ContactFieldDefinition = {
  name: ContactFieldName;
  label: string;
  inputType: "text" | "email" | "textarea";
  rows?: number;
};
