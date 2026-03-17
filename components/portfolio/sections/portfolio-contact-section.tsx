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
import type { ContactFieldName, ContactFormState } from "../portfolio-types";
import { PORTFOLIO_CONTAINER_CLASS_NAME } from "../portfolio-utils";
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
      className="relative overflow-hidden bg-off-white py-24 md:py-32 lg:py-40"
      style={{ scrollMarginTop: 112 }}
    >
      <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-electric-yellow via-hot-magenta to-cyan-blast" />

      <div className={`relative z-10 ${PORTFOLIO_CONTAINER_CLASS_NAME}`}>
        <div className="mb-16 md:mb-24">
          <motion.h2 className="font-heading text-4xl text-ink-black md:text-6xl lg:text-7xl">
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
            className="mt-6 font-body text-lg text-light-gray"
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
                  className="w-full animate-pulse-glow border-4 border-black bg-hot-magenta py-5 font-accent text-lg font-bold tracking-wider text-white transition-colors duration-200 hover:bg-black"
                  magnetStrength={0.2}
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
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 border-4 border-black bg-white p-4 shadow-brutal"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center border-4 border-black ${contactDetail.iconContainerClassName}`}
                    >
                      <ContactDetailIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-accent text-xs tracking-wider text-light-gray">
                        {contactDetail.label}
                      </p>
                      <p className="font-body text-lg font-bold">
                        {contactDetail.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div>
              <p className="mb-4 font-accent text-sm tracking-wider text-light-gray">
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
                        boxShadow: "8px 8px 0px #000",
                      }}
                      className="flex h-14 w-14 items-center justify-center border-4 border-black bg-white transition-shadow"
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
              className="border-4 border-black bg-electric-yellow p-6 shadow-brutal-magenta"
            >
              <p className="mb-2 font-accent text-sm tracking-wider">
                {contactSectionContent.funFactLabel}
              </p>
              <p className="font-body text-dark-gray">
                {contactSectionContent.funFactCopy}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
