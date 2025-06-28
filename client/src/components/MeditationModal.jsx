import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function MeditationModal({ session, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;
    const update = () => setElapsed(audio.currentTime);
    if (audio) {
      audio.addEventListener("timeupdate", update);
      return () => audio.removeEventListener("timeupdate", update);
    }
  }, []);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const formatTime = t => {
    const m = Math.floor(t / 60).toString().padStart(2, "0");
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface text-foreground dark:bg-surface border border-border rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-accent">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-2">{session.title}</h2>
        <p className="text-muted mb-4 italic">"{session.tip}"</p>

        <audio ref={audioRef} src={session.audioUrl} />

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setIsPlaying(prev => !prev)}
            className="bg-primary text-white rounded-full p-4 shadow hover:bg-indigo-600"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <span className="text-sm text-muted">
            {formatTime(elapsed)} / {formatTime(session.duration * 60)}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max={session.duration * 60}
          value={elapsed}
          onChange={e => {
            audioRef.current.currentTime = e.target.value;
            setElapsed(+e.target.value);
          }}
          className="w-full mt-4 accent-primary"
        />
      </div>
    </div>
  );
}
