# 🐛 AI Bug Report Assistant

An AI-powered application that converts informal software issue descriptions into structured, developer-ready bug reports.

## Problem

Bug reports are often incomplete, inconsistent, and difficult for developers to reproduce. Important information such as severity, priority, reproduction steps, expected behavior, and actual behavior may be missing.

## Solution

The AI Bug Report Assistant allows users to describe an issue in natural language. Gemini analyzes the description and generates a structured bug report containing:

- Title
- Severity
- Priority
- Description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment

Users can review and edit the generated report before copying or downloading it.

## Architecture

```text
User
  ↓
React UI
  ↓
POST /generate-report
  ↓
FastAPI Backend
  ↓
Prompt + Issue Description
  ↓
Google Gemini
  ↓
Structured JSON
  ↓
FastAPI
  ↓
React UI
  ↓
Edit / Copy / Download

Tech Stack
Frontend
React
Vite
JavaScript
CSS
Backend
Python
FastAPI
Pydantic
AI
Google Gemini API
AI Workflow
User submits an informal issue description.
React sends the description to the FastAPI backend.
FastAPI constructs a structured prompt.
Gemini analyzes the issue.
Gemini returns structured bug-report information.
The backend sends the result to React.
The user can review, edit, copy, or download the report.
Key Features
Natural-language issue submission
AI-generated bug reports
Severity and priority suggestions
Structured reproduction steps
Editable AI output
Copy report
Download report
Clean web interface
Running Locally
Backend
cd backend

Create and activate a virtual environment, install dependencies, configure the Gemini API key in .env, then run:

uvicorn app:app --reload

Backend runs on:

http://127.0.0.1:8000
Frontend
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
Future Enhancements
Screenshot analysis using Vision LLMs
Log file analysis
Duplicate bug detection
Root-cause suggestions
Issue tracker integration
GitHub/Jira integration

### Important

Do **not** put your actual Gemini API key in the README or GitHub.

Make sure `.env` is in `.gitignore`.

After saving the README, tell me **README done**.

Then we'll make the **architecture diagram**, followed by your **5-slide presentation**.

                    🐛 AI BUG REPORT ASSISTANT

┌──────────────┐
│     USER     │
│ Issue Input  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│    React + Vite  │
│   Frontend UI    │
└────────┬─────────┘
         │
         │ POST /generate-report
         ▼
┌──────────────────┐
│      FastAPI     │
│   Backend API    │
└────────┬─────────┘
         │
         │ Structured Prompt
         ▼
┌──────────────────┐
│   Google Gemini  │
│   AI Processing  │
└────────┬─────────┘
         │
         │ Structured JSON
         ▼
┌──────────────────┐
│      FastAPI     │
│ Response Handler │
└────────┬─────────┘
         │
         ▼
┌────────────────────────────┐
│        React UI            │
│                            │
│  Edit → Copy → Download    │
└────────────────────────────┘