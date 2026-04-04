import { portfolioData } from "@shared/portfolioData";
import { Award } from "lucide-react";

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-32 bg-card/50">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="text-accent" size={28} />
            <h2 className="section-title mb-0">Certifications</h2>
          </div>
          <p className="section-subtitle max-w-2xl mx-auto">Professional credentials and continuous learning achievements</p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {portfolioData.certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-background rounded-lg p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Certificate icon */}
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Award className="text-accent" size={24} />
              </div>

              {/* Certificate name */}
              <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                {cert.name}
              </h3>

              {/* Issuer */}
              <p className="text-sm font-medium text-accent mb-3">
                {cert.issuer}
              </p>

              {/* Date */}
              <p className="text-sm text-muted-foreground">
                {cert.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
