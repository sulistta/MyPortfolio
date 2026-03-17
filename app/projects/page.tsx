import type { Metadata } from "next";
import { PortfolioProjectsPage } from "../../components/portfolio/projects-page";

export const metadata: Metadata = {
  title: "Projects | Vítor Creative Developer",
  description:
    "Explore the full project catalog from Vítor, spanning web experiences, creative coding, dashboards, and UI systems.",
  openGraph: {
    title: "Projects | Vítor Creative Developer",
    description:
      "Explore the full project catalog from Vítor, spanning web experiences, creative coding, dashboards, and UI systems.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Projects | Vítor Creative Developer",
    description:
      "Explore the full project catalog from Vítor, spanning web experiences, creative coding, dashboards, and UI systems.",
  },
};

export default function ProjectsPage() {
  return <PortfolioProjectsPage />;
}
