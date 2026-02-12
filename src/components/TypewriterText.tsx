import { useState, useEffect, useRef } from "react";

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
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Keep the ref updated
  onCompleteRef.current = onComplete;

  // Reset when text changes
  useEffect(() => {
    setDisplayed("");
    setStarted(false);
    completedRef.current = false;
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!started || completedRef.current) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      completedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [displayed, started, text, speed]);

  if (!started) return null;

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span
          className="inline-block w-[2px] h-[1em] bg-primary ml-[2px] align-text-bottom"
          style={{ animation: "blink-caret 0.75s step-end infinite" }}
        />
      )}
    </span>
  );
};

export default TypewriterText;

