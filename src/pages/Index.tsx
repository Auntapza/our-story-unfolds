import { useState, useCallback } from "react";
import CoverPage from "@/components/CoverPage";
import StoryChapter from "@/components/StoryChapter";
import EndingPage from "@/components/EndingPage";
import { chapters } from "@/data/storyContent";

type StoryPhase = "cover" | "story" | "ending";

const Index = () => {
  const [phase, setPhase] = useState<StoryPhase>("cover");
  const [currentChapter, setCurrentChapter] = useState(0);

  const handleStart = useCallback(() => {
    setPhase("story");
    setCurrentChapter(0);
  }, []);

  const handleChapterComplete = useCallback(() => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter((prev) => prev + 1);
    } else {
      setPhase("ending");
    }
  }, [currentChapter]);

  // Progress indicator
  const progress = phase === "story" ? ((currentChapter + 1) / chapters.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background parchment-texture relative overflow-hidden">
      {/* Progress bar (during story) */}
      {phase === "story" && (
        <div className="fixed top-0 left-0 right-0 z-40 h-[2px] bg-secondary">
          <div
            className="h-full bg-gold transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Cover */}
      {phase === "cover" && <CoverPage onStart={handleStart} />}

      {/* Story chapters */}
      {phase === "story" && (
        <div className="flex items-center justify-center min-h-screen">
          {chapters.map((chapter, index) => (
            <StoryChapter
              key={chapter.id}
              chapter={chapter}
              isActive={index === currentChapter}
              onComplete={handleChapterComplete}
            />
          ))}
        </div>
      )}

      {/* Ending */}
      <EndingPage isActive={phase === "ending"} />
    </div>
  );
};

export default Index;
