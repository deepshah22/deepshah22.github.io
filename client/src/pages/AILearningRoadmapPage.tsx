import React, { useMemo, useState } from "react";

type Week = {
  id: number;
  title: string;
  shortTitle: string;
  focus: string;
  goals: string[];
  project: string;
  deliverable: string;
  days: { day: string; tasks: string[] }[];
};

const weeks: Week[] = [
  {
    id: 1,
    title: "Week 1 — AI & LLM Fundamentals",
    shortTitle: "Fundamentals",
    focus: "Build the foundation: tokens, prompts, transformers, inference, and hallucinations.",
    goals: [
      "Explain AI vs ML vs Deep Learning vs Generative AI",
      "Understand tokens, context windows, and next-token prediction",
      "Know why hallucinations happen and how prompts reduce ambiguity",
    ],
    project: "Build a simple chat app and log prompt, response, latency, and token usage.",
    deliverable: "A minimal chat app with logs and a short README explaining what you learned.",
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
    shortTitle: "LLM Apps",
    focus: "Learn how real AI apps are structured beyond a single prompt.",
    goals: [
      "Understand prompt layers and structured output",
      "Learn context engineering and response debugging",
      "Understand memory basics",
    ],
    project: "Build a document Q&A app: naive full-context version, then optimize it.",
    deliverable: "A comparison of naive vs optimized document Q&A with notes on tradeoffs.",
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
    shortTitle: "RAG",
    focus: "Understand how AI systems retrieve knowledge instead of relying only on model memory.",
    goals: [
      "Learn embeddings and vector similarity",
      "Understand chunking and retrieval pipelines",
      "Build a basic RAG system",
    ],
    project: "Build 'Ask My Notes' with chunking, embeddings, retrieval, and cited answers.",
    deliverable: "A working RAG prototype over your own notes or docs with citations.",
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
    shortTitle: "Tools",
    focus: "Move from chatbot thinking to workflow thinking.",
    goals: [
      "Understand tool calling and API integration",
      "Separate deterministic logic from model-driven reasoning",
      "Design multi-step workflows with error handling",
    ],
    project: "Build an AI email assistant that classifies, extracts action items, and drafts replies.",
    deliverable: "A multi-step workflow that combines rules, APIs, and model reasoning.",
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
    shortTitle: "Agents",
    focus: "Understand agent design, planning, specialization, and guardrails.",
    goals: [
      "Know the difference between workflow and agent",
      "Understand planning and tool selection",
      "Design subagents with clear ownership",
    ],
    project: "Build a PRD analyzer with a main agent and specialist subagents.",
    deliverable: "A coordinator agent with specialist helpers for requirements, risks, and test cases.",
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
    shortTitle: "MCP",
    focus: "Learn how standardized AI integrations work through Model Context Protocol.",
    goals: [
      "Understand MCP client/server concepts",
      "Know resources vs tools",
      "Learn the security and integration mindset",
    ],
    project: "Build a simple MCP server exposing docs/tools and connect an agent to it.",
    deliverable: "A small MCP-powered app that can read context and invoke external tools.",
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
    shortTitle: "Skills",
    focus: "Turn repeated AI tasks into reusable capabilities.",
    goals: [
      "Understand skill vs tool vs agent",
      "Learn routing and composition",
      "Create reusable workflows for real work",
    ],
    project: "Create 3 reusable skills: PR review, incident summary, and design doc summarizer.",
    deliverable: "A reusable skill library with notes on when each skill should be used.",
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
    shortTitle: "Production",
    focus: "Add evals, observability, safety, cost control, and reliability.",
    goals: [
      "Learn how to evaluate AI systems",
      "Add logging, tracing, retries, and prompt versioning",
      "Think about production readiness, not just prototypes",
    ],
    project: "Upgrade one earlier project with evals, logs, retries, and metrics.",
    deliverable: "A production-style upgrade with a clear quality checklist and telemetry.",
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

const highlights = [
  ["8 Weeks", "A guided path from absolute basics to production-ready AI systems."],
  ["8 Projects", "One project every week so learning turns into a visible portfolio."],
  ["Backend-friendly", "Structured for engineers who like systems, APIs, reliability, and architecture."],
  ["Portfolio-ready", "Each week ends with a concrete deliverable you can showcase in GitHub."],
] as const;

const outcomes = [
  "Understand LLM fundamentals and prompt design",
  "Build working RAG systems with retrieval and citations",
  "Use tools and multi-step workflows effectively",
  "Design agents, subagents, and skill-based systems",
  "Understand MCP and external tool integration",
  "Think in evals, guardrails, observability, and reliability",
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

const navLinks = [
  ["Overview", "#overview"],
  ["Roadmap", "#roadmap"],
  ["Week Detail", "#week-detail"],
  ["Outcomes", "#outcomes"],
  ["Glossary", "#glossary"],
];

const pageBg =
  "radial-gradient(circle at 10% 10%, rgba(56,189,248,0.14), transparent 20%), radial-gradient(circle at 85% 15%, rgba(168,85,247,0.18), transparent 24%), radial-gradient(circle at 50% 100%, rgba(34,197,94,0.10), transparent 24%), linear-gradient(180deg, #07111f 0%, #0b1220 44%, #111827 100%)";

const glass = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 24,
  boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
  backdropFilter: "blur(10px)",
  ...extra,
});

const sectionHeading: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 800,
  margin: "0 0 10px 0",
  letterSpacing: -0.6,
};

const muted: React.CSSProperties = {
  color: "rgba(226,232,240,0.82)",
  lineHeight: 1.7,
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={glass({ padding: 18 })}>
      <div style={{ fontSize: 13, color: "rgba(226,232,240,0.72)", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function SectionKicker({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 999,
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        color: "#dbeafe",
        background: "rgba(96,165,250,0.12)",
        border: "1px solid rgba(96,165,250,0.25)",
        marginBottom: 14,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#60a5fa" }} />
      {text}
    </div>
  );
}

export default function AILearningRoadmapPage() {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const currentWeek = useMemo(
    () => weeks.find((week) => week.id === selectedWeek) ?? weeks[0],
    [selectedWeek]
  );

  const totalChecklistItems = useMemo(
    () => weeks.reduce((sum, week) => sum + week.days.reduce((s, d) => s + d.tasks.length, 0), 0),
    []
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: pageBg,
        color: "#f8fafc",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "24px 20px 72px" }}>
        <nav
          style={{
            ...glass({
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 18,
              marginBottom: 24,
              position: "sticky",
              top: 16,
              zIndex: 10,
            }),
          }}
        >
          <div>
            <div style={{ fontSize: 13, opacity: 0.72, marginBottom: 2 }}>Portfolio Project</div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>AI Learning Roadmap</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  color: "#e2e8f0",
                  textDecoration: "none",
                  fontSize: 14,
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <section
          id="overview"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 24,
            alignItems: "stretch",
            marginBottom: 28,
          }}
        >
          <div style={glass({ padding: 30 })}>
            <SectionKicker text="Portfolio-ready learning page" />
            <h1 style={{ fontSize: "clamp(38px, 6vw, 66px)", lineHeight: 1.02, margin: "0 0 14px 0", letterSpacing: -1.4 }}>
              Learn AI like an engineer,
              <br />
              build like a portfolio.
            </h1>
            <p style={{ ...muted, fontSize: 18, maxWidth: 760, marginTop: 0 }}>
              This page turns an 8-week AI curriculum into a polished public project. It covers fundamentals,
              RAG, tools, agents, subagents, MCP, skills, and production AI patterns, with a concrete build every week.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
              <a
                href="#roadmap"
                style={{
                  textDecoration: "none",
                  color: "#0f172a",
                  background: "#f8fafc",
                  padding: "12px 18px",
                  borderRadius: 14,
                  fontWeight: 700,
                }}
              >
                Explore roadmap
              </a>
              <a
                href="#week-detail"
                style={{
                  textDecoration: "none",
                  color: "#f8fafc",
                  background: "rgba(255,255,255,0.06)",
                  padding: "12px 18px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontWeight: 700,
                }}
              >
                View weekly detail
              </a>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 14,
                marginTop: 26,
              }}
            >
              <StatCard label="Weeks" value="8" />
              <StatCard label="Projects" value="8" />
              <StatCard label="Checklist items" value={String(totalChecklistItems)} />
              <StatCard label="Best fit" value="Backend engineers" />
            </div>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {highlights.map(([title, text]) => (
              <div key={title} style={glass({ padding: 22 })}>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{title}</div>
                <div style={muted}>{text}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="roadmap" style={{ marginBottom: 28 }}>
          <div style={{ marginBottom: 16 }}>
            <SectionKicker text="Roadmap overview" />
            <h2 style={sectionHeading}>8-week curriculum</h2>
            <p style={{ ...muted, maxWidth: 850 }}>
              Each week introduces one major AI systems concept and ends with a visible deliverable that can go into your GitHub portfolio.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {weeks.map((week) => {
              const active = week.id === selectedWeek;
              return (
                <button
                  key={week.id}
                  onClick={() => setSelectedWeek(week.id)}
                  style={{
                    ...glass({
                      padding: 20,
                      textAlign: "left",
                      cursor: "pointer",
                      background: active ? "rgba(96,165,250,0.14)" : "rgba(255,255,255,0.05)",
                      border: active
                        ? "1px solid rgba(96,165,250,0.35)"
                        : "1px solid rgba(255,255,255,0.12)",
                    }),
                  }}
                >
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.3, opacity: 0.72, marginBottom: 8 }}>
                    Week {week.id}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{week.shortTitle}</div>
                  <div style={{ ...muted, fontSize: 15 }}>{week.focus}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section
          id="week-detail"
          style={{
            display: "grid",
            gridTemplateColumns: "340px 1fr",
            gap: 22,
            marginBottom: 28,
          }}
        >
          <aside style={{ display: "grid", gap: 18, alignSelf: "start", position: "sticky", top: 92 }}>
            <div style={glass({ padding: 22 })}>
              <SectionKicker text="Selected week" />
              <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>{currentWeek.shortTitle}</div>
              <div style={{ ...muted, fontSize: 15 }}>{currentWeek.focus}</div>
            </div>

            <div style={glass({ padding: 22 })}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Week goals</div>
              <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.8, color: "rgba(248,250,252,0.92)" }}>
                {currentWeek.goals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </div>

            <div style={glass({ padding: 22 })}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Deliverable</div>
              <div style={muted}>{currentWeek.deliverable}</div>
            </div>
          </aside>

          <div style={{ display: "grid", gap: 18 }}>
            <div style={glass({ padding: 24 })}>
              <SectionKicker text="Deep dive" />
              <h2 style={{ fontSize: 34, lineHeight: 1.15, margin: "0 0 10px 0" }}>{currentWeek.title}</h2>
              <p style={{ ...muted, marginTop: 0 }}>{currentWeek.focus}</p>

              <div
                style={{
                  marginTop: 20,
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
                  padding: 18,
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Weekend project</div>
                <div style={muted}>{currentWeek.project}</div>
              </div>
            </div>

            <div style={glass({ padding: 24 })}>
              <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 14 }}>Day-by-day checklist</div>
              <div style={{ display: "grid", gap: 14 }}>
                {currentWeek.days.map((entry) => (
                  <div
                    key={entry.day}
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 18,
                      padding: 16,
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <div style={{ fontWeight: 800, marginBottom: 10 }}>{entry.day}</div>
                    <div style={{ display: "grid", gap: 8 }}>
                      {entry.tasks.map((task) => (
                        <label
                          key={task}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontSize: 15,
                            lineHeight: 1.55,
                            color: "rgba(248,250,252,0.94)",
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
            </div>
          </div>
        </section>

        <section
          id="outcomes"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
            marginBottom: 28,
          }}
        >
          <div style={glass({ padding: 24 })}>
            <SectionKicker text="What this prepares you for" />
            <h2 style={sectionHeading}>Outcomes</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {outcomes.map((item) => (
                <div
                  key={item}
                  style={{
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: 14,
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={glass({ padding: 24 })}>
            <SectionKicker text="Why this page works in a portfolio" />
            <h2 style={sectionHeading}>Portfolio value</h2>
            <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.9, color: "rgba(248,250,252,0.94)" }}>
              <li>Shows technical depth without reading like a plain notes page.</li>
              <li>Demonstrates curriculum design, frontend execution, and AI systems thinking.</li>
              <li>Turns learning into visible output with weekly deliverables.</li>
              <li>Works as a standalone page linked from your main homepage.</li>
              <li>Can later be extended with repo links, progress state, and demos.</li>
            </ul>
          </div>
        </section>

        <section id="glossary">
          <div style={{ marginBottom: 16 }}>
            <SectionKicker text="Quick reference" />
            <h2 style={sectionHeading}>Glossary</h2>
            <p style={{ ...muted, maxWidth: 840 }}>
              A compact vocabulary section so visitors understand the terms used across the roadmap.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {glossary.map(([term, meaning]) => (
              <div key={term} style={glass({ padding: 20 })}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{term}</div>
                <div style={muted}>{meaning}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
