import { useState, useEffect } from "react";
import type { Chapter } from "@/data/storyContent";
import TypewriterText from "./TypewriterText";

interface StoryChapterProps {
  chapter: Chapter;
  isActive: boolean;
  onComplete: () => void;
}

const StoryChapter = ({ chapter, isActive, onComplete }: StoryChapterProps) => {
  const [phase, setPhase] = useState<"hidden" | "title" | "content" | "quote" | "complete">("hidden");

  useEffect(() => {
    if (!isActive) {
      setPhase("hidden");
      return;
    }
    setPhase("title");
  }, [isActive]);

  const handleTitleComplete = () => {
    setTimeout(() => setPhase("content"), 400);
  };

  const handleContentComplete = () => {
    if (chapter.quote) {
      setTimeout(() => setPhase("quote"), 600);
    } else {
      setPhase("complete");
      setTimeout(onComplete, 2000);
    }
  };

  const handleQuoteComplete = () => {
    setPhase("complete");
    setTimeout(onComplete, 3000);
  };

  if (!isActive && phase === "hidden") return null;

  return (
    <div className={`animate-page-turn max-w-2xl mx-auto px-6 py-12 text-center`}>
      {/* Chapter number & title */}
      <div className="mb-8">
        {phase !== "hidden" && (
          <div className="animate-fade-in mb-3">
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-body">
              {chapter.title}
            </span>
          </div>
        )}

        {(phase === "title" || phase === "content" || phase === "quote" || phase === "complete") && chapter.subtitle && (
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
            <TypewriterText
              text={chapter.subtitle}
              speed={80}
              onComplete={handleTitleComplete}
            />
          </h2>
        )}
      </div>

      {/* Divider */}
      {(phase === "content" || phase === "quote" || phase === "complete") && (
        <div className="w-16 mx-auto story-divider mb-8 animate-draw-line" />
      )}

      {/* Image (if provided) */}
      {chapter.imageUrl && (phase === "content" || phase === "quote" || phase === "complete") && (
        <div className="mb-8 animate-fade-in">
          <img
            src={chapter.imageUrl}
            alt={chapter.imageAlt || ""}
            className="w-full max-w-md mx-auto rounded-sm shadow-lg opacity-90"
          />
        </div>
      )}

      {/* Content */}
      {(phase === "content" || phase === "quote" || phase === "complete") && (
        <div className="mb-8">
          <p className="text-lg md:text-xl font-body text-foreground leading-relaxed">
            <TypewriterText
              text={chapter.content}
              speed={35}
              onComplete={handleContentComplete}
            />
          </p>
        </div>
      )}

      {/* Quote */}
      {(phase === "quote" || phase === "complete") && chapter.quote && (
        <div className="mt-8 animate-fade-in">
          <p className="text-base md:text-lg font-handwriting text-wine-light italic">
            <TypewriterText
              text={chapter.quote}
              speed={40}
              onComplete={handleQuoteComplete}
            />
          </p>
        </div>
      )}
    </div>
  );
};

export default StoryChapter;
