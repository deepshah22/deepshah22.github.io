import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getBlogPosts, getBlogPostBySlug, createBlogPost, updateBlogPost, deleteBlogPost } from "./db";
import { z } from "zod";

const blogPostSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  published: z.enum(['draft', 'published']).optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  blog: router({
    list: publicProcedure.query(async () => {
      return getBlogPosts('published');
    }),
    
    listAll: publicProcedure.query(async () => {
      return getBlogPosts();
    }),
    
    getBySlug: publicProcedure
      .input(z.string())
      .query(async (opts) => {
        return getBlogPostBySlug(opts.input);
      }),
    
    create: publicProcedure
      .input(blogPostSchema)
      .mutation(async (opts) => {
        return createBlogPost({
          title: opts.input.title,
          slug: opts.input.slug,
          excerpt: opts.input.excerpt,
          content: opts.input.content,
          authorId: opts.ctx.user?.id || 1,
          published: opts.input.published || 'draft',
        });
      }),
    
    update: publicProcedure
      .input(blogPostSchema)
      .mutation(async (opts) => {
        if (!opts.input.id) throw new Error('Missing id');
        await updateBlogPost(opts.input.id, {
          title: opts.input.title,
          slug: opts.input.slug,
          excerpt: opts.input.excerpt,
          content: opts.input.content,
          published: opts.input.published,
        });
        return { success: true };
      }),
    
    delete: publicProcedure
      .input(z.number())
      .mutation(async (opts) => {
        await deleteBlogPost(opts.input);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
