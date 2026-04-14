import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import AIDropdown from "./AIDropdown";

type SectionNavItem = {
  label: string;
  id: string;
};

type RouteNavItem = {
  label: string;
  href: string;
};

type NavItem = SectionNavItem | RouteNavItem;

const isRouteItem = (item: NavItem): item is RouteNavItem => "href" in item;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems: NavItem[] = [
    { label: "Home", id: "hero" },
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Certifications", id: "certifications" },
  ];

  const externalLinks: RouteNavItem[] = [
    { label: "Blogs", href: "https://deepshah22.substack.com" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <a className="text-xl md:text-2xl font-bold text-foreground hover:text-accent transition-colors">
              DS
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              isRouteItem(item) ? (
                <Link key={item.href} href={item.href}>
                  <a
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {item.label}
                </button>
              )
            ))}
            <AIDropdown />
            {externalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-4">
            {navItems.map((item) => (
              isRouteItem(item) ? (
                <Link key={item.href} href={item.href}>
                  <a
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </button>
              )
            ))}
            {externalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 py-2 space-y-2 border-t border-border pt-4">
              <p className="text-sm font-medium text-muted-foreground">Resources</p>
              <Link href="/ai-crash-course">
                <a
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors text-sm"
                >
                  Crash Course
                </a>
              </Link>
              <Link href="/ai-learning-roadmap">
                <a
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors text-sm"
                >
                  Learning Roadmap
                </a>
              </Link>
              <a
                href="https://deepshah22.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors text-sm"
              >
                Blogs
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
