import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
  {
    question: "What features does this mental health app offer?",
    answer: "Our app offers a holistic approach to mental wellness. It includes a library of guided meditation audios to help you relax and focus, a secure journaling space that lets you express your thoughts freely, emotion tracking through easy-to-use sliders, and a smart dashboard that visualizes your emotional journey. The app also uses NLP to analyze your journal entries and generate personalized positivity scores to help you better understand your mindset over time."
  },
  {
    question: "How does journaling help with my mental wellness?",
    answer: "Journaling serves as a safe outlet for your thoughts and emotions. It allows you to unload mental clutter, identify patterns, and gain clarity. Our app enhances this experience by using Natural Language Processing (NLP) to assess the tone and sentiment of your entries. This generates a positivity score that reflects your emotional well-being, helping you track growth, recognize stressors, and celebrate progress in a deeply personal way."
  },
  {
    question: "What are the emotion sliders for?",
    answer: "The emotion sliders make it simple to log how you’re feeling each day—whether you’re happy, anxious, calm, sad, or something in between. Over time, this consistent tracking helps you spot emotional trends, recognize what affects your mood, and understand your mental state more clearly. It also feeds into your dashboard, offering you powerful insights into your emotional landscape."
  },
  {
    question: "Is my personal journal and emotion data secure?",
    answer: "Absolutely. Your privacy is our top priority. All your data—journals, emotion logs, and scores—is encrypted and stored securely. We never share your information with third parties, and even our team cannot view your personal content. What you write and track is for your eyes only."
  },
  {
    question: "How do the dashboard visualizations work?",
    answer: "The dashboard transforms your daily mood logs and positivity scores into easy-to-understand visual graphs and charts. This makes it effortless to track your emotional highs and lows over time, see improvements, and understand what factors might be influencing your mental state. Whether you’re checking in weekly or reflecting on the past month, the dashboard helps you make sense of your emotional journey in a visual and empowering way."
  },
  {
    question: "How often should I journal or meditate with the app?",
    answer: "Consistency brings clarity. Even spending just 5 minutes a day on meditation or journaling can make a significant difference over time. Daily use helps you build emotional resilience, improve focus, and better understand your thoughts and behaviors."
  },
  {
    question: "Can I use the app if I'm new to mindfulness or journaling?",
    answer: "Yes! The app is beginner-friendly and guides you every step of the way. Our simple, intuitive design, calming guided meditations, and gentle journaling prompts make it easy to begin and stick with your wellness practice—even if you’ve never tried anything like this before."
  },
  {
    question: "I am mentally alright. Why should I use this app?",
    answer: "Mental health isn't just about managing crises—it's about building and maintaining emotional strength, even during good times. Using the app regularly when you're feeling fine helps you stay grounded, detect subtle mood shifts early, and create a strong emotional foundation for when life gets tough. Think of it as a daily check-in with yourself to maintain emotional fitness."
  },
  {
    question: "How does mood tracking help me?",
    answer: "Mood tracking gives you a clearer picture of your emotional well-being by helping you identify patterns, triggers, and trends. By logging how you feel each day, you start noticing connections between your mood and things like sleep, stress, work, or social interactions. This awareness empowers you to take action, make positive changes, and better manage your mental health in the long run."
  }
];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4  mt-18 pt-28 py-10 space-y-8 ">
      {/* FAQ Title */}
      <h2 className="text-5xl p-5 mt-8 font-bold text-foreground text-center">Frequently Asked Questions</h2>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqData.map((faq, idx) => (
          <div
            key={idx}
            className="border border-border rounded-lg bg-surface shadow-sm overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left text-foreground font-medium"
              onClick={() => toggleFAQ(idx)}
            >
              <span>{faq.question}</span>
              {openIndex === idx ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === idx && (
              <div className="px-4 pb-4 text-muted border-t border-border pt-4">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* 🚨 Crisis Support Box */}
      <div className="bg-red-800 border border-red-400 text-red-300 p-4 rounded-md shadow">
        <h3 className="text-lg font-semibold mb-1">Crisis Support Numbers</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>India:</strong> iCall (+91 9152987821), Vandrevala Foundation (1860 266 2345 / 1800 233 3330)</li>
          <li><strong>Global:</strong> Befrienders Worldwide – [www.befrienders.org](https://www.befrienders.org)</li>
          <li><strong>Emergency:</strong> Please contact your local emergency services immediately if you are in danger.</li>
        </ul>
      </div>

      {/* 💡 Remember Box */}
      <div className="bg-secondary text-foreground border border-border rounded-md p-4 shadow-sm">
        <h4 className="text-lg font-semibold mb-2">Remember</h4>
        <p className="text-sm leading-relaxed">
          PeaceOfPaper is a supportive tool, not a substitute for professional mental health care.
          Always seek guidance from a licensed mental health provider for any serious concerns.
        </p>
      </div>

      {/* ⚠️ Disclaimer */}
      <div className="bg-surface border-l-4 border-yellow-400 p-4 shadow-sm text-sm text-foreground">
        <strong>Disclaimer:</strong> The content provided by MindMate is for informational purposes only and is not intended as medical advice, diagnosis, or treatment.
      </div>

      <div className="bg-surface border border-border rounded-lg p-6 shadow-md">
        <h4 className="text-lg font-semibold text-foreground mb-4">Any other Questions? We would like to answer!</h4>
        <form id="contact-form">
          <div className="space-y-4">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="4"
              className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-secondary"
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-secondary text-foreground hover:bg-accent transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
