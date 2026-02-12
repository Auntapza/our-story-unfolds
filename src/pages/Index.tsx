import { useState, useCallback } from "react";
import CoverPage from "@/components/CoverPage";
import StoryChapter from "@/components/StoryChapter";
import ImageInterlude from "@/components/ImageInterlude";
import EndingPage from "@/components/EndingPage";
import { chapters, interludes } from "@/data/storyContent";

type StoryPhase = "cover" | "chapter" | "interlude" | "ending";

const Index = () => {
  const [phase, setPhase] = useState<StoryPhase>("cover");
  const [currentChapter, setCurrentChapter] = useState(0);

  const handleStart = useCallback(() => {
    setPhase("chapter");
    setCurrentChapter(0);
  }, []);

  const handleChapterComplete = useCallback(() => {
    const interlude = interludes[currentChapter];
    if (interlude) {
      setPhase("interlude");
    } else if (currentChapter < chapters.length - 1) {
      setCurrentChapter((prev) => prev + 1);
      setPhase("chapter");
    } else {
      setPhase("ending");
    }
  }, [currentChapter]);

  const handleInterludeComplete = useCallback(() => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter((prev) => prev + 1);
      setPhase("chapter");
    } else {
      setPhase("ending");
    }
  }, [currentChapter]);

  // Total steps = chapters + interludes (non-null)
  const totalSteps = chapters.length + interludes.filter(Boolean).length;
  const completedInterludes = interludes.slice(0, currentChapter).filter(Boolean).length;
  const currentStep =
    phase === "chapter"
      ? currentChapter + completedInterludes + 1
      : phase === "interlude"
      ? currentChapter + completedInterludes + 2
      : 0;
  const progress = phase === "chapter" || phase === "interlude" ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen bg-background parchment-texture relative overflow-hidden">
      {/* Progress bar */}
      {(phase === "chapter" || phase === "interlude") && (
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
      {phase === "chapter" && (
        <div className="flex items-center justify-center min-h-screen">
          <StoryChapter
            key={`chapter-${currentChapter}`}
            chapter={chapters[currentChapter]}
            isActive={true}
            onComplete={handleChapterComplete}
          />
        </div>
      )}

      {/* Image interlude */}
      {phase === "interlude" && interludes[currentChapter] && (
        <ImageInterlude
          key={`interlude-${currentChapter}`}
          imageUrl={interludes[currentChapter]!.imageUrl}
          imageAlt={interludes[currentChapter]!.imageAlt}
          caption={interludes[currentChapter]!.caption}
          duration={interludes[currentChapter]!.duration}
          isActive={true}
          onComplete={handleInterludeComplete}
        />
      )}

      {/* Ending */}
      <EndingPage isActive={phase === "ending"} />
    </div>
  );
};

export default Index;
