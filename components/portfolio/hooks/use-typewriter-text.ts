import { useEffect, useState } from "react";

export function useTypewriterText(fullText: string, typingIntervalMs = 50) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let characterIndex = 0;
    const intervalId = window.setInterval(() => {
      if (characterIndex <= fullText.length) {
        setVisibleText(fullText.slice(0, characterIndex));
        characterIndex += 1;
        return;
      }

      window.clearInterval(intervalId);
    }, typingIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [fullText, typingIntervalMs]);

  return visibleText;
}
