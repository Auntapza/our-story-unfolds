import { useState } from "react";
import { coverContent } from "@/data/storyContent";
import { BookOpen } from "lucide-react";

interface CoverPageProps {
  onStart: () => void;
}

const CoverPage = ({ onStart }: CoverPageProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(onStart, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background parchment-texture transition-all duration-700 ${
        isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 story-divider animate-draw-line" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 story-divider animate-draw-line" />

      {/* Corner ornaments */}
      <div className="absolute top-6 left-6 text-gold opacity-40 text-2xl font-display">✦</div>
      <div className="absolute top-6 right-6 text-gold opacity-40 text-2xl font-display">✦</div>
      <div className="absolute bottom-6 left-6 text-gold opacity-40 text-2xl font-display">✦</div>
      <div className="absolute bottom-6 right-6 text-gold opacity-40 text-2xl font-display">✦</div>

      <div className="text-center px-6 max-w-lg">
        {/* Small ornament */}
        <div className="animate-fade-in-up mb-8" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <span className="text-gold text-sm tracking-[0.5em] uppercase font-body">
            ❦ ❦ ❦
          </span>
        </div>

        {/* Main title */}
        <h1
          className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          {coverContent.mainTitle}
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl font-body text-muted-foreground mb-2 animate-fade-in-up"
          style={{ animationDelay: "0.9s", opacity: 0 }}
        >
          {coverContent.subtitle}
        </p>

        {/* Author line */}
        <p
          className="text-base font-handwriting text-gold italic mb-12 animate-fade-in-up"
          style={{ animationDelay: "1.2s", opacity: 0 }}
        >
          {coverContent.authorLine}
        </p>

        {/* Divider */}
        <div
          className="w-24 mx-auto story-divider mb-12 animate-fade-in-up"
          style={{ animationDelay: "1.5s", opacity: 0 }}
        />

        {/* Start button */}
        <button
          onClick={handleStart}
          className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-primary/30 rounded-none text-foreground font-display text-lg 
            hover:bg-primary hover:text-primary-foreground hover:border-primary
            transition-all duration-500 animate-fade-in-up"
          style={{ animationDelay: "1.8s", opacity: 0 }}
        >
          <BookOpen className="w-5 h-5 transition-transform group-hover:scale-110" />
          {coverContent.buttonText}
        </button>
      </div>
    </div>
  );
};

export default CoverPage;
