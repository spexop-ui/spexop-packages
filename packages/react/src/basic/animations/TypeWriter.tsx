import { useEffect, useState } from "react";
import type React from "react";

export interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = "|",
  className,
  style,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setCurrentIndex(0);
      }, delay);
      return () => clearTimeout(delayTimeout);
    }
  }, [delay]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }

    if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <span className={className} style={style}>
      {displayedText}
      {cursor && !isComplete && (
        <span
          style={{
            animation: "blink 1s step-end infinite",
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};

TypeWriter.displayName = "TypeWriter";
