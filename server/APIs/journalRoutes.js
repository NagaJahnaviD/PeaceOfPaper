const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const JournalEntry = require('../models/JournalEntry');
const { requireAuth } = require('@clerk/express'); // ✅ using Clerk express middleware

const journalRoutes = express.Router();

//  Create a new journal entry (protected)
journalRoutes.post(
  "/",
  requireAuth({ signInUrl: "/unauthorized" }),
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.auth;
    const { encryptedText, sentiment, emotions } = req.body;
    
    const today = new Date();
    const dateStart = new Date(today.setUTCHours(0, 0, 0, 0));
    const dateEnd = new Date(today.setUTCHours(23, 59, 59, 999));

    const fullEmotions = {
      happiness: emotions?.happiness ?? 5,
      sadness: emotions?.sadness ?? 5,
      anxiety: emotions?.anxiety ?? 5,
      stress: emotions?.stress ?? 5,
    };
    console.log("fe",fullEmotions);

    let entry;

    const existingEntry = await JournalEntry.findOne({
      userId,
      date: { $gte: dateStart, $lte: dateEnd },
    });

    if (existingEntry) {
      existingEntry.encryptedText = encryptedText;
      existingEntry.sentiment = sentiment;
      existingEntry.emotions = fullEmotions;
      await existingEntry.save();
      entry = existingEntry;
    } else {
      entry = new JournalEntry({
        userId,
        encryptedText,
        sentiment,
        emotions: fullEmotions,
        date: new Date(),
      });
      await entry.save();
    }
    console.log("entry",entry);
    res.status(201).send({
      message: existingEntry ? "Journal entry updated" : "Journal entry created",
      payload: entry,
    });
  })
);



// Get all journal entries (protected)
journalRoutes.get(
  "/",
  requireAuth({ signInUrl: "/unauthorized" }),
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.auth;

    const entries = await JournalEntry.find({ userId }).sort({ date: -1 });
    entries.forEach((entry, idx) => {
  console.log(`#${idx + 1}: ${entry.date.toISOString()}`);
});

    res.status(200).send({ message: "User journal entries", payload: entries });
  })
);

// ✅ Get journal entry by specific date (protected)
journalRoutes.post(
  "/by-date",
  requireAuth({ signInUrl: "/unauthorized" }),
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.auth;
    const { date } = req.body;

    if (!date) {
      return res.status(400).send({ error: "Date is required" });
    }

    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

    const entries = await JournalEntry.find({
      userId,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    res.status(200).send({ message: "Journal entries for the date", payload: entries });
  })
);

// ❌ Unauthorized fallback
journalRoutes.get("/unauthorized", (req, res) => {
  res.status(401).send({ message: "Unauthorized request... please login" });
});

module.exports = journalRoutes;
