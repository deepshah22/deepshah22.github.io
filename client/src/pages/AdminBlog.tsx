import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Loader2, Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminBlog() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { data: posts, isLoading, refetch } = trpc.blog.listAll.useQuery();
  const deleteMutation = trpc.blog.delete.useMutation();

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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Post deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Blog Management</h1>
              <p className="text-muted-foreground">Create, edit, and manage your blog posts</p>
            </div>
            <Link href="/admin/blog/new">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2">
                <Plus size={20} />
                New Post
              </Button>
            </Link>
          </div>

          {/* Posts list */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-card/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-border hover:bg-card/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{post.title}</p>
                        <p className="text-sm text-muted-foreground">{post.slug}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          post.published === 'published'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {post.published === 'published' ? (
                            <>
                              <Eye size={14} />
                              Published
                            </>
                          ) : (
                            <>
                              <EyeOff size={14} />
                              Draft
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/blog/${post.id}/edit`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <Edit2 size={16} />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            disabled={deleteMutation.isPending}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground text-lg mb-4">No blog posts yet.</p>
              <Link href="/admin/blog/new">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Create Your First Post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
