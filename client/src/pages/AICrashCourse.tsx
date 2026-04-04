import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

interface Step {
  [key: string]: string;
}

interface Unit {
  title: string;
  resource: string;
  steps: string[];
}

interface Module {
  module: string;
  title: string;
  duration: string;
  accent: string;
  tag: string;
  icon: string;
  goal: string;
  units: Unit[];
}

import { course } from "@/data/ai-course";

export default function AICrashCourse() {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});
  const [activeModule, setActiveModule] = useState(0);
  const [openUnit, setOpenUnit] = useState<{ [key: number]: number }>({ 0: 0 });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ai-course-progress");
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("ai-course-progress", JSON.stringify(checked));
  }, [checked]);

  const currentModule = course[activeModule];
  const accentColor = currentModule?.accent || "#50E3C2";

  const toggleStep = (stepId: string) => {
    setChecked((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const toggleUnit = (unitIndex: number) => {
    setOpenUnit((prev) => ({
      ...prev,
      [activeModule]: prev[activeModule] === unitIndex ? -1 : unitIndex,
    }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
        padding: "40px 20px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <BookOpen size={40} color={accentColor} />
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            AI Crash Course
          </h1>
        </div>
        <p
          style={{
            fontSize: "18px",
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          A comprehensive, practical guide to becoming an AI engineer. From
          foundations to production systems.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Module Tabs */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "40px",
            overflowX: "auto",
            paddingBottom: "12px",
          }}
        >
          {course.map((mod, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveModule(idx);
                setOpenUnit({ [idx]: 0 });
              }}
              style={{
                padding: "12px 24px",
                background:
                  activeModule === idx ? mod.accent : "white",
                color:
                  activeModule === idx ? "white" : "#666",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
                boxShadow:
                  activeModule === idx
                    ? `0 4px 12px ${mod.accent}40`
                    : "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {mod.module}
            </button>
          ))}
        </div>

        {/* Module Content */}
        {currentModule && (
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "40px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            {/* Module Header */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "32px",
                    color: accentColor,
                  }}
                >
                  {currentModule.icon}
                </span>
                <span
                  style={{
                    padding: "6px 12px",
                    background: accentColor + "20",
                    color: accentColor,
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {currentModule.tag}
                </span>
              </div>
              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  margin: "0 0 12px 0",
                }}
              >
                {currentModule.title}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  margin: "12px 0",
                  lineHeight: "1.6",
                }}
              >
                {currentModule.goal}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                <span>⏱️ {currentModule.duration}</span>
                <span>📚 {currentModule.units.length} units</span>
              </div>
            </div>

            {/* Units */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {currentModule.units.map((unit, unitIdx) => (
                <div
                  key={unitIdx}
                  style={{
                    marginBottom: "16px",
                    border: "1px solid #e8e4dc",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  {/* Unit Header */}
                  <button
                    onClick={() => toggleUnit(unitIdx)}
                    style={{
                      width: "100%",
                      padding: "16px",
                      background:
                        openUnit[activeModule] === unitIdx
                          ? accentColor + "10"
                          : "white",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "#1a1a1a",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {unit.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#999",
                          margin: 0,
                        }}
                      >
                        📚 {unit.resource}
                      </p>
                    </div>
                    {openUnit[activeModule] === unitIdx ? (
                      <ChevronUp color={accentColor} size={20} />
                    ) : (
                      <ChevronDown color="#999" size={20} />
                    )}
                  </button>

                  {/* Unit Steps */}
                  {openUnit[activeModule] === unitIdx && (
                    <div
                      style={{
                        padding: "16px",
                        background: "#fafafa",
                        borderTop: "1px solid #e8e4dc",
                      }}
                    >
                      <ol style={{ margin: 0, paddingLeft: "20px" }}>
                        {unit.steps.map((step, stepIdx) => {
                          const stepId = `${activeModule}-${unitIdx}-${stepIdx}`;
                          const isChecked = checked[stepId];

                          return (
                            <li
                              key={stepIdx}
                              style={{
                                marginBottom: "12px",
                                display: "flex",
                                gap: "12px",
                                alignItems: "flex-start",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked || false}
                                onChange={() => toggleStep(stepId)}
                                style={{
                                  marginTop: "4px",
                                  cursor: "pointer",
                                  accentColor: accentColor,
                                }}
                              />
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: isChecked ? "#999" : "#666",
                                  textDecoration: isChecked
                                    ? "line-through"
                                    : "none",
                                  lineHeight: "1.5",
                                }}
                              >
                                {step}
                              </span>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "32px",
            gap: "12px",
          }}
        >
          {activeModule > 0 && (
            <button
              onClick={() => {
                setActiveModule((m) => m - 1);
                setOpenUnit({ [activeModule - 1]: 0 });
              }}
              style={{
                padding: "10px 20px",
                background: "#fff",
                border: "1px solid #e8e4dc",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#666",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ← {course[activeModule - 1].module}
            </button>
          )}
          {activeModule < course.length - 1 && (
            <button
              onClick={() => {
                setActiveModule((m) => m + 1);
                setOpenUnit({ [activeModule + 1]: 0 });
              }}
              style={{
                marginLeft: "auto",
                padding: "10px 20px",
                background: accentColor,
                border: "none",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#fff",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {course[activeModule + 1].module} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
