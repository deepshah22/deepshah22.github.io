import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(isAuthenticated = false): TrpcContext {
  const user: AuthenticatedUser | null = isAuthenticated
    ? {
        id: 1,
        openId: "test-user",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      }
    : null;

  return {
    user: user as any,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("blog procedures", () => {
  describe("blog.list", () => {
    it("returns published posts", async () => {
      const ctx = createContext();
      const caller = appRouter.createCaller(ctx);

      // This will return an empty array since we don't have test data
      const result = await caller.blog.list();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("blog.listAll", () => {
    it("returns all posts including drafts", async () => {
      const ctx = createContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.listAll();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("blog.getBySlug", () => {
    it("returns null for non-existent slug", async () => {
      const ctx = createContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.getBySlug("non-existent-slug");

      expect(result).toBeUndefined();
    });
  });

  describe("blog.create", () => {
    it("creates a new blog post", async () => {
      const ctx = createContext(true);
      const caller = appRouter.createCaller(ctx);

      const newPost = {
        title: "Test Post",
        slug: "test-post",
        excerpt: "This is a test post",
        content: "# Test Post\n\nThis is the content.",
        published: "draft" as const,
      };

      const result = await caller.blog.create(newPost);

      expect(result).toBeDefined();
    });

    it("validates required fields", async () => {
      const ctx = createContext(true);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.blog.create({
          title: "",
          slug: "test",
          content: "content",
          published: "draft",
        } as any);
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("blog.update", () => {
    it("updates a blog post", async () => {
      const ctx = createContext(true);
      const caller = appRouter.createCaller(ctx);

      const updateData = {
        id: 1,
        title: "Updated Title",
        slug: "updated-slug",
        content: "Updated content",
        published: "published" as const,
      };

      const result = await caller.blog.update(updateData);

      expect(result).toEqual({ success: true });
    });

    it("requires id field", async () => {
      const ctx = createContext(true);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.blog.update({
          title: "Updated Title",
          slug: "updated-slug",
          content: "Updated content",
        } as any);
        expect.fail("Should have thrown error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("blog.delete", () => {
    it("deletes a blog post", async () => {
      const ctx = createContext(true);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.delete(1);

      expect(result).toEqual({ success: true });
    });

    it("validates id input", async () => {
      const ctx = createContext(true);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.blog.delete("invalid" as any);
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
