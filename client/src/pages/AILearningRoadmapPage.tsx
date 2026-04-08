import { useMemo, useState } from "react";

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
    focus: "Build systems that choose their own steps and delegate to specialized helpers.",
    goals: [
      "Understand agent loops and reasoning",
      "Learn to design subagents with clear boundaries",
      "Build a multi-agent workflow",
    ],
    project: "Build a research assistant that plans, searches, and synthesizes findings.",
    deliverable: "A multi-agent system that produces a research report with sources.",
    days: [
      { day: "Day 1", tasks: ["Agent loop basics", "Reasoning vs acting"] },
      { day: "Day 2", tasks: ["Planning and step selection", "Handling ambiguity"] },
      { day: "Day 3", tasks: ["Subagent design", "Clear responsibilities"] },
      { day: "Day 4", tasks: ["Communication between agents", "State management"] },
      { day: "Day 5", tasks: ["Error recovery", "Timeout and fallback handling"] },
      { day: "Weekend", tasks: ["Build research assistant", "Test multi-agent coordination"] },
    ],
  },
  {
    id: 6,
    title: "Week 6 — MCP & Skills",
    shortTitle: "MCP & Skills",
    focus: "Connect AI systems to external tools and build reusable AI capabilities.",
    goals: [
      "Understand the Model Context Protocol",
      "Learn to design skills as reusable workflows",
      "Integrate external tools and APIs",
    ],
    project: "Build a skill marketplace where each skill is a self-contained AI workflow.",
    deliverable: "A collection of 3-5 reusable skills with clear contracts and examples.",
    days: [
      { day: "Day 1", tasks: ["MCP protocol basics", "Tool discovery and invocation"] },
      { day: "Day 2", tasks: ["Designing skills", "Clear inputs and outputs"] },
      { day: "Day 3", tasks: ["Versioning and compatibility", "Skill composition"] },
      { day: "Day 4", tasks: ["Testing skills", "Error handling and validation"] },
      { day: "Day 5", tasks: ["Documentation and examples", "Skill marketplace design"] },
      { day: "Weekend", tasks: ["Build skill marketplace", "Create 3-5 example skills"] },
    ],
  },
  {
    id: 7,
    title: "Week 7 — Evaluation & Reliability",
    shortTitle: "Evaluation",
    focus: "Measure quality and build systems you can trust in production.",
    goals: [
      "Learn to design meaningful evaluations",
      "Understand metrics beyond accuracy",
      "Build reliability into AI systems",
    ],
    project: "Build an eval framework for your previous projects and measure improvements.",
    deliverable: "A repeatable eval suite with metrics, baselines, and improvement tracking.",
    days: [
      { day: "Day 1", tasks: ["Eval design principles", "Metric selection"] },
      { day: "Day 2", tasks: ["Automated vs human evals", "Scaling evaluation"] },
      { day: "Day 3", tasks: ["Regression testing", "Baseline tracking"] },
      { day: "Day 4", tasks: ["Cost and latency metrics", "User satisfaction"] },
      { day: "Day 5", tasks: ["Continuous monitoring", "Alert design"] },
      { day: "Weekend", tasks: ["Build eval framework", "Measure your best project"] },
    ],
  },
  {
    id: 8,
    title: "Week 8 — Production AI Systems",
    shortTitle: "Production",
    focus: "Deploy, monitor, and iterate on AI systems in the real world.",
    goals: [
      "Understand production constraints and tradeoffs",
      "Learn to handle user feedback and model updates",
      "Build systems that improve over time",
    ],
    project: "Deploy one of your projects to production with monitoring and feedback loops.",
    deliverable: "A live AI system with usage metrics, error tracking, and improvement logs.",
    days: [
      { day: "Day 1", tasks: ["Deployment strategies", "Cost optimization"] },
      { day: "Day 2", tasks: ["Monitoring and alerting", "Error tracking"] },
      { day: "Day 3", tasks: ["User feedback loops", "Data collection"] },
      { day: "Day 4", tasks: ["Model updates and versioning", "Rollback strategies"] },
      { day: "Day 5", tasks: ["Performance tuning", "Scaling considerations"] },
      { day: "Weekend", tasks: ["Deploy to production", "Set up monitoring and feedback"] },
    ],
  },
];

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

const pageBg =
  "radial-gradient(circle at 10% 10%, rgba(56,189,248,0.14), transparent 20%), radial-gradient(circle at 85% 15%, rgba(168,85,247,0.18), transparent 24%), radial-gradient(circle at 50% 100%, rgba(34,197,94,0.10), transparent 24%), linear-gradient(180deg, #07111f 0%, #0b1220 44%, #111827 100%)";

export default function AILearningRoadmapPage() {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const currentWeek = useMemo(
    () => weeks.find((week) => week.id === selectedWeek) ?? weeks[0],
    [selectedWeek]
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
        {/* Roadmap Overview Section */}
        <section id="roadmap" style={{ marginBottom: 28 }}>
          <div style={{ marginBottom: 16 }}>
            <SectionKicker text="Roadmap overview" />
            <h2 style={sectionHeading}>8-week AI curriculum</h2>
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

        {/* Selected Week & Deep Dive Section */}
        <section
          id="week-detail"
          style={{
            display: "grid",
            gridTemplateColumns: "340px 1fr",
            gap: 22,
            marginBottom: 28,
          }}
        >
          {/* Selected Week Sidebar */}
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

          {/* Deep Dive Section */}
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
      </div>
    </div>
  );
}
