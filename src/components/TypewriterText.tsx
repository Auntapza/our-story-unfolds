import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

const TypewriterText = ({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = "",
}: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [displayed, started, text, speed, onComplete]);

  if (!started) return null;

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-[2px] align-text-bottom" style={{ animation: "blink-caret 0.75s step-end infinite" }} />
      )}
    </span>
  );
};

export default TypewriterText;
