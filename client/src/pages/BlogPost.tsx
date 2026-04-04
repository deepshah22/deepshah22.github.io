import { trpc } from "@/lib/trpc";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { Calendar, ArrowLeft, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Streamdown } from "streamdown";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const { user } = useAuth();
  const slug = params?.slug as string;

  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery(slug, {
    enabled: !!slug,
  });

  if (!match) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Post not found</h1>
        <Link href="/#blog">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen py-12 md:py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <Link href="/#blog">
            <a className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold mb-8 transition-colors">
              <ArrowLeft size={20} />
              Back to Blog
            </a>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={post.createdAt.toISOString()}>
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </time>
              </div>
            </div>

            {/* Divider */}
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-accent/50 rounded-full"></div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <Streamdown>{post.content}</Streamdown>
          </div>

          {/* Admin actions */}
          {user && (
            <div className="mt-12 pt-8 border-t border-border flex gap-4">
              <Link href={`/admin/blog/${post.id}/edit`}>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Edit Post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
