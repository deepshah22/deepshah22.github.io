import { portfolioData } from "@shared/portfolioData";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-card/50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-accent" size={28} />
              <h2 className="section-title mb-0">Experience</h2>
            </div>
            <p className="section-subtitle">My professional journey and roles</p>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Timeline line */}
                {index !== portfolioData.experience.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-24 bg-gradient-to-b from-accent to-accent/20"></div>
                )}

                {/* Timeline dot and content */}
                <div className="flex gap-6">
                  {/* Dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-accent"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2 pb-8">
                    <div className="bg-background rounded-lg p-6 border border-border hover:border-accent/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                        <span className="text-sm font-medium text-accent">{exp.duration}</span>
                      </div>
                      
                      <p className="text-base font-semibold text-muted-foreground mb-3">
                        {exp.company}
                      </p>
                      
                      <p className="text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
