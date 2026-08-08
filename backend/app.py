import os

from dotenv import load_dotenv
from google import genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BugRequest(BaseModel):
    description: str


@app.get("/")
def home():
    return {
        "message": "AI Bug Report Assistant is running!"
    }


@app.post("/generate-report")
def generate_report(request: BugRequest):

    prompt = f"""
You are an expert software QA engineer.

Convert the user's informal software issue into a professional,
developer-ready bug report.

IMPORTANT:

1. Severity must reflect the IMPACT of the bug.

Severity levels:
- Critical: system-wide outage, data loss, security issue, payment failure,
  or a core function completely unavailable.
- High: major functionality is broken for users, but the entire system
  is not completely unavailable.
- Medium: functionality is partially affected and there is a reasonable
  workaround.
- Low: minor UI issue, typo, cosmetic problem, or small inconvenience.

2. Priority must reflect how urgently the issue should be fixed.

Priority levels:
- P1: urgent, business-critical issue that should be fixed immediately.
- P2: important issue that should be fixed soon.
- P3: normal issue that can be handled in the regular development cycle.
- P4: minor issue that can be addressed when convenient.

DO NOT automatically choose High severity or P1 priority.
Base both values ONLY on the actual impact described by the user.

If the user provides limited information, make a reasonable conservative
classification rather than automatically choosing the highest level.

Generate:
- Clear and concise title
- Professional description
- Severity
- Priority
- Reproduction steps
- Expected behavior
- Actual behavior
- Environment

User's issue:
{request.description}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": {
                "type": "OBJECT",
                "properties": {
                    "title": {
                        "type": "STRING"
                    },
                    "description": {
                        "type": "STRING"
                    },
                    "severity": {
                        "type": "STRING",
                        "enum": [
                            "Critical",
                            "High",
                            "Medium",
                            "Low"
                        ]
                    },
                    "priority": {
                        "type": "STRING",
                        "enum": [
                            "P1",
                            "P2",
                            "P3",
                            "P4"
                        ]
                    },
                    "steps_to_reproduce": {
                        "type": "ARRAY",
                        "items": {
                            "type": "STRING"
                        }
                    },
                    "expected_behavior": {
                        "type": "STRING"
                    },
                    "actual_behavior": {
                        "type": "STRING"
                    },
                    "environment": {
                        "type": "STRING"
                    }
                },
                "required": [
                    "title",
                    "description",
                    "severity",
                    "priority",
                    "steps_to_reproduce",
                    "expected_behavior",
                    "actual_behavior",
                    "environment"
                ]
            }
        }
    )

    return response.parsed


@app.get("/test-gemini")
def test_gemini():

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents="Say hello in one sentence."
    )

    return {
        "message": response.text
    }