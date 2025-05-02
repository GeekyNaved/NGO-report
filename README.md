
# Project Title

A brief description of what this project does and who it's for

NGO Impact Tracker - Next.js Application
🌟 Overview
A web application that enables NGOs to submit monthly impact reports and provides administrators with a dashboard to view aggregated data. Built with Next.js for seamless full-stack functionality.

🛠️ Tech Stack
Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS

Backend: Next.js API Routes

Database: MongoDB Atlas

Hosting: Vercel (frontend + serverless functions)

Authentication: (Optional - can be added later)

✨ Features
📝 Report submission form for NGOs

📊 Admin dashboard with data visualization

📅 Month-based data filtering

✅ Form validation and error handling

🔄 Real-time data updates

🚀 Getting Started
Prerequisites
Node.js v18+

MongoDB Atlas account (or local MongoDB instance)

Vercel account (for deployment)

Installation
Clone the repository:

bash
git clone https://github.com/yourusername/ngo-impact-tracker.git
cd ngo-impact-tracker
Install dependencies:

bash
npm install
Create .env.local file:

env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ngo?retryWrites=true&w=majority
NODE_ENV=development
Run the development server:

bash
npm run dev
Open http://localhost:3000 in your browser.

🏗️ Project Structure
/ngo-impact-tracker
├── app/
│   ├── api/               # API routes
│   │   ├── report/        # Report submission endpoint
│   │   └── dashboard/     # Dashboard data endpoint
│   ├── admin/             # Admin dashboard
│   └── page.tsx           # Report submission form
├── lib/                   # Utility functions
│   └── mongodb.ts         # MongoDB connection
├── public/                # Static assets
└── types/                 # TypeScript types