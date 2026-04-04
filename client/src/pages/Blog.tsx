import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Blog() {
  const { user } = useAuth();
  const { data: posts, isLoading } = trpc.blog.list.useQuery();

  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">Blog</h2>
            {user && (
              <Link href="/admin/blog">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Manage Posts
                </Button>
              </Link>
            )}
          </div>
          <p className="section-subtitle">Thoughts on software engineering, technology, and development</p>
        </div>

        {/* Blog Posts */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-accent" size={32} />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="group cursor-pointer">
                  <div className="bg-card rounded-lg p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>

                    {/* Read more link */}
                    <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                      <span>Read More</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No blog posts yet.</p>
            {user && (
              <Link href="/admin/blog/new">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Create First Post
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
