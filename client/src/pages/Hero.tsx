import { Button } from "@/components/ui/button";
import { portfolioData } from "@shared/portfolioData";
import { Mail, Linkedin, Github, ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-12 md:pt-32 md:pb-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
                <p className="text-sm font-medium text-accent">Welcome to my portfolio</p>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                {portfolioData.name}
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                {portfolioData.title} at Adobe
              </p>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                {portfolioData.summary}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>{portfolioData.location}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => scrollToSection("blog")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base font-semibold"
              >
                Read My Blog
              </Button>
              <Button
                onClick={() => scrollToSection("experience")}
                variant="outline"
                className="px-8 py-6 text-base font-semibold"
              >
                View Experience
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {portfolioData.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
                  title={social.name}
                >
                  {social.name === "LinkedIn" && <Linkedin size={20} />}
                  {social.name === "GitHub" && <Github size={20} />}
                  {social.name === "Email" && <Mail size={20} />}
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Visual element */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-80 h-80">
              {/* Gradient background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full blur-3xl"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-accent to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    DS
                  </div>
                  <p className="text-muted-foreground font-medium">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-20">
          <button
            onClick={() => scrollToSection("experience")}
            className="animate-bounce p-2 rounded-full hover:bg-accent/10 transition-colors"
          >
            <ArrowDown size={24} className="text-accent" />
          </button>
        </div>
      </div>
    </section>
  );
}
