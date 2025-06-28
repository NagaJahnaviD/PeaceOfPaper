import { Sprout, HeartPulse, Moon, CloudSun, Smile, Eye } from "lucide-react";

const icons = {
  Mindfulness: Sprout,
  Stress: HeartPulse,
  Sleep: Moon,
  Anxiety: CloudSun,
  Gratitude: Smile,
  Awareness: Eye,
};

export default function MeditationCard({ session, onClick }) {
  const Icon = icons[session.tag] || Sprout;

  return (
    <div
      onClick={onClick}
      className="group bg-surface/60 backdrop-blur-lg border border-border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.01] min-h-[230px] flex flex-col items-center text-center"
    >
      {/* Icon in soft circle */}
      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-3">
        <Icon className="w-8 h-8 text-accent" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition mb-1">
        {session.title}
      </h3>

      {/* Tag */}
      <span className="text-xs font-semibold mb-2 px-2 py-0.5 rounded-full bg-muted/10 text-muted">
        {session.tag}
      </span>

      {/* Tip */}
      <p className="text-sm italic text-muted flex-1">
        “{session.tip}”
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center w-full pt-4 text-xs text-muted">
        <span>🕒 {session.duration} min</span>
        <span className="px-2 py-0.5 bg-muted/10 rounded-full">{session.level}</span>
      </div>
    </div>
  );
}
