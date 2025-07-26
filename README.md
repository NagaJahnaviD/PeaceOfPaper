# 🧠 PeaceOfPaper — AI-Powered Mental Wellness Web App

PeaceOfPaper is a privacy-first mental wellness journaling platform built using the MERN stack. It combines local AI sentiment analysis, secure encryption, visual mood tracking, and a meditation experience — all designed to help users better understand and manage their emotional wellbeing.

---

## ✨ Features

- 🌗 Light & dark theme support
- 🧘 Meditation page with ambient music & custom audio player
- 📓 Daily journaling with AI sentiment analysis using VADER (on frontend)
- 🔒 Passphrase-based encryption — entries unreadable even to the backend
- 📊 Mood tracking with heatmaps and positivity graphs
- 🤖 AI-powered chatbot (Mixtral model via OpenRouter API)
- 🙋‍♀️ User authentication & management via Clerk
- 🎨 UI built with Tailwind CSS, animated using React-Bits and React Icons

---

## 🛠 Tech Stack

| Layer        | Technology                                                                 |
|--------------|----------------------------------------------------------------------------|
| Frontend     | React.js, Tailwind CSS, Clerk, React-Bits, React-Icons                     |
| Backend      | Node.js, Express.js, MongoDB                                               |
| AI/NLP       | VADER (browser-based sentiment analysis), Mixtral model via OpenRouter     |

---

## 🔐 Privacy-Focused Approach

- Journals are encrypted using a passphrase before being sent or saved — even the server cannot decrypt them.
- Sentiment analysis is performed on the frontend only, using the VADER model.
- AI chatbot is separated from journaling — user messages are not linked to journal content.
- Option to download your encryption passphrase as a secure .txt file

---

## 📊 Data Visualizations

- Emotion Heatmap — visualizes daily mood entries (Happy, Sad, Anxiety, Stress)
- Positivity Line Graph — tracks emotional sentiment over time from journal tone
- Responsive & animated dashboards for an engaging experience

---

## 🖼 Screenshots


https://github.com/user-attachments/assets/7641bee1-da76-47e7-81ea-3e251f178644

![localhost_5173_journal](https://github.com/user-attachments/assets/8d27343b-a5ea-470b-bdc2-bd6f0cac3eb4)

![localhost_5173_profile](https://github.com/user-attachments/assets/9ef81c21-6a9e-438c-a79a-85cbbd7bd1a9)

---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/nagajahnavidann/peaceofpaper.git
cd peaceofpaper

### 2. Setup the frontend
cd client
npm install
npm start

### 3. Setup the backend

cd ../server
npm install
npm run dev

### 4. Environment Variables
Create a .env file for your backend and frontend with the following values:

# Backend .env

OPENROUTER_API_KEY=your_openrouter_api_key
PORT=ypur_port_number
DBURL=ypur_mongodb_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
OPENROUTER_API_KEY=your_api_key

# Frontend .env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

### Author
Developed by Dannayak Naga Jahnavi

>  Any suggestions or feedback for improvement are most welcome!

