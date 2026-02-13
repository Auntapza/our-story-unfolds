import { endingContent } from "@/data/storyContent";
import { Heart } from "lucide-react";

interface EndingPageProps {
  isActive: boolean;
}

const EndingPage = ({ isActive }: EndingPageProps) => {
  if (!isActive) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center animate-fade-in">
      {/* Heart */}
      <div className="mb-8 animate-heartbeat">
        <Heart className="w-12 h-12 text-primary fill-primary" />
      </div>

      {/* Title */}
      <h1
        className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 animate-fade-in-up"
        style={{ animationDelay: "0.3s", opacity: 0 }}
      >
        {endingContent.title}
      </h1>

      {/* Message */}
      <p
        className="text-xl md:text-2xl font-body text-muted-foreground mb-8 max-w-md animate-fade-in-up"
        style={{ animationDelay: "0.8s", opacity: 0 }}
      >
        {endingContent.message}
      </p>

      {/* Divider */}
      <div
        className="w-24 mx-auto story-divider mb-8 animate-fade-in-up"
        style={{ animationDelay: "1.2s", opacity: 0 }}
      />

      {/* Signature */}
      <p
        className="text-2xl font-handwriting text-primary mb-4 animate-fade-in-up"
        style={{ animationDelay: "1.5s", opacity: 0 }}
      >
        {endingContent.signature}
      </p>

      {/* Final quote */}
      <p
        className="text-sm tracking-[0.2em] uppercase text-gold font-body mt-8 animate-fade-in-up"
        style={{ animationDelay: "2s", opacity: 0 }}
      >
        {endingContent.finalQuote}
      </p>

      {/* Corner ornaments */}
      <div className="absolute top-6 left-6 text-gold opacity-20 text-2xl font-display animate-fade-in">✦</div>
      <div className="absolute top-6 right-6 text-gold opacity-20 text-2xl font-display animate-fade-in">✦</div>
      <div className="absolute bottom-6 left-6 text-gold opacity-20 text-2xl font-display animate-fade-in">✦</div>
      <div className="absolute bottom-6 right-6 text-gold opacity-20 text-2xl font-display animate-fade-in">✦</div>
    </div>
  );
};

export default EndingPage;
