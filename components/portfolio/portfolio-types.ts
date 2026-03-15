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

export type FeaturedProject = {
  title: string;
  description: string;
  technologies: string[];
  backgroundColor: string;
  accentColor: string;
  previewVariant: "orbit" | "grid" | "bars";
  layoutClassName: string;
};

export type SocialProfileLink = {
  label: string;
  icon: IconType;
  href: string;
};

export type ContactDetail = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconContainerClassName: string;
};

export type ContactFieldName = "name" | "email" | "message";

export type ContactFormState = Record<ContactFieldName, string>;

export type ContactFieldDefinition = {
  name: ContactFieldName;
  label: string;
  inputType: "text" | "email" | "textarea";
  rows?: number;
};
