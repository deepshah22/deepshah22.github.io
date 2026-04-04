import { ExternalLink, Linkedin, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  platform: "linkedin" | "medium";
  url: string;
  date: string;
}

// Sample articles - you can update these with your actual articles
const articles: Article[] = [
  {
    id: "1",
    title: "Building Scalable Systems at Scale",
    excerpt: "Insights into designing and implementing scalable software architecture for enterprise applications.",
    platform: "linkedin",
    url: "https://linkedin.com/in/deepshah22",
    date: "2024",
  },
  {
    id: "2",
    title: "Modern Software Engineering Practices",
    excerpt: "A deep dive into best practices for software development in 2024.",
    platform: "medium",
    url: "https://medium.com/@deepshah",
    date: "2024",
  },
  {
    id: "3",
    title: "Mentoring and Team Leadership",
    excerpt: "Strategies for effective mentoring and building high-performing engineering teams.",
    platform: "linkedin",
    url: "https://linkedin.com/in/deepshah22",
    date: "2023",
  },
];

export default function Articles() {
  const linkedinArticles = articles.filter((a) => a.platform === "linkedin");
  const mediumArticles = articles.filter((a) => a.platform === "medium");

  return (
    <section id="articles" className="py-20 md:py-32 bg-card/30">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-accent" size={32} />
            <h2 className="section-title mb-0">Articles & Insights</h2>
          </div>
          <p className="section-subtitle max-w-2xl mx-auto">
            Thoughts on software engineering, technology, and professional growth shared on LinkedIn and Medium
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* LinkedIn Articles */}
          {linkedinArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Linkedin className="text-[#0A66C2]" size={24} />
                <h3 className="text-2xl font-bold text-foreground">LinkedIn</h3>
              </div>
              <div className="space-y-4">
                {linkedinArticles.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="bg-background rounded-lg p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                      <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-muted-foreground mb-4 flex-grow line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm text-muted-foreground">{article.date}</span>
                        <ExternalLink
                          size={18}
                          className="text-accent group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <a
                href="https://linkedin.com/in/deepshah22"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6"
              >
                <Button className="bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white flex items-center gap-2">
                  <Linkedin size={18} />
                  View All on LinkedIn
                </Button>
              </a>
            </div>
          )}

          {/* Medium Articles */}
          {mediumArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="text-foreground" size={24} />
                <h3 className="text-2xl font-bold text-foreground">Medium</h3>
              </div>
              <div className="space-y-4">
                {mediumArticles.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="bg-background rounded-lg p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                      <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-muted-foreground mb-4 flex-grow line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm text-muted-foreground">{article.date}</span>
                        <ExternalLink
                          size={18}
                          className="text-accent group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <a
                href="https://medium.com/@deepshah"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6"
              >
                <Button className="bg-foreground hover:bg-foreground/90 text-background flex items-center gap-2">
                  <BookOpen size={18} />
                  View All on Medium
                </Button>
              </a>
            </div>
          )}
        </div>

        {/* Empty State */}
        {linkedinArticles.length === 0 && mediumArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Articles coming soon. Follow me on LinkedIn and Medium for updates!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
