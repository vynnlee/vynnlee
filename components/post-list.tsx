import { Link } from "@/i18n/navigation";
import type { Post } from "@/lib/blog";

export function PostList({ posts }: { posts: Omit<Post, "content">[] }) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground">No posts yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="group block">
            <div className="flex items-baseline justify-between gap-4">
              <span className="truncate text-[15px] underline decoration-muted-foreground/30 underline-offset-4 transition-colors duration-150 group-hover:decoration-foreground/50">
                {post.title}
              </span>
              <time dateTime={post.dateISO} className="shrink-0 text-sm tabular-nums text-muted-foreground">
                {post.date}
              </time>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
