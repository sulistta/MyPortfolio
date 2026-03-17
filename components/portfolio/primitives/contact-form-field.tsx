import { motion } from "framer-motion";
import type {
  ContactFieldDefinition,
  ContactFieldName,
} from "../portfolio-types";
import { portfolioSurfaceClassNames } from "../portfolio-styles";

type ContactFormFieldProps = {
  fieldDefinition: ContactFieldDefinition;
  fieldValue: string;
  focusedFieldName: ContactFieldName | null;
  isSectionVisible: boolean;
  animationDelay: number;
  onFieldValueChange: (fieldName: ContactFieldName, nextValue: string) => void;
  onFieldFocus: (fieldName: ContactFieldName) => void;
  onFieldBlur: () => void;
};

export function ContactFormField({
  fieldDefinition,
  fieldValue,
  focusedFieldName,
  isSectionVisible,
  animationDelay,
  onFieldValueChange,
  onFieldFocus,
  onFieldBlur,
}: ContactFormFieldProps) {
  const isFieldFocused = focusedFieldName === fieldDefinition.name;
  const shouldLiftLabel = isFieldFocused || Boolean(fieldValue);
  const fieldInputId = `contact-field-${fieldDefinition.name}`;

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
          color: isFieldFocused ? "#FF006E" : "#666666",
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
          className={portfolioSurfaceClassNames.textarea}
          style={{
            boxShadow: isFieldFocused ? "8px 8px 0px #FF006E" : "4px 4px 0px #000",
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
          className={portfolioSurfaceClassNames.input}
          style={{
            boxShadow: isFieldFocused ? "8px 8px 0px #FF006E" : "4px 4px 0px #000",
          }}
        />
      )}
    </motion.div>
  );
}
