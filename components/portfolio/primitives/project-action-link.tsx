import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type ProjectActionLinkProps = {
  href?: string;
  label: string;
  icon: LucideIcon;
  className: string;
  disabledClassName?: string;
};

export function ProjectActionLink({
  href,
  label,
  icon: ActionIcon,
  className,
  disabledClassName,
}: ProjectActionLinkProps) {
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
        className={disabledClassName ?? `${className} pointer-events-none`}
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
      className={className}
    >
      {actionContent}
    </motion.a>
  );
}
