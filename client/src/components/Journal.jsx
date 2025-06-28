import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Smile, Frown, Meh, AlertCircle, HeartPulse } from "lucide-react";
import { encryptText, decryptText, deriveKey } from "./encryption";
import PassphraseModal from "./PassphraseModal";
import vader from "vader-sentiment"; // ✅ New library

function Journal() {
  const location = useLocation();
  const date = location.state?.selectedDate;

  if (!date) {
    return (
      <p className="text-red-500 p-4">
        No date selected. Please go back to calendar.
      </p>
    );
  }

  const formattedDate =
    typeof date === "string"
      ? date
      : new Date(date).toISOString().split("T")[0];

  const [journal, setJournal] = useState(null);
  const [text, setText] = useState("");
  const [mood, setMood] = useState({
    happiness: 5,
    sadness: 5,
    anxiety: 5,
    stress: 5,
  });

  const [isToday, setIsToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passphrase, setPassphrase] = useState(() =>
    sessionStorage.getItem("passphrase")
  );
  const [key, setKey] = useState(null);

  useEffect(() => {
    if (passphrase) {
      const derived = deriveKey(passphrase);
      setKey(derived);
    }
  }, [passphrase]);

  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    setIsToday(todayStr === formattedDate);
  }, [formattedDate]);

  useEffect(() => {
    if (!key) return;

    const fetchJournal = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/journal/by-date",
          { date: formattedDate },
          { withCredentials: true }
        );

        const entries = response.data?.payload;
        if (Array.isArray(entries) && entries.length > 0) {
          const entry = entries[0];
          let decryptedText = "";

          if (entry.encryptedText) {
            try {
              decryptedText = decryptText(entry.encryptedText, key);
            } catch (err) {
              decryptedText = "[Could not decrypt entry — wrong passphrase?]";
            }
          }

          setJournal(entry);
          setText(decryptedText);
          setMood({
            happiness: entry.emotions?.happiness ?? 5,
            sadness: entry.emotions?.sadness ?? 5,
            anxiety: entry.emotions?.anxiety ?? 5,
            stress: entry.emotions?.stress ?? 5,
          });
        } else {
          setJournal(null);
          setText("");
        }
      } catch (error) {
        console.error("Error fetching journal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournal();
  }, [formattedDate, key]);

  // ✅ Updated sentiment calculation using VADER
  const computeSentimentScore = (text) => {
    const { compound } = vader.SentimentIntensityAnalyzer.polarity_scores(text);
    const normalized = compound * 10;
    return Number(normalized.toFixed(1)); // range: -10 to +10
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!key) {
      alert("Encryption key not ready. Please enter your passphrase again.");
      return;
    }

    try {
      const encrypted = encryptText(text, key);
      const sentimentScore = computeSentimentScore(text);
      console.log(sentimentScore);
      await axios.post(
        "http://localhost:3000/journal",
        {
          encryptedText: encrypted,
          sentiment: sentimentScore,
          emotions: mood,
        },
        { withCredentials: true }
      );

      alert("Journal saved successfully! 🌸");
    } catch (error) {
      console.error("Error saving journal:", error);
      alert("Failed to save journal. Please try again.");
    }
  };

  const emotionIcons = {
    happiness: <Smile className="inline w-5 h-5 text-yellow-400" />,
    sadness: <Frown className="inline w-5 h-5 text-blue-400" />,
    anxiety: <AlertCircle className="inline w-5 h-5 text-red-400" />,
    stress: <Meh className="inline w-5 h-5 text-gray-500" />,
  };

  const getMoodEmoji = (key, value) => {
    const emojis = {
      happiness: ["😐", "🙂", "😁"],
      sadness: ["😢", "😔", "😭"],
      anxiety: ["😰", "😟", "😱"],
      stress: ["😐", "😣", "😖"],
    };
    if (value >= 7) return emojis[key][2];
    if (value >= 4) return emojis[key][1];
    return emojis[key][0];
  };

  if (!passphrase) {
    return (
      <PassphraseModal
        onSubmit={(pw) => {
          sessionStorage.setItem("passphrase", pw);
          setPassphrase(pw);
        }}
      />
    );
  }

  if (loading)
    return <div className="p-10 text-[var(--muted)]">Loading...</div>;

  return (
    <div className="min-h-screen px-4 py-28 bg-[var(--background)] text-[var(--foreground)] flex justify-center">
      <div className="w-[80%] max-w-3xl bg-[var(--surface)] p-8 rounded-2xl shadow-xl border border-[var(--border)] transition-all duration-300">
        <h2 className="text-4xl font-extrabold shiny-text mb-4">
          Journal for {formattedDate}
        </h2>

        {journal ? (
          isToday ? (
            <p className="text-[var(--muted)] mb-6">
              You already have an entry for today. Edit it below ✍️
            </p>
          ) : (
            <p className="text-[var(--muted)] mb-6">
              Readonly journal from the past 📜
            </p>
          )
        ) : isToday ? (
          <p className="text-[var(--muted)] mb-6">
            No journal yet. Start writing below 👇
          </p>
        ) : (
          <p className="text-[var(--muted)] mb-6">
            No entry found for this date.
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Your thoughts
            </label>
            <textarea
              rows={16}
              className="w-full p-4 rounded-xl border handwriting border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] shadow-sm"
              placeholder="Reflect on your day... 🌿"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={!isToday}
              required
            />
            {isToday && (
              <p className="mt-2 text-sm text-[var(--muted)]">
                 Sentiment score: {computeSentimentScore(text)}<br/>Note:This score is only for the purpose of tracking the mood of the day. The model may not always be accurate.
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-1/3">
              <div className="mb-4">
                <h3 className="text-3xl font-extrabold shiny-text glow-text mb-2 tracking-wide flex items-center gap-2">
                  <HeartPulse className="my-6 text-red-500 animate-pulse" size={28} />
                  Mood Meter
                </h3>
                <p className="text-[var(--muted)] text-lg max-w-2xl flex items-center gap-2">
                  How are you feeling today? <br />
                  Track your emotions to understand your inner world better.
                </p>
                <p className="text-[var(--muted)] italic mt-1 text-sm">
                  Logging your mood daily helps you stay emotionally aware and grounded.
                </p>
              </div>
            </div>

            <div className="lg:w-2/3 flex flex-col gap-6">
              {Object.keys(mood).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium capitalize mb-2 flex justify-between items-center">
                    <span className="flex gap-2 items-center">
                      {emotionIcons[key]} {key}
                    </span>
                    <span className="text-xl font-semibold">
                      {mood[key]} {getMoodEmoji(key, mood[key])}
                    </span>
                  </label>

                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={mood[key]}
                    onChange={(e) =>
                      setMood((prev) => ({
                        ...prev,
                        [key]: parseInt(e.target.value),
                      }))
                    }
                    disabled={!isToday}
                    className="w-full h-4 appearance-none rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] shadow-inner cursor-pointer"
                    style={{ WebkitAppearance: "none" }}
                  />
                  <style>
                    {`
                      input[type='range']::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 24px;
                        width: 24px;
                        background: white;
                        border: 3px solid var(--primary);
                        border-radius: 50%;
                        cursor: pointer;
                        box-shadow: 0 0 5px rgba(0,0,0,0.2);
                        margin-top: -10px;
                        transition: transform 0.2s;
                      }
                      input[type='range']::-webkit-slider-thumb:hover {
                        transform: scale(1.1);
                      }
                      input[type='range']::-moz-range-thumb {
                        height: 24px;
                        width: 24px;
                        background: white;
                        border: 3px solid var(--primary);
                        border-radius: 50%;
                        cursor: pointer;
                      }
                    `}
                  </style>
                </div>
              ))}
            </div>
          </div>

          {isToday && (
            <button
              type="submit"
              className="self-start px-8 py-3 mt-6 bg-[var(--primary)] text-white rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
            >
              {journal ? "Update Journal" : "Save Journal"} ✨
            </button>
          )}
        </form>

        <button
          onClick={() => {
            sessionStorage.removeItem("passphrase");
            window.location.reload();
          }}
          className="mt-6 text-sm text-blue-500 hover:underline"
        >
          🔁 Reset Passphrase
        </button>
      </div>
    </div>
  );
}

export default Journal;
