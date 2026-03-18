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
  ContactFieldDefinition,
  ContactFieldName,
  ContactFormState,
} from "../portfolio-types";
import {
  PORTFOLIO_SECTION_SCROLL_STYLE,
  portfolioLayoutClassNames,
} from "../portfolio-styles";
import { MagneticActionButton } from "../primitives/magnetic-action-button";

const initialContactFormState: ContactFormState = {
  name: "",
  email: "",
  message: "",
};

type DarkContactFormFieldProps = {
  fieldDefinition: ContactFieldDefinition;
  fieldValue: string;
  focusedFieldName: ContactFieldName | null;
  isSectionVisible: boolean;
  animationDelay: number;
  onFieldValueChange: (fieldName: ContactFieldName, nextValue: string) => void;
  onFieldFocus: (fieldName: ContactFieldName) => void;
  onFieldBlur: () => void;
};

function DarkContactFormField({
  fieldDefinition,
  fieldValue,
  focusedFieldName,
  isSectionVisible,
  animationDelay,
  onFieldValueChange,
  onFieldFocus,
  onFieldBlur,
}: DarkContactFormFieldProps) {
  const isFieldFocused = focusedFieldName === fieldDefinition.name;
  const shouldLiftLabel = isFieldFocused || Boolean(fieldValue);
  const fieldInputId = `contact-field-${fieldDefinition.name}`;
  const sharedFieldClassName =
    "w-full border-4 border-white bg-[#111111] px-4 py-4 font-body text-lg text-white placeholder:text-gray-500 transition-all duration-200 focus:outline-none";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isSectionVisible ? { opacity: 1 } : undefined}
      transition={{ delay: animationDelay }}
      className="relative"
    >
      <motion.label
        htmlFor={fieldInputId}
        animate={{
          y: shouldLiftLabel ? -28 : 0,
          scale: shouldLiftLabel ? 0.85 : 1,
          color: isFieldFocused ? "#00F5FF" : shouldLiftLabel ? "#FAFAFA" : "#9CA3AF",
        }}
        className="pointer-events-none absolute left-4 top-4 origin-left font-accent text-sm tracking-wider"
      >
        {fieldDefinition.label}
      </motion.label>

      {fieldDefinition.inputType === "textarea" ? (
        <textarea
          id={fieldInputId}
          value={fieldValue}
          onChange={(event) =>
            onFieldValueChange(fieldDefinition.name, event.target.value)
          }
          onFocus={() => onFieldFocus(fieldDefinition.name)}
          onBlur={onFieldBlur}
          rows={fieldDefinition.rows ?? 5}
          className={`${sharedFieldClassName} resize-none`}
          style={{
            boxShadow: isFieldFocused
              ? "8px 8px 0px #FF006E"
              : "6px 6px 0px rgba(250, 250, 250, 0.16)",
          }}
        />
      ) : (
        <input
          id={fieldInputId}
          type={fieldDefinition.inputType}
          value={fieldValue}
          onChange={(event) =>
            onFieldValueChange(fieldDefinition.name, event.target.value)
          }
          onFocus={() => onFieldFocus(fieldDefinition.name)}
          onBlur={onFieldBlur}
          className={sharedFieldClassName}
          style={{
            boxShadow: isFieldFocused
              ? "8px 8px 0px #FF006E"
              : "6px 6px 0px rgba(250, 250, 250, 0.16)",
          }}
        />
      )}
    </motion.div>
  );
}

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
          <motion.h2 className="font-heading text-4xl text-white md:text-6xl lg:text-7xl">
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
            className="mt-6 max-w-2xl font-body text-lg text-gray-300"
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
                <DarkContactFormField
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
                  className="w-full border-4 border-white bg-hot-magenta py-5 font-accent text-lg font-bold tracking-wider text-white transition-colors duration-200 hover:bg-electric-yellow hover:text-black"
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
                    className="flex items-center gap-4 border-4 border-white bg-[#101010] p-4 shadow-[8px_8px_0_0_rgba(250,250,250,0.14)]"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center border-4 border-white ${
                        contactDetail.accentTone === "yellow"
                          ? "bg-electric-yellow text-black"
                          : "bg-cyan-blast text-black"
                      }`}
                    >
                      <ContactDetailIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-accent text-xs tracking-wider text-gray-400">
                        {contactDetail.label}
                      </p>
                      <p className="font-body text-lg font-bold text-white">
                        {contactDetail.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div>
              <p className="mb-4 font-accent text-sm tracking-[0.2em] text-gray-400">
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
                      className="flex h-14 w-14 items-center justify-center border-4 border-white bg-[#111111] text-white shadow-[6px_6px_0_0_rgba(250,250,250,0.14)] transition-colors hover:bg-white hover:text-black"
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
              className="border-4 border-electric-yellow bg-[#18140a] p-6 text-white shadow-[8px_8px_0_0_rgba(255,0,110,0.24)]"
            >
              <p className="mb-2 font-accent text-sm tracking-wider text-electric-yellow">
                {contactSectionContent.funFactLabel}
              </p>
              <p className="font-body text-gray-200">
                {contactSectionContent.funFactCopy}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
