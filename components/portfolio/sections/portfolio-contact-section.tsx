import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  contactDetails,
  contactFieldDefinitions,
  contactSectionContent,
  socialProfileLinks,
} from "../portfolio-content";
import { portfolioEntranceEase, portfolioRevealViewport } from "../portfolio-motion";
import type {
  ContactFieldName,
  ContactFormState,
} from "../portfolio-types";
import {
  PORTFOLIO_SECTION_SCROLL_STYLE,
  cn,
  contactDetailAccentClassNames,
  portfolioButtonClassNames,
  portfolioLayoutClassNames,
  portfolioSurfaceClassNames,
  portfolioTypographyClassNames,
} from "../portfolio-styles";
import { ContactFormField } from "../primitives/contact-form-field";
import { MagneticActionButton } from "../primitives/magnetic-action-button";

const initialContactFormState: ContactFormState = {
  name: "",
  email: "",
  message: "",
};

export function PortfolioContactSection() {
  const contactSectionReference = useRef<HTMLElement>(null);
  const isContactSectionVisible = useInView(
    contactSectionReference,
    portfolioRevealViewport,
  );
  const [contactFormValues, setContactFormValues] =
    useState<ContactFormState>(initialContactFormState);
  const [focusedFieldName, setFocusedFieldName] =
    useState<ContactFieldName | null>(null);

  const handleContactFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.alert("Message sent! (Demo)");
  };

  const handleFieldValueChange = (
    fieldName: ContactFieldName,
    nextValue: string,
  ) => {
    setContactFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: nextValue,
    }));
  };

  return (
    <section
      id="contact"
      ref={contactSectionReference}
      className="relative overflow-hidden bg-ink-black py-24 md:py-32 lg:py-40"
      style={PORTFOLIO_SECTION_SCROLL_STYLE}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,245,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,0,110,0.14),transparent_38%)]" />
      <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-electric-yellow via-hot-magenta to-cyan-blast" />

      <div className={portfolioLayoutClassNames.contentContainer}>
        <div className={portfolioLayoutClassNames.sectionIntro}>
          <motion.h2 className={portfolioTypographyClassNames.contactSectionTitle}>
            {contactSectionContent.headingWords.map((headingWord, wordIndex) => (
              <motion.span
                key={headingWord}
                initial={{ y: 40, opacity: 0 }}
                animate={isContactSectionVisible ? { y: 0, opacity: 1 } : undefined}
                transition={{
                  duration: 0.4,
                  delay: wordIndex * 0.1,
                  ease: portfolioEntranceEase,
                }}
                className="mr-4 inline-block"
              >
                {headingWord}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isContactSectionVisible ? { y: 0, opacity: 1 } : undefined}
            transition={{ delay: 0.5, duration: 0.4 }}
            className={cn("mt-6 max-w-2xl", portfolioTypographyClassNames.bodyCopy)}
          >
            {contactSectionContent.intro}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isContactSectionVisible ? { x: 0, opacity: 1 } : undefined}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <form onSubmit={handleContactFormSubmit} className="space-y-8">
              {contactFieldDefinitions.map((fieldDefinition, fieldIndex) => (
                <ContactFormField
                  key={fieldDefinition.name}
                  fieldDefinition={fieldDefinition}
                  fieldValue={contactFormValues[fieldDefinition.name]}
                  focusedFieldName={focusedFieldName}
                  isSectionVisible={isContactSectionVisible}
                  animationDelay={0.4 + fieldIndex * 0.1}
                  onFieldValueChange={handleFieldValueChange}
                  onFieldFocus={setFocusedFieldName}
                  onFieldBlur={() => setFocusedFieldName(null)}
                />
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={isContactSectionVisible ? { opacity: 1 } : undefined}
                transition={{ delay: 0.7 }}
              >
                <MagneticActionButton
                  type="submit"
                  className={portfolioButtonClassNames.submit}
                  magnetStrength={0.2}
                  style={{ boxShadow: "8px 8px 0px rgba(250, 250, 250, 0.16)" }}
                >
                  <span className="flex items-center justify-center gap-3">
                    {contactSectionContent.submitLabel}
                    <Send className="h-5 w-5" />
                  </span>
                </MagneticActionButton>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isContactSectionVisible ? { x: 0, opacity: 1 } : undefined}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              {contactDetails.map((contactDetail) => {
                const ContactDetailIcon = contactDetail.icon;

                return (
                  <motion.div
                    key={contactDetail.label}
                    whileHover={{
                      x: 10,
                      boxShadow: "10px 10px 0px rgba(250, 250, 250, 0.18)",
                    }}
                    className={portfolioSurfaceClassNames.contactCard}
                  >
                    <div
                      className={cn(
                        portfolioSurfaceClassNames.contactIcon,
                        contactDetailAccentClassNames[contactDetail.accentTone],
                      )}
                    >
                      <ContactDetailIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-accent text-xs tracking-wider text-theme-text-subtle">
                        {contactDetail.label}
                      </p>
                      <p className="font-body text-lg font-bold text-theme-text">
                        {contactDetail.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div>
              <p className="mb-4 font-accent text-sm tracking-[0.2em] text-theme-text-subtle">
                {contactSectionContent.followLabel}
              </p>
              <div className="flex gap-4">
                {socialProfileLinks.map((socialProfileLink, socialLinkIndex) => {
                  const SocialIcon = socialProfileLink.icon;

                  return (
                    <motion.a
                      key={socialProfileLink.label}
                      href={socialProfileLink.href}
                      onClick={(event) => {
                        if (socialProfileLink.href === "#") {
                          event.preventDefault();
                        }
                      }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={
                        isContactSectionVisible
                          ? { scale: 1, rotate: 0 }
                          : undefined
                      }
                      transition={{
                        delay: 0.6 + socialLinkIndex * 0.1,
                        type: "spring",
                      }}
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                        boxShadow: "8px 8px 0px rgba(0, 245, 255, 0.28)",
                      }}
                      className={portfolioSurfaceClassNames.socialButton}
                    >
                      <SocialIcon className="h-6 w-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isContactSectionVisible ? { y: 0, opacity: 1 } : undefined}
              transition={{ delay: 0.8 }}
              className={portfolioSurfaceClassNames.funFactCard}
            >
              <p className="mb-2 font-accent text-sm tracking-wider text-electric-yellow">
                {contactSectionContent.funFactLabel}
              </p>
              <p className="font-body text-black/80">
                {contactSectionContent.funFactCopy}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
