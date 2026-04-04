import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X, LogOut, LogIn } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/");
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Certifications", id: "certifications" },
    { label: "Blog", id: "blog" },
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
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/admin/blog">
                  <Button variant="outline" size="sm">
                    Admin
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2">
                  <LogIn size={16} />
                  Login
                </Button>
              </a>
            )}
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
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Auth */}
            <div className="border-t border-border pt-4 space-y-2">
              {user ? (
                <>
                  <Link href="/admin/blog">
                    <a className="block w-full">
                      <Button variant="outline" className="w-full justify-start">
                        Admin
                      </Button>
                    </a>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <a href={getLoginUrl()} className="block w-full">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground justify-start">
                    <LogIn size={16} className="mr-2" />
                    Login
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
