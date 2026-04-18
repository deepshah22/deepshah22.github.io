import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";

export default function CoursesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const courseItems = [
    { label: "Crash Course", href: "/ai-crash-course" },
    { label: "Learning Roadmap", href: "/ai-learning-roadmap" },
    { label: "Distributed Databases", href: "/distributed-databases" },
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-medium text-sm md:text-base"
      >
        Courses
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
          {courseItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
