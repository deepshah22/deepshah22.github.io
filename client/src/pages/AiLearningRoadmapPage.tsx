import React, { useMemo, useState } from "react";

type Week = {
  id: number;
  title: string;
  focus: string;
  goals: string[];
  project: string;
  days: { day: string; tasks: string[] }[];
};

const weeks: Week[] = [
  {
    id: 1,
    title: "Week 1 — AI & LLM Fundamentals",
    focus: "Build the foundation: tokens, transformers, prompts, hallucinations, inference.",
    goals: [
      "Explain AI vs ML vs Deep Learning vs Generative AI",
      "Understand tokens, context windows, and next-token prediction",
      "Know why hallucinations happen and how prompting helps",
    ],
    project: "Build a simple chat app and log prompt, response, latency, and token usage.",
    days: [
      { day: "Day 1", tasks: ["What is AI / ML / LLM", "Common real-world use cases"] },
      { day: "Day 2", tasks: ["Tokens", "Context window"] },
      { day: "Day 3", tasks: ["Transformer intuition", "Attention at a high level"] },
      { day: "Day 4", tasks: ["Inference vs training", "Why LLMs predict next token"] },
      { day: "Day 5", tasks: ["Prompt basics", "System vs user prompt"] },
      { day: "Weekend", tasks: ["Build the chat app", "Write learning notes and blockers"] },
    ],
  },
  {
    id: 2,
    title: "Week 2 — LLM App Anatomy",
    focus: "Learn how real AI apps are structured beyond a single prompt.",
    goals: [
      "Understand prompt layers and structured output",
      "Learn context engineering and response debugging",
      "Understand memory basics",
    ],
    project: "Build a document Q&A app: naive full-context version, then optimize it.",
    days: [
      { day: "Day 1", tasks: ["Prompt engineering basics", "Few-shot prompting"] },
      { day: "Day 2", tasks: ["Structured JSON outputs", "Validation mindset"] },
      { day: "Day 3", tasks: ["Context limits", "Prompt organization"] },
      { day: "Day 4", tasks: ["Short-term vs long-term memory", "Conversation state"] },
      { day: "Day 5", tasks: ["Debug bad outputs", "Improve instructions"] },
      { day: "Weekend", tasks: ["Build document Q&A", "Compare naive vs optimized version"] },
    ],
  },
  {
    id: 3,
    title: "Week 3 — Embeddings & RAG",
    focus: "Understand how AI systems retrieve knowledge instead of relying only on model memory.",
    goals: [
      "Learn embeddings and vector similarity",
      "Understand chunking and retrieval pipelines",
      "Build a basic RAG system",
    ],
    project: "Build 'Ask My Notes' with chunking, embeddings, retrieval, and cited answers.",
    days: [
      { day: "Day 1", tasks: ["What are embeddings", "Semantic similarity"] },
      { day: "Day 2", tasks: ["Cosine similarity", "Vector search basics"] },
      { day: "Day 3", tasks: ["Chunking strategies", "Metadata and filters"] },
      { day: "Day 4", tasks: ["Retrieval pipeline", "Top-k selection"] },
      { day: "Day 5", tasks: ["Re-ranking basics", "RAG failure modes"] },
      { day: "Weekend", tasks: ["Build Ask My Notes", "Add simple citations and notes"] },
    ],
  },
  {
    id: 4,
    title: "Week 4 — Tools & Workflows",
    focus: "Move from chatbot thinking to workflow thinking.",
    goals: [
      "Understand tool calling and API integration",
      "Separate deterministic logic from model-driven reasoning",
      "Design multi-step workflows with error handling",
    ],
    project: "Build an AI email assistant that classifies, extracts action items, and drafts replies.",
    days: [
      { day: "Day 1", tasks: ["Tool/function calling basics", "Schemas and inputs"] },
      { day: "Day 2", tasks: ["API integration", "Response parsing"] },
      { day: "Day 3", tasks: ["Deterministic vs AI steps", "Validation rules"] },
      { day: "Day 4", tasks: ["Multi-step workflows", "Retries and fallbacks"] },
      { day: "Day 5", tasks: ["Error handling", "Confidence and review flows"] },
      { day: "Weekend", tasks: ["Build email assistant", "Test on sample emails"] },
    ],
  },
  {
    id: 5,
    title: "Week 5 — Agents & Subagents",
    focus: "Understand agent design, planning, specialization, and guardrails.",
    goals: [
      "Know the difference between workflow and agent",
      "Understand planning and tool selection",
      "Design subagents with clear ownership",
    ],
    project: "Build a PRD analyzer with a main agent and specialist subagents.",
    days: [
      { day: "Day 1", tasks: ["What makes something an agent", "When not to use one"] },
      { day: "Day 2", tasks: ["Tool selection reasoning", "Planner vs executor"] },
      { day: "Day 3", tasks: ["Planning patterns", "Hand-offs"] },
      { day: "Day 4", tasks: ["Subagents", "Role specialization"] },
      { day: "Day 5", tasks: ["Guardrails", "Termination conditions"] },
      { day: "Weekend", tasks: ["Build PRD analyzer", "Create 3 specialist roles"] },
    ],
  },
  {
    id: 6,
    title: "Week 6 — MCP",
    focus: "Learn how standardized AI integrations work through Model Context Protocol.",
    goals: [
      "Understand MCP client/server concepts",
      "Know resources vs tools",
      "Learn the security and integration mindset",
    ],
    project: "Build a simple MCP server exposing docs/tools and connect an agent to it.",
    days: [
      { day: "Day 1", tasks: ["Why MCP exists", "Problems it solves"] },
      { day: "Day 2", tasks: ["MCP architecture", "Client vs server"] },
      { day: "Day 3", tasks: ["Tools vs resources", "Schemas"] },
      { day: "Day 4", tasks: ["Security basics", "Auth and least privilege"] },
      { day: "Day 5", tasks: ["Real-world usage patterns", "Integration design"] },
      { day: "Weekend", tasks: ["Build MCP server", "Connect it to your agent app"] },
    ],
  },
  {
    id: 7,
    title: "Week 7 — Skills & Reusable Workflows",
    focus: "Turn repeated AI tasks into reusable capabilities.",
    goals: [
      "Understand skill vs tool vs agent",
      "Learn routing and composition",
      "Create reusable workflows for real work",
    ],
    project: "Create 3 reusable skills: PR review, incident summary, and design doc summarizer.",
    days: [
      { day: "Day 1", tasks: ["What is a skill", "Where skills fit"] },
      { day: "Day 2", tasks: ["Skill vs tool vs agent", "Tradeoffs"] },
      { day: "Day 3", tasks: ["Skill design patterns", "Inputs/outputs"] },
      { day: "Day 4", tasks: ["Routing logic", "Selection heuristics"] },
      { day: "Day 5", tasks: ["Composition", "Chaining skills"] },
      { day: "Weekend", tasks: ["Build 3 reusable skills", "Write usage notes"] },
    ],
  },
  {
    id: 8,
    title: "Week 8 — Production AI Systems",
    focus: "Add evals, observability, safety, cost control, and reliability.",
    goals: [
      "Learn how to evaluate AI systems",
      "Add logging, tracing, retries, and prompt versioning",
      "Think about production readiness, not just prototypes",
    ],
    project: "Upgrade one earlier project with evals, logs, retries, and metrics.",
    days: [
      { day: "Day 1", tasks: ["What are evals", "How to define pass/fail"] },
      { day: "Day 2", tasks: ["Logging and tracing", "Useful telemetry"] },
      { day: "Day 3", tasks: ["Cost and latency optimization", "Caching ideas"] },
      { day: "Day 4", tasks: ["Safety and guardrails", "Human review points"] },
      { day: "Day 5", tasks: ["Prompt versioning", "Experiment tracking"] },
      { day: "Weekend", tasks: ["Productionize one project", "Write final learnings"] },
    ],
  },
];

const glossary = [
  ["Token", "A chunk of text the model reads and generates."],
  ["Context window", "The amount of text the model can consider at once."],
  ["Embedding", "A numeric representation of meaning used for similarity search."],
  ["RAG", "Retrieve relevant data first, then generate an answer from it."],
  ["Tool", "A function or API an AI system can call."],
  ["Agent", "A model-driven workflow that can choose steps and use tools."],
  ["Subagent", "A specialized helper agent with a narrow responsibility."],
  ["MCP", "A standard way for AI apps to connect to external tools and context."],
  ["Skill", "A reusable AI workflow or capability."],
  ["Eval", "A repeatable way to measure quality and reliability."],
] as const;

const sectionTitle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  margin: "0 0 12px 0",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 20,
  padding: 20,
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  backdropFilter: "blur(6px)",
};

const badgeStyle = (active: boolean): React.CSSProperties => ({
  padding: "8px 12px",
  borderRadius: 999,
  fontSize: 13,
  cursor: "pointer",
  border: active ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(255,255,255,0.12)",
  background: active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.04)",
  color: "#fff",
  transition: "all 0.2s ease",
});

export default function AILearningRoadmapPage() {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const currentWeek = useMemo(
    () => weeks.find((week) => week.id === selectedWeek) ?? weeks[0],
    [selectedWeek]
  );

  const totalTasks = useMemo(
    () => weeks.reduce((sum, week) => sum + week.days.reduce((s, d) => s + d.tasks.length, 0), 0),
    []
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#f7f7fb",
        background:
          "radial-gradient(circle at top left, rgba(67,97,238,0.35), transparent 30%), radial-gradient(circle at top right, rgba(76,201,240,0.18), transparent 28%), linear-gradient(180deg, #0b1020 0%, #111827 100%)",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px 72px" }}>
        <header
          style={{
            ...cardStyle,
            padding: 28,
            marginBottom: 24,
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.22), rgba(14,165,233,0.12))",
          }}
        >
          <div style={{ fontSize: 13, letterSpacing: 1.4, textTransform: "uppercase", opacity: 0.8 }}>
            AI Learning OS
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.05, margin: "10px 0 12px" }}>
            8-Week AI Roadmap
          </h1>
          <p style={{ maxWidth: 780, fontSize: 18, lineHeight: 1.6, margin: 0, opacity: 0.95 }}>
            A structured, engineer-friendly course from AI basics to RAG, agents, subagents, MCP,
            skills, and production AI systems.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 14,
              marginTop: 22,
            }}
          >
            {[
              ["Duration", "8 weeks"],
              ["Style", "Build-first"],
              ["Projects", "1 per week"],
              ["Total topics", `${totalTasks}+ checklist items`],
            ].map(([label, value]) => (
              <div key={label} style={{ ...cardStyle, padding: 16, background: "rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
              </div>
            ))}
          </div>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24 }}>
          <aside style={{ display: "grid", gap: 16, alignSelf: "start", position: "sticky", top: 20 }}>
            <div style={cardStyle}>
              <div style={sectionTitle}>Weekly Navigation</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {weeks.map((week) => (
                  <button
                    key={week.id}
                    onClick={() => setSelectedWeek(week.id)}
                    style={badgeStyle(week.id === selectedWeek)}
                  >
                    Week {week.id}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 18, fontSize: 14, lineHeight: 1.65, opacity: 0.88 }}>
                Pick a week to view goals, day-by-day tasks, and the weekend project.
              </div>
            </div>

            <div style={cardStyle}>
              <div style={sectionTitle}>Course Checklist</div>
              <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.8 }}>
                <li>Understand LLM fundamentals</li>
                <li>Learn prompt and context design</li>
                <li>Build a RAG system</li>
                <li>Use tools and multi-step workflows</li>
                <li>Design agents and subagents</li>
                <li>Understand MCP clearly</li>
                <li>Create reusable AI skills</li>
                <li>Add evals and observability</li>
              </ul>
            </div>

            <div style={cardStyle}>
              <div style={sectionTitle}>How to Use This Page</div>
              <ol style={{ paddingLeft: 18, margin: 0, lineHeight: 1.8 }}>
                <li>Follow one week at a time.</li>
                <li>Study 45–60 mins on weekdays.</li>
                <li>Build the project on weekends.</li>
                <li>Track progress in your repo issues or README.</li>
              </ol>
            </div>
          </aside>

          <main style={{ display: "grid", gap: 20 }}>
            <section style={cardStyle}>
              <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 1.3, opacity: 0.7 }}>
                Selected Week
              </div>
              <h2 style={{ fontSize: 32, margin: "8px 0 8px" }}>{currentWeek.title}</h2>
              <p style={{ margin: "0 0 16px", fontSize: 17, lineHeight: 1.7, opacity: 0.93 }}>
                {currentWeek.focus}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                <div style={{ ...cardStyle, padding: 18, background: "rgba(255,255,255,0.04)" }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Week Goals</div>
                  <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.75 }}>
                    {currentWeek.goals.map((goal) => (
                      <li key={goal}>{goal}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ ...cardStyle, padding: 18, background: "rgba(255,255,255,0.04)" }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Weekend Project</div>
                  <p style={{ margin: 0, lineHeight: 1.75 }}>{currentWeek.project}</p>
                </div>
              </div>
            </section>

            <section style={cardStyle}>
              <div style={sectionTitle}>Day-by-Day Checklist</div>
              <div style={{ display: "grid", gap: 14 }}>
                {currentWeek.days.map((entry) => (
                  <div
                    key={entry.day}
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 16,
                      padding: 16,
                      background: "rgba(255,255,255,0.035)",
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: 10 }}>{entry.day}</div>
                    <div style={{ display: "grid", gap: 8 }}>
                      {entry.tasks.map((task) => (
                        <label
                          key={task}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            lineHeight: 1.5,
                            cursor: "pointer",
                          }}
                        >
                          <input type="checkbox" />
                          <span>{task}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: 20,
              }}
            >
              <div style={cardStyle}>
                <div style={sectionTitle}>All 8 Weeks Snapshot</div>
                <div style={{ display: "grid", gap: 12 }}>
                  {weeks.map((week) => (
                    <div
                      key={week.id}
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                        padding: 14,
                        background:
                          week.id === selectedWeek ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>
                        Week {week.id}: {week.title.replace(/^Week \d+ — /, "")}
                      </div>
                      <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.9 }}>{week.focus}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gap: 20 }}>
                <div style={cardStyle}>
                  <div style={sectionTitle}>Glossary</div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {glossary.map(([term, meaning]) => (
                      <div
                        key={term}
                        style={{
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 14,
                          padding: 12,
                          background: "rgba(255,255,255,0.03)",
                        }}
                      >
                        <div style={{ fontWeight: 700, marginBottom: 4 }}>{term}</div>
                        <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.9 }}>{meaning}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={cardStyle}>
                  <div style={sectionTitle}>Build-First Rules</div>
                  <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.8 }}>
                    <li>Do not spend all week reading.</li>
                    <li>Build one small project every weekend.</li>
                    <li>Write down failure cases and what you learned.</li>
                    <li>Think like an engineer: inputs, outputs, observability, reliability.</li>
                  </ul>
                </div>
              </div>
            </section>
          </main>
        </section>
      </div>
    </div>
  );
}
