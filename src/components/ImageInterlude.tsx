import { useState, useEffect } from "react";

interface ImageInterludeProps {
  imageUrl: string;
  imageAlt?: string;
  caption?: string;
  isActive: boolean;
  onComplete: () => void;
  duration?: number; // seconds to show
}

const ImageInterlude = ({
  imageUrl,
  imageAlt = "",
  caption,
  isActive,
  onComplete,
  duration = 5,
}: ImageInterludeProps) => {
  const [phase, setPhase] = useState<"hidden" | "entering" | "visible" | "exiting">("hidden");

  useEffect(() => {
    if (!isActive) {
      setPhase("hidden");
      return;
    }

    setPhase("entering");

    const visibleTimer = setTimeout(() => setPhase("visible"), 800);
    const exitTimer = setTimeout(() => setPhase("exiting"), (duration - 1) * 1000);
    const completeTimer = setTimeout(onComplete, duration * 1000);

    return () => {
      clearTimeout(visibleTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [isActive, duration, onComplete]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-30 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm transition-opacity duration-700 ${
        phase === "entering" ? "opacity-0" : phase === "exiting" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`max-w-lg w-full px-6 transition-all duration-1000 ${
          phase === "visible" ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
        }`}
      >
        {/* Decorative top */}
        <div className="text-center mb-6">
          <span className="text-gold text-sm tracking-[0.4em]">✦ ✦ ✦</span>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden rounded-sm shadow-2xl mb-6">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full object-cover aspect-[4/3]"
          />
          {/* Vintage overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>

        {/* Caption */}
        {caption && (
          <p className="text-center text-lg font-handwriting text-muted-foreground italic">
            {caption}
          </p>
        )}

        {/* Decorative bottom */}
        <div className="text-center mt-6">
          <div className="w-16 mx-auto story-divider" />
        </div>
      </div>
    </div>
  );
};

export default ImageInterlude;
