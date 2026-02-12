import { useState, useEffect, useRef, useCallback } from "react";
import type { InterludeImage } from "@/data/storyContent";

interface ImageInterludeProps {
  images: InterludeImage[];
  isActive: boolean;
  onComplete: () => void;
  duration?: number; // seconds per image
}

const ImageInterlude = ({
  images,
  isActive,
  onComplete,
  duration = 5,
}: ImageInterludeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("opacity-0");
  const [swipeDir, setSwipeDir] = useState<"none" | "left" | "right">("none");
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const totalImages = images.length;

  const goToNext = useCallback(() => {
    if (currentIndex < totalImages - 1) {
      setSwipeDir("left");
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSwipeDir("none");
      }, 300);
    } else {
      // Last image done — exit
      setFadeClass("opacity-0");
      setTimeout(() => onCompleteRef.current(), 500);
    }
  }, [currentIndex, totalImages]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setSwipeDir("right");
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setSwipeDir("none");
      }, 300);
    }
  }, [currentIndex]);

  // Fade in on mount
  useEffect(() => {
    if (isActive) {
      requestAnimationFrame(() => setFadeClass("opacity-100"));
    }
  }, [isActive]);

  // Auto-advance timer — reset when currentIndex changes
  useEffect(() => {
    if (!isActive) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(goToNext, duration * 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, currentIndex, duration, goToNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const threshold = 60;
    if (touchDeltaX.current < -threshold) {
      goToNext();
    } else if (touchDeltaX.current > threshold) {
      goToPrev();
    }
  };

  // Mouse drag handlers for desktop
  const mouseStartX = useRef(0);
  const mouseDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    mouseDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!mouseDragging.current) return;
    mouseDragging.current = false;
    const delta = e.clientX - mouseStartX.current;
    const threshold = 60;
    if (delta < -threshold) goToNext();
    else if (delta > threshold) goToPrev();
  };

  if (!isActive) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className={`fixed inset-0 z-30 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm transition-opacity duration-500 ${fadeClass}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="max-w-lg w-full px-6 select-none">
        {/* Decorative top */}
        <div className="text-center mb-6">
          <span className="text-gold text-sm tracking-[0.4em]">✦ ✦ ✦</span>
        </div>

        {/* Image stack area */}
        <div className="relative overflow-hidden rounded-sm shadow-2xl mb-6 aspect-[4/3]">
          <div
            className={`absolute inset-0 transition-all duration-300 ease-out ${
              swipeDir === "left"
                ? "-translate-x-full opacity-0"
                : swipeDir === "right"
                ? "translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <img
              src={currentImage.imageUrl}
              alt={currentImage.imageAlt || ""}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Vintage overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <p
            key={currentIndex}
            className="text-center text-lg font-handwriting text-muted-foreground italic animate-fade-in"
          >
            {currentImage.caption}
          </p>
        )}

        {/* Dots indicator */}
        {totalImages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-6 bg-gold"
                    : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        )}

        {/* Progress bar per image */}
        <div className="mt-3 h-[1px] bg-secondary/50 rounded-full overflow-hidden">
          <div
            key={currentIndex}
            className="h-full bg-gold/60 rounded-full"
            style={{
              animation: `progress-fill ${duration}s linear forwards`,
            }}
          />
        </div>

        {/* Swipe hint */}
        {totalImages > 1 && currentIndex === 0 && (
          <p className="text-center text-xs text-muted-foreground/50 mt-3 animate-fade-in">
            ← ปัดเพื่อดูรูปถัดไป →
          </p>
        )}

        {/* Decorative bottom */}
        <div className="text-center mt-4">
          <div className="w-16 mx-auto story-divider" />
        </div>
      </div>
    </div>
  );
};

export default ImageInterlude;
