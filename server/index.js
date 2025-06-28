
const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require('cors');

const port = process.env.PORT || 4000;
const journalRoutes = require("./APIs/journalRoutes");

// CORS - Allow frontend to talk to backend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json());

// Routes
app.use('/journal', journalRoutes);

const openRouterRoute = require('./APIs/openrouter.js');
app.use('/api/openrouter', openRouterRoute);


// Test route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// DB connection
mongoose.connect(process.env.DBURL)
  .then(() => {
    app.listen(port, () => console.log(`server listening on port ${port}...`));
  })
  .catch(err => console.log("error in DB connection", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Express error handler:", err);
  res.status(500).send({ message: err.message });
});
