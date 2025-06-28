import React from 'react';
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import Dashboard from './Dashboard';
import { NotebookPen, BarChart4, Sparkles, Lock } from "lucide-react";
import { useNavigate } from 'react-router-dom';
function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-4 py-20 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      
      {/* When NOT signed in */}


<SignedOut>
  <section className="w-full min-h-screen bg-[var(--background)] py-16 px-6 md:px-20">
    <div className="max-w-3xl mx-auto space-y-16">

      {/* Heading and Description */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-5xl font-extrabold text-[var(--foreground)] leading-tight">
          Reflect.<span className="text-primary">Understand</span>. Heal.
        </h1>
        <p className="text-lg text-[var(--muted)]">
          Sign in to begin journaling, explore your emotional patterns, and access guided tools that support your mental wellness journey, with a pinch of <span className='text-bold'>AI</span> — all in one private space.
        </p>
      </div>
  <div className="flex items-center justify-center ">
      <div className="flex gap-6">
        {/* Sign In Button */}
        <button
          onClick={() => navigate('/signin')}
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--primary)] text-white font-semibold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          <span className="z-10">Sign In</span>
          <svg
            className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full transition duration-300" />
        </button>

        {/* Sign Up Button */}
        <button
          onClick={() => navigate('/signup')}
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--accent)] text-white font-semibold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          <span className="z-10">Sign Up</span>
          <svg
            className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full transition duration-300" />
        </button>
      </div>
    </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* Card 1 - Private Journaling */}
<div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-lg flex items-start gap-4">
  <NotebookPen className="w-8 h-8 text-[var(--primary)] mt-1 shrink-0" />
  <div>
    <h3 className="text-xl font-bold text-[var(--primary)] mb-2">Private Journaling</h3>
    <p className="text-[var(--muted)] text-base leading-relaxed">
      <span className="font-semibold text-[var(--foreground)]">Unload your thoughts.</span>  
      <br />Capture your feelings. Reflect without filters.
      <br />
      With <span className="font-medium text-[var(--accent)]">open-ended</span> entries or <span className="font-medium text-[var(--accent)]">guided prompts</span>, journal freely in a space that’s <span className="italic">completely yours</span>.
      <br />
      <span className="font-semibold text-[var(--primary)]">Encrypted instantly</span> — not even we can access your words.  
      <br />Because your mind deserves complete privacy.
    </p>
  </div>
</div>

{/* Card 2 - Mood Insights */}
<div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-lg flex items-start gap-4">
  <BarChart4 className="w-8 h-8 text-[var(--primary)] mt-1 shrink-0" />
  <div>
    <h3 className="text-xl font-bold text-[var(--primary)] mb-2">Mood Insights</h3>
    <p className="text-[var(--muted)] text-base leading-relaxed">
      Wondering how you <span className="font-semibold text-[var(--foreground)]">really feel</span> over time?
      <br />
      Our interactive <span className="text-[var(--accent)] font-medium">heatmaps</span> and <span className="text-[var(--accent)] font-medium">sentiment graphs</span> decode your mood trends — from joy spikes to stress dips.
      <br />
      <span className="italic">See the patterns. Spot the triggers. Grow with awareness.</span>
    </p>
  </div>
</div>

{/* Card 3 - Personalized Meditations */}
<div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-lg flex items-start gap-4">
  <Sparkles className="w-8 h-8 text-[var(--accent)] mt-1 shrink-0" />
  <div>
    <h3 className="text-xl font-bold text-[var(--primary)] mb-2">Personalized Meditations</h3>
    <p className="text-[var(--muted)] text-base leading-relaxed">
      Your entries speak — we listen.
      <br />
      Based on your mood and reflections, we offer <span className="font-medium text-[var(--accent)]">calming meditations</span> tailored just for you.
      <br />
      Feeling anxious? We'll guide you to stillness.  
      Feeling low? We’ll lift you up.  
      <br />
      <span className="italic text-[var(--foreground)]">One breath at a time.</span>
    </p>
  </div>
</div>

{/* Card 4 - End-to-End Encryption */}
<div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-lg flex items-start gap-4">
  <Lock className="w-8 h-8 text-[var(--muted)] mt-1 shrink-0" />
  <div>
    <h3 className="text-xl font-bold text-[var(--primary)] mb-2">End-to-End Encryption</h3>
    <p className="text-[var(--muted)] text-base leading-relaxed">
      Your journal is a sacred space.  
      <br />
      That’s why we use <span className="font-semibold text-[var(--accent)]">encryption</span> to lock your entries the moment you save.
      <br />
      <span className="font-medium text-[var(--foreground)]">No servers can read it. Not even us.</span>  
      <br />
      It's not just privacy by policy — it's <span className="italic">privacy by design</span>.
    </p>
  </div>
</div>


      </div>

      
      
    </div>
  </section>
</SignedOut>

      {/* When signed in */}
      <SignedIn>
        <Dashboard user={user} />
      </SignedIn>
    </div>
  );
}

export default Profile;
