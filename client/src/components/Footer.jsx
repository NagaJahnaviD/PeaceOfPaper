import { Quote } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full  border-t border-border">
      <div className="w-full bg-gradient-to-br from-background via-nav to-surface backdrop-blur-lg shadow-inner border border-white/10">
        <div className="max-w-7xl mx-auto px-4  py-10 flex flex-col items-center justify-center gap-4 text-center">
          
          {/* Quote icon with float animation */}
          <Quote className="w-8 h-8 text-foreground animate-float-up opacity-80" />

          {/* Quote text */}
          <p className="text-lg md:text-xl font-serif italic text-foreground max-w-2xl leading-relaxed drop-shadow-md">
            “In the stillness of the mind, clarity is born. Breathe deep, feel the now, and let peace guide you through every storm. The present is where serenity lives.”
          </p>

          {/* Signature */}
          <span className="text-foreground/70 text-sm md:text-base font-medium drop-shadow-sm">
            — PeaceOfPaper
          </span>

          {/* Copyright */}
          <div className="text-foreground text-xs mt-4">
            © {new Date().getFullYear()} PeaceOfPaper. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
