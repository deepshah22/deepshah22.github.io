import React from "react";
import distributedDatabaseCourse from "../data/distributedDatabaseCourse_clean";

type ModuleType = (typeof distributedDatabaseCourse.modules)[number];
type LessonType = ModuleType["lessons"][number];

const shell: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "linear-gradient(180deg, #0f172a 0%, #111827 35%, #0b1020 100%)",
  color: "#e5e7eb",
};

const page: React.CSSProperties = {
  maxWidth: "1320px",
  margin: "0 auto",
  padding: "40px 20px 80px",
};

const heroCard: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.72)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  borderRadius: "24px",
  padding: "28px",
  boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
  backdropFilter: "blur(12px)",
};

const pill: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  background: "rgba(59, 130, 246, 0.14)",
  border: "1px solid rgba(96, 165, 250, 0.35)",
  color: "#bfdbfe",
};

const heroTitle: React.CSSProperties = {
  margin: "18px 0 10px",
  fontSize: "clamp(32px, 5vw, 56px)",
  lineHeight: 1.05,
  fontWeight: 800,
  letterSpacing: "-0.04em",
  color: "#f8fafc",
};

const heroSubtitle: React.CSSProperties = {
  margin: "0 0 22px",
  maxWidth: "860px",
  fontSize: "18px",
  lineHeight: 1.7,
  color: "#cbd5e1",
};

const infoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
  marginTop: "22px",
};

const infoCard: React.CSSProperties = {
  padding: "16px 18px",
  borderRadius: "18px",
  background: "rgba(15, 23, 42, 0.88)",
  border: "1px solid rgba(148, 163, 184, 0.16)",
};

const sectionLabel: React.CSSProperties = {
  margin: 0,
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#93c5fd",
  fontWeight: 700,
};

const sectionText: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: "14px",
  lineHeight: 1.65,
  color: "#cbd5e1",
};

const layout: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "24px",
  marginTop: "28px",
};

const sidebar: React.CSSProperties = {
  position: "sticky",
  top: "24px",
  alignSelf: "start",
  background: "rgba(15, 23, 42, 0.76)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  borderRadius: "24px",
  padding: "20px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.24)",
};

const navTitle: React.CSSProperties = {
  margin: "0 0 12px",
  fontSize: "16px",
  fontWeight: 800,
  color: "#f8fafc",
};

const navList: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gap: "10px",
};

const navItem: React.CSSProperties = {
  display: "block",
  textDecoration: "none",
  padding: "12px 14px",
  borderRadius: "16px",
  background: "rgba(30, 41, 59, 0.72)",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  color: "#dbeafe",
  fontSize: "14px",
  lineHeight: 1.45,
};

const navSubList: React.CSSProperties = {
  listStyle: "none",
  margin: "10px 0 0 0",
  padding: "0 0 0 10px",
  display: "grid",
  gap: "8px",
};

const navSubItem: React.CSSProperties = {
  display: "block",
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: "12px",
  background: "rgba(15, 23, 42, 0.5)",
  border: "1px solid rgba(148, 163, 184, 0.1)",
  color: "#cbd5e1",
  fontSize: "13px",
  lineHeight: 1.45,
};

const contentWrap: React.CSSProperties = {
  display: "grid",
  gap: "22px",
};

const moduleCard: React.CSSProperties = {
  background: "rgba(15, 23, 42, 0.78)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
};

const moduleHeader: React.CSSProperties = {
  marginBottom: "18px",
  paddingBottom: "18px",
  borderBottom: "1px solid rgba(148, 163, 184, 0.14)",
};

const moduleTitle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "28px",
  lineHeight: 1.2,
  fontWeight: 800,
  color: "#f8fafc",
};

const moduleOverview: React.CSSProperties = {
  margin: 0,
  fontSize: "16px",
  lineHeight: 1.75,
  color: "#cbd5e1",
};

const lessonsGrid: React.CSSProperties = {
  display: "grid",
  gap: "18px",
};

const lessonCard: React.CSSProperties = {
  background: "rgba(2, 6, 23, 0.58)",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  borderRadius: "20px",
  padding: "20px",
};

const lessonTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "22px",
  lineHeight: 1.3,
  fontWeight: 800,
  color: "#f8fafc",
};

const lessonGoal: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#dbeafe",
};

const blockTitle: React.CSSProperties = {
  margin: "18px 0 10px",
  fontSize: "14px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  fontWeight: 800,
  color: "#93c5fd",
};

const chips: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const chip: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  lineHeight: 1.2,
  color: "#dbeafe",
  background: "rgba(30, 41, 59, 0.8)",
  border: "1px solid rgba(148, 163, 184, 0.14)",
};

const textList: React.CSSProperties = {
  margin: 0,
  paddingLeft: "20px",
  color: "#cbd5e1",
  lineHeight: 1.8,
};

const finalCard: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.22)",
};

const footerText: React.CSSProperties = {
  marginTop: "26px",
  fontSize: "14px",
  textAlign: "center",
  color: "#94a3b8",
};

const mobileNote: React.CSSProperties = {
  marginTop: "14px",
  fontSize: "13px",
  lineHeight: 1.6,
  color: "#94a3b8",
};

function LessonSection({ lesson }: { lesson: LessonType }) {
  return (
    <article id={lesson.id} style={lessonCard}>
      <h3 style={lessonTitle}>{lesson.title}</h3>
      <p style={lessonGoal}>{lesson.goal}</p>

      <div>
        <h4 style={blockTitle}>Core Concepts</h4>
        <div style={chips}>
          {lesson.concepts.map((concept) => (
            <span key={concept} style={chip}>
              {concept}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 style={blockTitle}>Explanation</h4>
        <ul style={textList}>
          {lesson.explanation.map((item, index) => (
            <li key={`${lesson.id}-exp-${index}`}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 style={blockTitle}>Key Takeaways</h4>
        <ul style={textList}>
          {lesson.keyTakeaways.map((item, index) => (
            <li key={`${lesson.id}-takeaway-${index}`}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 style={blockTitle}>Checkpoint</h4>
        <ul style={textList}>
          {lesson.checkpoint.map((item, index) => (
            <li key={`${lesson.id}-checkpoint-${index}`}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ModuleSection({ module }: { module: ModuleType }) {
  return (
    <section id={module.id} style={moduleCard}>
      <div style={moduleHeader}>
        <p style={sectionLabel}>Module</p>
        <h2 style={moduleTitle}>{module.title}</h2>
        <p style={moduleOverview}>{module.overview}</p>
      </div>

      <div style={lessonsGrid}>
        {module.lessons.map((lesson) => (
          <LessonSection key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </section>
  );
}

export default function DistributedDatabasesCoursePage() {
  return (
    <div style={shell}>
      <div style={page}>
        <header style={heroCard}>
          <span style={pill}>Learning Path</span>
          <h1 style={heroTitle}>{distributedDatabaseCourse.title}</h1>
          <p style={heroSubtitle}>{distributedDatabaseCourse.subtitle}</p>

          <div style={infoGrid}>
            <div style={infoCard}>
              <p style={sectionLabel}>Who this is for</p>
              <p style={sectionText}>{distributedDatabaseCourse.audience}</p>
            </div>

            <div style={infoCard}>
              <p style={sectionLabel}>How to use this page</p>
              <p style={sectionText}>
                Move lesson by lesson. Pause after each section and explain it
                back to yourself before going forward.
              </p>
            </div>

            <div style={infoCard}>
              <p style={sectionLabel}>Coverage</p>
              <p style={sectionText}>
                Distributed SQL, NoSQL models, replication, sharding,
                transactions, and consistency tradeoffs.
              </p>
            </div>
          </div>
        </header>

        <div style={layout}>
          <aside style={sidebar}>
            <h2 style={navTitle}>Course Contents</h2>
            <ul style={navList}>
              <li>
                <a href="#how-to-study" style={navItem}>
                  How to study this course
                </a>
              </li>

              {distributedDatabaseCourse.modules.map((module) => (
                <li key={module.id}>
                  <a href={`#${module.id}`} style={navItem}>
                    {module.title}
                  </a>

                  <ul style={navSubList}>
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <a href={`#${lesson.id}`} style={navSubItem}>
                          {lesson.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}

              <li>
                <a href="#final-revision" style={navItem}>
                  Final revision
                </a>
              </li>
            </ul>

            <p style={mobileNote}>
              Tip: keep this page open as a personal reading guide and revisit
              the final revision section whenever you want a quick refresher.
            </p>
          </aside>

          <main style={contentWrap}>
            <section id="how-to-study" style={moduleCard}>
              <div style={moduleHeader}>
                <p style={sectionLabel}>Start Here</p>
                <h2 style={moduleTitle}>How to study this course</h2>
                <p style={moduleOverview}>
                  This course is meant to be read slowly. The goal is not just
                  to recognize terms, but to understand why each concept exists
                  and how it changes the design of a real distributed system.
                </p>
              </div>

              <div style={lessonsGrid}>
                <article style={lessonCard}>
                  <h3 style={lessonTitle}>Suggested learning rhythm</h3>
                  <ul style={textList}>
                    {distributedDatabaseCourse.howToUse.map((item, index) => (
                      <li key={`how-${index}`}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            {distributedDatabaseCourse.modules.map((module) => (
              <ModuleSection key={module.id} module={module} />
            ))}

            <section id="final-revision" style={finalCard}>
              <div style={moduleHeader}>
                <p style={sectionLabel}>Revision</p>
                <h2 style={moduleTitle}>Final revision</h2>
                <p style={moduleOverview}>
                  Use this section when you want a fast pass through the most
                  important ideas before diving back into the detailed lessons.
                </p>
              </div>

              <div style={lessonCard}>
                <ul style={textList}>
                  {distributedDatabaseCourse.finalRevision.map((item, index) => (
                    <li key={`revision-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          </main>
        </div>

        <p style={footerText}>
          Built as a long-form learning page for revisiting distributed database
          fundamentals over time.
        </p>
      </div>
    </div>
  );
}
