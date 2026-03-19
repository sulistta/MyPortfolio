import { PORTFOLIO_FIXED_HEADER_OFFSET } from "./portfolio-styles";

export function scrollToSection(sectionId: string) {
  const sectionElement = document.getElementById(sectionId);

  if (sectionElement) {
    const sectionTop =
      window.scrollY +
      sectionElement.getBoundingClientRect().top -
      PORTFOLIO_FIXED_HEADER_OFFSET;

    window.scrollTo({
      top: Math.max(sectionTop, 0),
      behavior: "smooth",
    });
  }
}

export function scrollToSectionFromHref(sectionHref: string) {
  scrollToSection(sectionHref.replace(/^#/, ""));
}

export function scrollPageToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
