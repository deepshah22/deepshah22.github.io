import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useRoute, Link, useLocation } from "wouter";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  published: z.enum(['draft', 'published']),
});

type BlogPostForm = z.infer<typeof blogPostSchema>;

export default function BlogEditor() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/admin/blog/:id/edit");
  const [isNew, setIsNew] = useState(true);
  const [formData, setFormData] = useState<BlogPostForm>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    published: "draft",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const postId = params?.id;
  const { data: post, isLoading: isLoadingPost } = trpc.blog.getBySlug.useQuery(
    postId || "",
    { enabled: !!postId && postId !== "new" }
  );

  const createMutation = trpc.blog.create.useMutation();
  const updateMutation = trpc.blog.update.useMutation();

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to access this page.</p>
          <Link href="/">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (postId === "new") {
      setIsNew(true);
    } else if (post) {
      setIsNew(false);
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content,
        published: post.published,
      });
    }
  }, [post, postId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = blogPostSchema.parse(formData);

      if (isNew) {
        await createMutation.mutateAsync(validated);
        toast.success("Post created successfully");
      } else {
        await updateMutation.mutateAsync({
          ...validated,
          id: parseInt(postId as string),
        });
        toast.success("Post updated successfully");
      }

      navigate("/admin/blog");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue: any) => {
          newErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(newErrors);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to save post");
      }
    }
  };

  if (!isNew && isLoadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/blog">
              <a className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold mb-4 transition-colors">
                <ArrowLeft size={20} />
                Back to Blog
              </a>
            </Link>
            <h1 className="text-4xl font-bold text-foreground">
              {isNew ? "Create New Post" : "Edit Post"}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-8 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Post title"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="post-slug"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {errors.slug && <p className="text-destructive text-sm mt-1">{errors.slug}</p>}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief summary of the post"
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Content (Markdown) *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content in Markdown..."
                rows={12}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none font-mono text-sm"
              />
              {errors.content && <p className="text-destructive text-sm mt-1">{errors.content}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Status
              </label>
              <select
                name="published"
                value={formData.published}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2"
              >
                <Save size={20} />
                {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Post"}
              </Button>
              <Link href="/admin/blog">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
