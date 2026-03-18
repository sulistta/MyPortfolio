import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  cn,
  portfolioProjectActionLinkClassNames,
} from "../portfolio-styles";

type ProjectActionLinkSurface = keyof typeof portfolioProjectActionLinkClassNames;
type ProjectActionLinkVariant =
  keyof (typeof portfolioProjectActionLinkClassNames)["dark"];

type ProjectActionLinkProps = {
  href?: string;
  label: string;
  icon: LucideIcon;
  surface: ProjectActionLinkSurface;
  variant: ProjectActionLinkVariant;
  className?: string;
};

export function ProjectActionLink({
  href,
  label,
  icon: ActionIcon,
  surface,
  variant,
  className,
}: ProjectActionLinkProps) {
  const resolvedClassName = cn(
    "inline-flex items-center justify-center backdrop-blur-sm",
    portfolioProjectActionLinkClassNames[surface][variant],
    className,
  );
  const actionContent = (
    <span className="flex items-center gap-2">
      <ActionIcon className="h-5 w-5" />
      {label}
    </span>
  );

  if (!href) {
    return (
      <motion.span
        aria-disabled="true"
        className={cn(resolvedClassName, "pointer-events-none")}
        style={{ opacity: 0.45 }}
      >
        {actionContent}
      </motion.span>
    );
  }

  const isExternalHref = /^https?:\/\//.test(href);

  return (
    <motion.a
      href={href}
      target={isExternalHref ? "_blank" : undefined}
      rel={isExternalHref ? "noreferrer" : undefined}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={resolvedClassName}
    >
      {actionContent}
    </motion.a>
  );
}
