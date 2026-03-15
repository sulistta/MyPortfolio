export const PORTFOLIO_CONTAINER_CLASS_NAME =
  "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20";

export function scrollToSection(sectionId: string) {
  const sectionElement = document.getElementById(sectionId);

  if (sectionElement) {
    const fixedHeaderOffset = 112;
    const sectionTop =
      window.scrollY + sectionElement.getBoundingClientRect().top - fixedHeaderOffset;

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
