"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PortfolioExperienceShell } from "./layout/portfolio-experience-shell";
import { PortfolioLoadingOverlay } from "./primitives/portfolio-loading-overlay";

export function PortfolioPage() {
  const [isLoadingOverlayVisible, setIsLoadingOverlayVisible] = useState(true);
  const [hasMountedOnClient, setHasMountedOnClient] = useState(false);

  useEffect(() => {
    setHasMountedOnClient(true);
  }, []);

  if (!hasMountedOnClient) {
    return null;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoadingOverlayVisible ? (
          <PortfolioLoadingOverlay
            onLoadingComplete={() => setIsLoadingOverlayVisible(false)}
          />
        ) : null}
      </AnimatePresence>

      {isLoadingOverlayVisible ? null : <PortfolioExperienceShell />}
    </>
  );
}
