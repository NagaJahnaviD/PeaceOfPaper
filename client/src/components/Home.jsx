import RotatingText from './RotatingText';
import { Headphones, BookText, LifeBuoy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  NotebookPen,
  BrainCog,
  LineChart,
} from "lucide-react"

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-28 transition-colors duration-300">

      {/* 1. App Title */}
      <section className="text-center pt-12 pb-2 px-4">
      <h1
        className="text-6xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text inline-block"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--primary), var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        PeaceOfPaper
      </h1>

      </section>

      {/* 2. Hero Message */}
      <section className="text-center py-3 px-6 max-w-3xl mx-auto">
        <p className="text-xl sm:text-2xl font-semibold text-[var(--foreground)]">
          A calm space to pause, reflect, and reconnect with yourself.
        </p>
        <p className=" text-lg sm:text-xl text-[var(--muted)] font-light leading-relaxed">
          Mindfulness and growth begin with small, gentle steps.
        </p>


        {/* 3. Call-to-Action */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/meditate")}
            className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-medium text-lg hover:opacity-90 transition"
          >
           Start Meditating
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="border border-[var(--border)] text-[var(--foreground)] px-6 py-3 rounded-lg font-medium text-lg hover:bg-[var(--secondary)] transition"
          >
            View Your Progress
          </button>
        </div>
      </section>

      {/* 4. Rotating Identity Text */}
      <div className="flex px-[38%] mt-6 px-6 sm:flex-row justify-center" >
        <div className="flex gap-3 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-serif px-6 py-3 rounded-xl text-foreground transition-all duration-300">
          <span className="opacity-90 text-shadow-md">Be</span>
          <RotatingText
            texts={['Mindful', 'Resilient', 'Peaceful', 'Yourself']}
            mainClassName="h-full overflow-hidden px-4 py-1 rounded-2xl bg-gradient-to-r from-primary to-accent text-background shadow-lg"
            staggerFrom="last"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
      </div>

      {/* 5. Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-10 max-w-7xl mx-auto">
        {/* Meditation Card */}
        <div
          onClick={() => navigate("/meditate")}
          className="cursor-pointer group bg-[var(--surface)] p-8 rounded-3xl hover:shadow-secondary shadow-md hover:shadow-xl transition duration-300 group-hover:animate-wiggle"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-[var(--secondary)] text-[var(--primary)] rounded-full mb-4 transition group-hover:scale-110">
            <Headphones size={28} />
          </div>
          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Guided Meditation</h3>
          <p className="text-[var(--muted)] leading-relaxed">
            Explore calming sessions designed to reduce stress, increase mindfulness, and improve focus.
          </p>
        </div>

        {/* Insights Card */}
        <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer group bg-[var(--surface)] p-8 rounded-3xl shadow-md hover:shadow-secondary hover:shadow-xl transition duration-300 group-hover:animate-wiggle"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-[var(--secondary)] text-[var(--accent)] rounded-full mb-4 transition group-hover:scale-110">
            <BookText size={28} />
          </div>
          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Personal Insights</h3>
          <p className="text-[var(--muted)] leading-relaxed">
            Reflect on your emotions, monitor your mood trends, and gain a deeper understanding of your mental wellbeing.
          </p>
        </div>

        {/* FAQ Card */}
        <div
          onClick={() => navigate("/faq")}
          className="cursor-pointer group bg-[var(--surface)] p-8 rounded-3xl shadow-md hover:shadow-secondary hover:shadow-xl transition duration-300 group-hover:animate-wiggle"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-[var(--secondary)] text-[var(--muted)] rounded-full mb-4 transition group-hover:scale-110">
            <LifeBuoy size={28} />
          </div>
          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Support & FAQ</h3>
          <p className="text-[var(--muted)] leading-relaxed">
            Get answers to common questions and connect with resources designed to support your mental health.
          </p>
        </div>
      </section>


      <section className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">
          Your Journey with <span className="text-[var(--primary)]">PeaceOfPaper</span>
        </h2>

        <div className="flex flex-col gap-12 border-l-2 border-[var(--border)] pl-6">
          {/* Step 1: Awareness */}
          <div className="relative pl-6">
            <Activity className="absolute -left-[29px] top-1 text-[var(--primary)] bg-[var(--background)] p-1 rounded-full border border-[var(--border)]" size={24} />
            <h3 className="text-xl font-semibold text-[var(--primary)] mb-1">Begin with Awareness</h3>
            <p className="text-[var(--muted)] leading-relaxed">
              Track your emotions daily to develop self-awareness. Noticing your patterns empowers you to understand, reflect, and grow.
              <br />
              <span className="text-[var(--foreground)]">Awareness is the beginning of change.</span>
            </p>
          </div>

          {/* Step 2: Journaling */}
          <div className="relative pl-6">
            <NotebookPen className="absolute -left-[29px] top-1 text-[var(--accent)] bg-[var(--background)] p-1 rounded-full border border-[var(--border)]" size={24} />
            <h3 className="text-xl font-semibold text-[var(--accent)] mb-1">Reflect Through Journaling</h3>
            <p className="text-[var(--muted)] leading-relaxed">
              Journaling is a mindful way to slow down, organize your thoughts, and process emotions. It fosters emotional clarity and self-compassion.
              <br />
              <span className="text-[var(--foreground)]">Your thoughts deserve space to breathe.</span>
            </p>
          </div>

          {/* Step 3: Meditation */}
          <div className="relative pl-6">
            <BrainCog className="absolute -left-[29px] top-1 text-[var(--foreground)] bg-[var(--background)] p-1 rounded-full border border-[var(--border)]" size={24} />
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-1">Cultivate Inner Calm</h3>
            <p className="text-[var(--muted)] leading-relaxed">
              Meditation supports mental clarity, reduces stress, and builds emotional resilience. Let go of tension and reconnect with stillness.
              <br />
              <span className="text-[var(--foreground)]">Peace isn’t far — it’s already within.</span>
            </p>
          </div>

          {/* Step 4: See Progress */}
          <div className="relative pl-6">
            <LineChart className="absolute -left-[29px] top-1 text-[var(--primary)] bg-[var(--background)] p-1 rounded-full border border-[var(--border)]" size={24} />
            <h3 className="text-xl font-semibold text-[var(--primary)] mb-1">See Your Growth</h3>
            <p className="text-[var(--muted)] leading-relaxed">
              With time, PeaceOfPaper visualizes your mood trends, journaling streaks, and meditation habits — so you can appreciate your progress.
              <br />
              <span className="text-[var(--foreground)]">Growth is quiet, but powerful.</span>
            </p>
          </div>
        </div>
      </section>




    </div>
  );
}
