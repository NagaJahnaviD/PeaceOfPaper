import React, { useState, useRef, useEffect } from 'react';
import './mindmitrabot.css';

const MindMitraBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I’m MindMitra 🧠 — How are you feeling today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const updated = [...messages, { from: 'user', text: trimmed }];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/openrouter/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      console.log(data);
      setMessages([...updated, { from: 'bot', text: data.reply }]);
    } catch {
      setMessages([...updated, { from: 'bot', text: 'Oops! Something went wrong. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            🧠 MindMitra
            <button onClick={() => setOpen(false)} className="close-btn">✖</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from}`}>{msg.text}</div>
            ))}
            {loading && <div className="message bot">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type here..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>Send</button>
          </div>
        </div>
      )}
      {!open && (
        <button className="chat-toggle" onClick={() => setOpen(true)}>💬</button>
      )}
    </div>
  );
};

export default MindMitraBot;
