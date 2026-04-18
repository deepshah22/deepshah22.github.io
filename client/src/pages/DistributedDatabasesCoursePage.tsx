import React from "react";
import distributedDatabaseCourse from "../data/distributedDatabaseCourse_clean";

type ModuleType = (typeof distributedDatabaseCourse.modules)[number];
type LessonType = ModuleType["lessons"][number];

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f8fafc",
  color: "#0f172a",
  scrollBehavior: "smooth",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "1380px",
  margin: "0 auto",
  padding: "28px 20px 64px",
};

const heroStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
  border: "1px solid #dbe7f5",
  borderRadius: "28px",
  padding: "28px",
  boxShadow: "0 18px 50px rgba(15, 23, 42, 0.06)",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "#e0f2fe",
  color: "#075985",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const heroTitleStyle: React.CSSProperties = {
  margin: "16px 0 10px",
  fontSize: "clamp(32px, 5vw, 52px)",
  lineHeight: 1.05,
  letterSpacing: "-0.04em",
  fontWeight: 800,
  color: "#0f172a",
};

const heroSubtitleStyle: React.CSSProperties = {
  margin: 0,
  maxWidth: "920px",
  fontSize: "18px",
  lineHeight: 1.7,
  color: "#334155",
};

const quickInfoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
  marginTop: "22px",
};

const quickInfoCard: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "18px",
  padding: "16px",
};

const quickInfoLabel: React.CSSProperties = {
  margin: 0,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#0284c7",
};

const quickInfoText: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: "14px",
  lineHeight: 1.7,
  color: "#475569",
};

const mainLayout: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "320px minmax(0, 1fr)",
  gap: "24px",
  alignItems: "start",
  marginTop: "24px",
};

const sidebarStyle: React.CSSProperties = {
  position: "sticky",
  top: "20px",
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "24px",
  padding: "18px",
  boxShadow: "0 14px 36px rgba(15, 23, 42, 0.05)",
  maxHeight: "calc(100vh - 40px)",
  overflowY: "auto",
};

const sidebarTitle: React.CSSProperties = {
  margin: "0 0 12px",
  fontSize: "16px",
  fontWeight: 800,
  color: "#0f172a",
};

const navListStyle: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gap: "10px",
};

const navItemStyle: React.CSSProperties = {
  display: "block",
  textDecoration: "none",
  padding: "12px 14px",
  borderRadius: "16px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  color: "#0f172a",
  fontSize: "14px",
  lineHeight: 1.5,
  transition: "all 180ms ease",
};

const navSubListStyle: React.CSSProperties = {
  listStyle: "none",
  margin: "8px 0 0",
  padding: "0 0 0 10px",
  display: "grid",
  gap: "8px",
};

const navSubItemStyle: React.CSSProperties = {
  display: "block",
  textDecoration: "none",
  padding: "9px 10px",
  borderRadius: "12px",
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  color: "#475569",
  fontSize: "13px",
  lineHeight: 1.45,
};

const contentStyle: React.CSSProperties = {
  display: "grid",
  gap: "22px",
};

const sectionCard: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "26px",
  padding: "24px",
  boxShadow: "0 16px 42px rgba(15, 23, 42, 0.05)",
  scrollMarginTop: "24px",
};

const sectionLabel: React.CSSProperties = {
  margin: 0,
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#0284c7",
};

const sectionTitle: React.CSSProperties = {
  margin: "8px 0 10px",
  fontSize: "30px",
  lineHeight: 1.2,
  fontWeight: 800,
  color: "#0f172a",
};

const sectionOverview: React.CSSProperties = {
  margin: 0,
  fontSize: "16px",
  lineHeight: 1.8,
  color: "#475569",
};

const lessonGrid: React.CSSProperties = {
  display: "grid",
  gap: "18px",
  marginTop: "18px",
};

const lessonCard: React.CSSProperties = {
  background: "#fdfefe",
  border: "1px solid #e2e8f0",
  borderRadius: "22px",
  padding: "22px",
  scrollMarginTop: "24px",
};

const lessonTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "22px",
  lineHeight: 1.3,
  fontWeight: 800,
  color: "#0f172a",
};

const lessonGoal: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: "15px",
  lineHeight: 1.8,
  color: "#334155",
};

const blockLabel: React.CSSProperties = {
  margin: "18px 0 10px",
  fontSize: "13px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#0ea5e9",
};

const chipWrap: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const chipStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "#eef6ff",
  border: "1px solid #cfe4ff",
  color: "#075985",
  fontSize: "13px",
};

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: "20px",
  color: "#475569",
  lineHeight: 1.85,
};

const finalSectionStyle: React.CSSProperties = {
  ...sectionCard,
  background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
};

const footerStyle: React.CSSProperties = {
  marginTop: "26px",
  textAlign: "center",
  fontSize: "14px",
  color: "#64748b",
};

function smoothNavProps(targetId: string) {
  return {
    href: `#${targetId}`,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${targetId}`);
      }
    },
  };
}

function LessonSection({ lesson }: { lesson: LessonType }) {
  return (
    <article id={lesson.id} style={lessonCard}>
      <h3 style={lessonTitle}>{lesson.title}</h3>
      <p style={lessonGoal}>{lesson.goal}</p>

      <div>
        <h4 style={blockLabel}>Core Concepts</h4>
        <div style={chipWrap}>
          {lesson.concepts.map((concept) => (
            <span key={concept} style={chipStyle}>
              {concept}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 style={blockLabel}>Explanation</h4>
        <ul style={listStyle}>
          {lesson.explanation.map((item, index) => (
            <li key={`${lesson.id}-explanation-${index}`}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 style={blockLabel}>Key Takeaways</h4>
        <ul style={listStyle}>
          {lesson.keyTakeaways.map((item, index) => (
            <li key={`${lesson.id}-takeaways-${index}`}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 style={blockLabel}>Checkpoint</h4>
        <ul style={listStyle}>
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
    <section id={module.id} style={sectionCard}>
      <p style={sectionLabel}>Module</p>
      <h2 style={sectionTitle}>{module.title}</h2>
      <p style={sectionOverview}>{module.overview}</p>

      <div style={lessonGrid}>
        {module.lessons.map((lesson) => (
          <LessonSection key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </section>
  );
}

export default function DistributedDatabasesCoursePage() {
  const isNarrow =
    typeof window !== "undefined" ? window.innerWidth < 1080 : false;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <header style={heroStyle}>
          <span style={badgeStyle}>Distributed Systems Learning</span>
          <h1 style={heroTitleStyle}>{distributedDatabaseCourse.title}</h1>
          <p style={heroSubtitleStyle}>{distributedDatabaseCourse.subtitle}</p>

          <div style={quickInfoGrid}>
            <div style={quickInfoCard}>
              <p style={quickInfoLabel}>Audience</p>
              <p style={quickInfoText}>{distributedDatabaseCourse.audience}</p>
            </div>
            <div style={quickInfoCard}>
              <p style={quickInfoLabel}>Coverage</p>
              <p style={quickInfoText}>
                SQL, NoSQL, replication models, node failures, transactions,
                quorums, and conflict resolution.
              </p>
            </div>
            <div style={quickInfoCard}>
              <p style={quickInfoLabel}>Reading style</p>
              <p style={quickInfoText}>
                Use this like a structured guide. Read lesson by lesson and
                revisit the revision section often.
              </p>
            </div>
          </div>
        </header>

        <div
          style={{
            ...mainLayout,
            gridTemplateColumns: isNarrow ? "1fr" : mainLayout.gridTemplateColumns,
          }}
        >
          <aside style={sidebarStyle}>
            <h2 style={sidebarTitle}>Contents</h2>
            <ul style={navListStyle}>
              <li>
                <a {...smoothNavProps("how-to-study")} style={navItemStyle}>
                  How to study this course
                </a>
              </li>

              {distributedDatabaseCourse.modules.map((module) => (
                <li key={module.id}>
                  <a {...smoothNavProps(module.id)} style={navItemStyle}>
                    {module.title}
                  </a>

                  <ul style={navSubListStyle}>
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <a {...smoothNavProps(lesson.id)} style={navSubItemStyle}>
                          {lesson.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}

              <li>
                <a {...smoothNavProps("final-revision")} style={navItemStyle}>
                  Final revision
                </a>
              </li>
            </ul>
          </aside>

          <main style={contentStyle}>
            <section id="how-to-study" style={sectionCard}>
              <p style={sectionLabel}>Start Here</p>
              <h2 style={sectionTitle}>How to study this course</h2>
              <p style={sectionOverview}>
                This page is designed to feel like a personal course rather than
                a short note sheet. Read it in order first. After that, use the
                navigation on the left to jump directly to topics you want to
                revise.
              </p>

              <div style={lessonGrid}>
                <article style={lessonCard}>
                  <h3 style={lessonTitle}>Suggested study rhythm</h3>
                  <ul style={listStyle}>
                    {distributedDatabaseCourse.howToUse.map((item, index) => (
                      <li key={`study-${index}`}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            {distributedDatabaseCourse.modules.map((module) => (
              <ModuleSection key={module.id} module={module} />
            ))}

            <section id="final-revision" style={finalSectionStyle}>
              <p style={sectionLabel}>Revision</p>
              <h2 style={sectionTitle}>Final revision</h2>
              <p style={sectionOverview}>
                Come back to this section when you want a quick but meaningful
                pass through the most important ideas.
              </p>

              <div style={lessonGrid}>
                <article style={lessonCard}>
                  <ul style={listStyle}>
                    {distributedDatabaseCourse.finalRevision.map((item, index) => (
                      <li key={`revision-${index}`}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          </main>
        </div>

        <p style={footerStyle}>
          Clean light theme, smooth navigation, and structured lessons for
          long-term reading.
        </p>
      </div>
    </div>
  );
}
