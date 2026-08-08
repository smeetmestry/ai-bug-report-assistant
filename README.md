# AI Bug Report Assistant

An AI-powered application that converts informal software issue descriptions into structured, developer-ready bug reports.

## Problem

Software bugs are often reported informally with incomplete or inconsistent information.

A developer may receive a description such as:

> "The payment fails when I click Pay Now."

Important details such as severity, priority, reproduction steps, expected behavior, actual behavior, and environment may be missing.

This makes bugs harder to understand, reproduce, and prioritize.

## Solution

The **AI Bug Report Assistant** uses Google Gemini to transform a natural-language issue description into a structured bug report.

The generated report can then be reviewed and edited by the user before being copied or downloaded.

### Generated Information

* Title
* Description
* Severity
* Priority
* Steps to reproduce
* Expected behavior
* Actual behavior
* Environment

## Key Features

* Natural-language issue submission
* AI-generated structured bug reports
* Suggested severity and priority
* Structured reproduction steps
* Editable generated reports
* Copy report to clipboard
* Download report
* Clean web-based interface
* Structured AI responses validated through Pydantic

## Architecture

```text
                         User
                           |
                           v
                  +----------------+
                  |   React + Vite |
                  |   Frontend UI  |
                  +-------+--------+
                          |
                          | POST /generate-report
                          v
                  +----------------+
                  |    FastAPI     |
                  |   Backend API  |
                  +-------+--------+
                          |
                          | Structured Prompt
                          v
                  +----------------+
                  |  Google Gemini  |
                  |  AI Processing  |
                  +-------+--------+
                          |
                          | Structured JSON
                          v
                  +----------------+
                  |    FastAPI     |
                  | Response Model |
                  +-------+--------+
                          |
                          v
                  +----------------+
                  |   React UI     |
                  | Edit / Copy /  |
                  |    Download    |
                  +----------------+
```

## How It Works

1. The user enters an informal description of a software issue.
2. React sends the issue description to the FastAPI backend.
3. FastAPI constructs the AI request using a structured prompt.
4. Google Gemini analyzes the issue and generates the bug report.
5. The response is returned as structured data and validated using Pydantic.
6. React displays the generated report.
7. The user can edit, copy, or download the final report.

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Python
* FastAPI
* Pydantic

### AI

* Google Gemini API
* `google-genai`

### Development

* Git
* GitHub
* VS Code

## API Endpoints

| Method | Endpoint           | Purpose                          |
| ------ | ------------------ | -------------------------------- |
| GET    | `/`                | Basic API health check           |
| GET    | `/test-gemini`     | Test Gemini connectivity         |
| POST   | `/generate-report` | Generate a structured bug report |

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/smeetmestry/ai-bug-report-assistant.git
cd ai-bug-report-assistant
```

### 2. Backend Setup

```bash
cd backend

python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_api_key_here
```

Start the FastAPI server:

```bash
uvicorn app:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Security

The Gemini API key is stored in a local `.env` file and is not included in the repository.

The `.env` file is excluded through `.gitignore`.

**Never commit your actual API key to GitHub.**

## Future Enhancements

The current implementation focuses on reliable bug-report generation. Potential extensions include:

* Screenshot analysis using Gemini's multimodal capabilities
* Log file analysis
* Root-cause hypotheses and debugging suggestions
* Duplicate bug detection
* Issue tracker integration
* GitHub / Jira integration
* Browser extension for capturing issues directly from web applications

## Hackathon Context

Built for the **Credence Analytics AI Internship Hackathon 2026**, Challenge 2: **AI Bug Report Generator**.

The project focuses on turning unstructured issue descriptions into actionable, developer-ready bug reports while keeping the generated output editable and reviewable by the user.
