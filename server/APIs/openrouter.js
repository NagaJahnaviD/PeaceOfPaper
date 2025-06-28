const express = require('express');
const router = express.Router();
require('dotenv').config();
const fetch = require('node-fetch');

router.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) return res.status(400).json({ reply: 'No message provided.' });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Mental Health App',
      },
      body: JSON.stringify({
        model: 'mistralai/mixtral-8x7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are a kind, empathetic mental health assistant...',
          },
          {
            role: 'user',
            content: userMessage,
          }
        ]
      })
    });

    const raw = await response.text();
    console.log("🔍 Raw OpenRouter response:", raw);

    const data = JSON.parse(raw);
    const botReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";
    res.json({ reply: botReply });

  } catch (err) {
    console.error("🛑 Caught error:", err.message || err);
    res.status(500).json({ reply: 'Something went wrong while talking to the assistant.' });
  }
});
module.exports = router;

