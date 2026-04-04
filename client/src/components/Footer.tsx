import { portfolioData } from "@shared/portfolioData";
import { Mail, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{portfolioData.name}</h3>
            <p className="text-muted-foreground">{portfolioData.title}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-muted-foreground hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#experience" className="text-muted-foreground hover:text-accent transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#articles" className="text-muted-foreground hover:text-accent transition-colors">
                  Articles
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-4">
              {portfolioData.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
                  title={social.name}
                >
                  {social.name === "LinkedIn" && <Linkedin size={20} />}
                  {social.name === "GitHub" && <Github size={20} />}
                  {social.name === "Email" && <Mail size={20} />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © {currentYear} {portfolioData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
