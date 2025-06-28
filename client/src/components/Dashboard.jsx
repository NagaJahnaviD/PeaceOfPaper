import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Smile, Frown, AlertTriangle, Brain } from 'lucide-react';
import PositivityLineChart from './PositivityLineChart';
import EmotionHeatmap from './EmotionHeatmap';

function Dashboard({ user }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    const formatted = date.toLocaleDateString('en-CA');
    navigate('/journal', {
      state: {
        selectedDate: formatted,
      },
    });
  };

useEffect(() => {
  axios
    .get('http://localhost:3000/journal', { withCredentials: true })
    .then((res) => {
      console.log("📦 Received entries:", res.data.payload); // ⬅️ Check this!
      setEntries(res.data.payload || []);
    })
    .catch((err) => {
      console.error('Error fetching journal entries:', err);
    });
}, []);



  const formatDate = (rawDate) =>
    new Date(rawDate?.$date || rawDate).toISOString().split('T')[0];

  return (
    <div className="min-h-screen px-4  py-10 bg-[var(--background)] text-[var(--foreground)]">
      {/* User Info */}
<div className="w-full max-w-5xl mx-auto bg-[var(--surface)] shadow-2xl rounded-2xl p-8 mb-10 border border-[var(--border)] relative overflow-hidden">
  {/* Gradient Highlight Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)] to-[var(--accent)] opacity-10 rounded-2xl pointer-events-none"></div>

  <h2 className="text-3xl font-extrabold text-[var(--primary)] mb-2 flex items-center gap-2">
    Hello, {user?.firstName || 'Friend'} 
  </h2>

  <p className="text-[var(--muted)] mb-1">
    Total Journals Written: <span className="text-[var(--primary)] font-semibold">{entries.length}</span>
  </p>

  <p className="text-[var(--muted)] mb-1">
    Last Entry: <span className="text-[var(--accent)] font-semibold">
      {entries.length > 0 ? new Date(entries[0].date).toLocaleDateString('en-GB') : 'No entries yet'}
    </span>
  </p>

  <p className="text-[var(--muted)] mt-4 italic text-sm border-t border-[var(--border)] pt-3">
    “Small steps every day lead to big changes.” 
  </p>
</div>

      {/* Positivity Line Graph */}
      <div className="w-[80%] mx-auto h-[400px] bg-[var(--surface)] rounded-xl p-4 mb-8 border border-[var(--border)] shadow">
        {entries.length > 0 ? (
         <PositivityLineChart
  data={entries
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((entry) => ({
      date: formatDate(entry.date),
      sentiment: entry.sentiment ?? 0,
    }))
  }
/>

        ) : (<>
          <p className="text-[var(--muted)] text-5xl">No data to display yet!</p>
          <p className="text-[var(--muted)] text-3xl">Start Journaling today!</p></>
        )}
      </div>

      {/* Emotion Heatmaps */}
      <div className="w-full max-w-5xl mx-auto">
  {[
    { emotion: 'happiness', Icon: Smile, color: 'text-green-500' },
    { emotion: 'sadness', Icon: Frown, color: 'text-blue-500' },
    { emotion: 'anxiety', Icon: AlertTriangle, color: 'text-yellow-500' },
    { emotion: 'stress', Icon: Brain, color: 'text-red-500' },
  ].map(({ emotion, Icon, color }) => (
    <div key={emotion} className="mb-8">
      <div className={`mb-2 ${color}`}>
        <Icon className="inline-block mr-2" size={22} strokeWidth={2.2} />
        <span className="text-lg font-semibold">
          {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
        </span>
      </div>
      <EmotionHeatmap
        emotion={emotion}
        data={entries.map((entry) => ({
          date: formatDate(entry.date),
          value: entry.emotions?.[emotion] ?? 0,
        }))}
      />
    </div>
  ))}
</div>


      {/* Calendar */}
      <div className="w-full max-w-2xl mx-auto mt-12 flex flex-col items-center gap-8">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="custom-calendar"
          tileClassName={() => 'calendar-tile'}
        />
        <p className="text-[var(--muted)]">
          Selected Date: <strong>{selectedDate.toDateString()}</strong>
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
