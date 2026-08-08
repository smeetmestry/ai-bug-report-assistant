import { useState } from "react";
import "./App.css";

function App() {
  const [issue, setIssue] = useState("");
  const [report, setReport] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateReport() {
    if (!issue.trim()) {
      setError("Please describe the issue first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/generate-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: issue,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError("Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field, value) {
    setReport({
      ...report,
      [field]: value,
    });
  }

  function copyReport() {
    if (!report) return;

    const text = `
TITLE: ${report.title}

SEVERITY: ${report.severity}
PRIORITY: ${report.priority}

DESCRIPTION:
${report.description}

STEPS TO REPRODUCE:
${report.steps_to_reproduce
  .map((step, index) => `${index + 1}. ${step}`)
  .join("\n")}

EXPECTED BEHAVIOR:
${report.expected_behavior}

ACTUAL BEHAVIOR:
${report.actual_behavior}

ENVIRONMENT:
${report.environment}
    `.trim();

    navigator.clipboard.writeText(text);
    alert("Bug report copied.");
  }

  function downloadReport() {
    if (!report) return;

    const text = `
TITLE: ${report.title}

SEVERITY: ${report.severity}
PRIORITY: ${report.priority}

DESCRIPTION:
${report.description}

STEPS TO REPRODUCE:
${report.steps_to_reproduce
  .map((step, index) => `${index + 1}. ${step}`)
  .join("\n")}

EXPECTED BEHAVIOR:
${report.expected_behavior}

ACTUAL BEHAVIOR:
${report.actual_behavior}

ENVIRONMENT:
${report.environment}
    `.trim();

    const blob = new Blob([text], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "bug-report.txt";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🐛 AI Bug Report Assistant</h1>
          <p>
            Turn informal issue descriptions into structured,
            developer-ready bug reports.
          </p>
        </div>
      </header>

      <main className="container">

        <section className="card input-card">
          <label htmlFor="issue">
            <strong>Describe the issue</strong>
          </label>

          <p className="hint">
            Include what happened, where it happened, and any useful
            context you know.
          </p>

          <textarea
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Example: When I click the login button, the page becomes blank and I cannot access my account..."
            rows="5"
            />

          <button
            className="generate-btn"
            onClick={generateReport}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Bug Report"}
          </button>

          {error && <p className="error">{error}</p>}
        </section>

        {report && (
          <section className="card report-card">

            <div className="report-header">
              <div>
                <span className="eyebrow">GENERATED REPORT</span>
                <h2>Bug Report</h2>
              </div>

              <div className="badges">
                <span
                  className={`badge severity-${report.severity.toLowerCase()}`}
                >
                  Severity: {report.severity}
                </span>

                <span className="badge priority">
                  Priority: {report.priority}
                </span>
              </div>
            </div>

            <div className="report-content">

              <div className="field">
                <label>Title</label>

                {editing ? (
                  <input
                    value={report.title}
                    onChange={(e) =>
                      updateField("title", e.target.value)
                    }
                  />
                ) : (
                  <h3>{report.title}</h3>
                )}
              </div>

              <div className="field">
                <label>Description</label>

                {editing ? (
                  <textarea
                    value={report.description}
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                  />
                ) : (
                  <p>{report.description}</p>
                )}
              </div>

              <div className="field">
                <label>Steps to Reproduce</label>

                {editing ? (
                  <textarea
                    value={report.steps_to_reproduce.join("\n")}
                    onChange={(e) =>
                      updateField(
                        "steps_to_reproduce",
                        e.target.value
                          .split("\n")
                          .filter((step) => step.trim() !== "")
                      )
                    }
                  />
                ) : (
                  <ol>
                    {report.steps_to_reproduce.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                )}
              </div>

              <div className="two-column">

                <div className="field">
                  <label>Expected Behavior</label>

                  {editing ? (
                    <textarea
                      value={report.expected_behavior}
                      onChange={(e) =>
                        updateField(
                          "expected_behavior",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{report.expected_behavior}</p>
                  )}
                </div>

                <div className="field">
                  <label>Actual Behavior</label>

                  {editing ? (
                    <textarea
                      value={report.actual_behavior}
                      onChange={(e) =>
                        updateField(
                          "actual_behavior",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{report.actual_behavior}</p>
                  )}
                </div>

              </div>

              <div className="field">
                <label>Environment</label>

                {editing ? (
                  <textarea
                    value={report.environment}
                    onChange={(e) =>
                      updateField("environment", e.target.value)
                    }
                  />
                ) : (
                  <p>{report.environment}</p>
                )}
              </div>

            </div>

            <div className="actions">
              {editing ? (
                <>
                  <button
                    className="primary-action"
                    onClick={() => setEditing(false)}
                  >
                    💾 Save Changes
                  </button>

                  <button
                    className="secondary-action"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="primary-action"
                    onClick={() => setEditing(true)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="secondary-action"
                    onClick={copyReport}
                  >
                    📋 Copy Report
                  </button>

                  <button
                    className="secondary-action"
                    onClick={downloadReport}
                  >
                    ⬇️ Download
                  </button>
                </>
              )}
            </div>

          </section>
        )}

      </main>
    </div>
  );
}

export default App;