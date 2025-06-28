const mongoose=require("mongoose")
const journalEntrySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: {
  type: Date,
  required: true,
  default: Date.now, // OR leave this out if you pass it manually
},

  encryptedText: { type: String, required: true },
  sentiment: { type: Number },
  emotions: {
    happiness: Number,
    sadness: Number,
    anxiety: Number,
    stress: Number
  }
});
const JournalEntry=mongoose.model('journalEntry',journalEntrySchema)
module.exports=JournalEntry;
