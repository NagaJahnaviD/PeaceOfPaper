import { useState } from "react";
import MeditationCard from "./MeditationCard";
import MeditationModal from "./MeditationModal";

const tips = [
  "Breathe in peace, breathe out stress.",
  "Focus on sensations, not thoughts.",
  "Be gentle with yourself.",
  "You don't have to clear your mind—just observe it.",
  "Let each inhale fill you with calm.",
  "Awareness is the first step to clarity.",
  "Anchor yourself to this very moment."
];

const sessions = [
  {
    title: "Morning Mindfulness",
    tag: "Mindfulness",
    duration: 10,
    level: "Beginner",
    tip: tips[0],
    audioUrl: "/audios/morning-in-the-forest-347089.mp3"
  },
  {
    title: "Stress Relief",
    tag: "Stress",
    duration: 10.23,
    level: "Intermediate",
    tip: tips[1],
    audioUrl: "/audios/10-minute-rain-and-thunder-323964.mp3"
  },
  {
    title: "Deep Sleep",
    tag: "Sleep",
    duration: 22.38,
    level: "Beginner",
    tip: tips[2],
    audioUrl: "/audios/relaxing-music-vol1-124477.mp3"
  },
  {
    title: "Anxiety Support",
    tag: "Anxiety",
    duration: 10.33,
    level: "Intermediate",
    tip: tips[3],
    audioUrl: "/audios/path-to-harmony-313385.mp3"
  },
  {
    title: "Gratitude Practice",
    tag: "Gratitude",
    duration: 12.06,
    level: "Beginner",
    tip: tips[4],
    audioUrl: "/audios/rain-and-thunder-for-better-sleep-148899.mp3"
  },
  {
    title: "Body Scan",
    tag: "Awareness",
    duration: 9.41,
    level: "Intermediate",
    tip: tips[5],
    audioUrl: "/audios/rainy-day-in-town-with-birds-singing-194011.mp3"
  }
];

export default function Meditate() {
  const [activeSession, setActiveSession] = useState(null);
  const [tipIndex, setTipIndex] = useState(Math.floor(Math.random() * tips.length));

  const showAnotherTip = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * tips.length);
    } while (nextIndex === tipIndex);
    setTipIndex(nextIndex);
  };

  return (
    <div className="bg-background text-foreground min-h-screen px-4 py-14">
      <div className="max-w-5xl mx-auto text-center py-6">
        {/* Header */}
        <div className="pt-24 pb-12 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-foreground tracking-tight mb-4">
            Guided <span className="text-primary">Meditation</span>
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Take a moment to pause, breathe deeply, and reconnect with your inner calm through our handpicked sessions.
          </p>
        </div>

        {/* Meditation Sessions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {sessions.map((session, idx) => (
            <MeditationCard key={idx} session={session} onClick={() => setActiveSession(session)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeSession && (
        <MeditationModal session={activeSession} onClose={() => setActiveSession(null)} />
      )}

    <div className="mt-24 relative text-center px-4">
      {/* Sparkle aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--accent)] blur-3xl opacity-10 animate-pulse-slow" />
      </div>

    {/* Magical Fortune Cookie */}
    <div className="relative inline-block px-6 py-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl transition duration-300 max-w-xl mx-auto animate-float-up ring-1 ring-[var(--primary)] ring-opacity-30">
      <p className="text-[var(--foreground)] text-lg sm:text-xl font-medium italic tracking-wide glow-text">
        “{tips[tipIndex]}”
      </p>
      <div className="mt-2 text-sm text-[var(--muted)] opacity-70">
        ✦ A mindful whisper from your fortune strip
      </div>
      <button
        onClick={showAnotherTip}
        className="mt-3 text-sm text-primary hover:underline transition"
      >
        Show me another
      </button>
    </div>
  </div>

    </div>
  );
}
