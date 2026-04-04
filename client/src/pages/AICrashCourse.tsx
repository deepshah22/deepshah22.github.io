import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Clock, Target } from "lucide-react";



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

// Import the course data
import { course as courseData } from "@/data/ai-course";

const course: Module[] = courseData as Module[];

export default function AICrashCourse() {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [expandedUnit, setExpandedUnit] = useState<{ [key: number]: number }>({
    0: 0,
  });

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
    if (expandedModule !== index) {
      setExpandedUnit({ [index]: 0 });
    }
  };

  const toggleUnit = (moduleIndex: number, unitIndex: number) => {
    setExpandedUnit((prev) => ({
      ...prev,
      [moduleIndex]:
        prev[moduleIndex] === unitIndex ? -1 : unitIndex,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 border-b border-border/50 py-16 md:py-24">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent/20 rounded-lg">
              <BookOpen className="text-accent" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              AI Crash Course
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A comprehensive, practical guide to becoming an AI engineer. From
            foundations to production systems.
          </p>
        </div>
      </div>

      {/* Course Content */}
      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {course.map((module, moduleIndex) => (
            <div
              key={moduleIndex}
              className="border border-border/50 rounded-lg overflow-hidden bg-card/30 hover:bg-card/50 transition-colors"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(moduleIndex)}
                className="w-full p-6 flex items-start justify-between hover:bg-accent/5 transition-colors text-left"
                style={{
                  borderLeft: `4px solid ${module.accent}`,
                }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-2xl"
                      style={{ color: module.accent }}
                    >
                      {module.icon}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: module.accent + "20",
                        color: module.accent,
                      }}
                    >
                      {module.tag}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {module.module}: {module.title}
                  </h2>
                  <p className="text-muted-foreground mb-3">{module.goal}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {module.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target size={16} />
                      {module.units.length} units
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {expandedModule === moduleIndex ? (
                    <ChevronUp className="text-accent" size={24} />
                  ) : (
                    <ChevronDown className="text-muted-foreground" size={24} />
                  )}
                </div>
              </button>

              {/* Module Content */}
              {expandedModule === moduleIndex && (
                <div className="border-t border-border/30 bg-background/50">
                  <div className="p-6 space-y-4">
                    {module.units.map((unit, unitIndex) => (
                      <div
                        key={unitIndex}
                        className="border border-border/30 rounded-lg overflow-hidden bg-card/50"
                      >
                        {/* Unit Header */}
                        <button
                          onClick={() =>
                            toggleUnit(moduleIndex, unitIndex)
                          }
                          className="w-full p-4 flex items-start justify-between hover:bg-accent/5 transition-colors text-left"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">
                              {unit.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              📚 {unit.resource}
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {expandedUnit[moduleIndex] === unitIndex ? (
                              <ChevronUp
                                className="text-accent"
                                size={20}
                              />
                            ) : (
                              <ChevronDown
                                className="text-muted-foreground"
                                size={20}
                              />
                            )}
                          </div>
                        </button>

                        {/* Unit Steps */}
                        {expandedUnit[moduleIndex] === unitIndex && (
                          <div className="border-t border-border/20 bg-background/30 p-4">
                            <ol className="space-y-3">
                              {unit.steps.map((step, stepIndex) => (
                                <li
                                  key={stepIndex}
                                  className="flex gap-3 text-sm"
                                >
                                  <span
                                    className="font-semibold text-accent flex-shrink-0 mt-0.5"
                                    style={{
                                      color: module.accent,
                                    }}
                                  >
                                    {stepIndex + 1}.
                                  </span>
                                  <span className="text-muted-foreground leading-relaxed">
                                    {step}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-lg">
            Ready to master AI? Start with Module 1 and follow the curriculum.
          </p>
        </div>
      </div>
    </div>
  );
}
