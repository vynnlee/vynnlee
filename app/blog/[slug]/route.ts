import { type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { getPostBySlug } from "@/lib/blog";

interface Context {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: Context) {
  const { slug } = await params;

  if (!slug.endsWith(".md")) {
    return new Response("Not found", { status: 404 });
  }

  const bareSlug = slug.replace(/\.md$/, "");

  const requestedLocale = req.nextUrl.searchParams.get("locale") ?? "";
  const locale = (routing.locales as readonly string[]).includes(requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  const post = getPostBySlug(bareSlug, locale);

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const frontmatter = [
    "---",
    `title: "${post.title}"`,
    `date: "${post.dateISO}"`,
    post.description ? `description: "${post.description}"` : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  const markdown = `${frontmatter}\n\n${post.content}`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
