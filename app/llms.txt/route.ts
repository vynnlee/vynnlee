import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL, SITE_EMAIL, SITE_JOB_TITLE, SITE_SOCIALS } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

export function GET() {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_NAME} is a ${SITE_JOB_TITLE.toLowerCase()} building digital products with obsessive attention to detail.`,
    "",
    "## About",
    "",
    "- Currently studying at SNUST",
    `- Email: ${SITE_EMAIL}`,
    ...SITE_SOCIALS.map((url) => `- ${url}`),
    "",
    "## Works",
    "",
    "- Trendvisor — LLM-powered NLP research company",
    "- SK Telecom TWF — design system redesign",
    "- Wheres.at — UX/UI for a lost-and-found app",
    "- Studio AASVOGEL — interfaces for corporations and public institutions",
    "",
    "## Side Projects",
    "",
    "- [ZeroShot](https://www.zeroshot.kr) — server time timer for course registration & ticketing",
    "- [CatchCat](https://www.catchcat.kr) — university notice board notifier",
    "",
  ];

  for (const locale of routing.locales) {
    const posts = getAllPosts(locale);
    if (posts.length === 0) continue;

    const label = locale === "en" ? "Blog Posts (English)" : "Blog Posts (한국어)";
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;

    lines.push(`## ${label}`, "");
    for (const post of posts) {
      const url = `${SITE_URL}${prefix}/blog/${post.slug}`;
      const mdUrl = `${SITE_URL}/blog/${post.slug}.md${locale !== routing.defaultLocale ? `?locale=${locale}` : ""}`;
      const desc = post.description ? `: ${post.description}` : "";
      lines.push(`- [${post.title}](${url})${desc}`);
      lines.push(`  - Markdown: ${mdUrl}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
