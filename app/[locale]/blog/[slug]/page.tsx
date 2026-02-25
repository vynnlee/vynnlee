import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Undo2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { SITE_NAME, SITE_URL, SITE_AVATAR } from "@/lib/constants";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { MdxContent } from "@/components/mdx-content";
import { ShareButton } from "@/components/share-button";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  const prefix = locale === "en" ? "" : `/${locale}`;
  return {
    title: post.title,
    description:
      post.description || `Read "${post.title}" on ${SITE_NAME}'s blog.`,
    alternates: {
      canonical: `${prefix}/blog/${slug}`,
      languages: { en: `/blog/${slug}`, ko: `/ko/blog/${slug}` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description:
        post.description || `Read "${post.title}" on ${SITE_NAME}'s blog.`,
      publishedTime: post.dateISO,
      modifiedTime: post.dateISO,
      authors: [SITE_URL],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const prefix = locale === "en" ? "" : `/${locale}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    url: `${SITE_URL}${prefix}/blog/${slug}`,
    image: `${SITE_URL}${prefix}/blog/${slug}/opengraph-image`,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${SITE_AVATAR}`,
      },
    },
  };

  return (
    <div className="stagger">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12 flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex size-8 items-center justify-center rounded-full bg-border/80 text-muted-foreground transition hover:bg-border hover:text-foreground active:scale-95"
          aria-label={t("backToBlog")}
        >
          <Undo2 className="size-4" />
        </Link>
        <div className="flex items-center gap-2">
          <ShareButton title={post.title} label={t("share")} />
          <a
            href={`/blog/${slug}.md${locale !== "en" ? `?locale=${locale}` : ""}`}
            className="inline-flex size-8 items-center justify-center rounded-full bg-border/80 text-muted-foreground transition hover:bg-border hover:text-foreground active:scale-95"
            aria-label={t("viewMarkdown")}
          >
          <svg
            width="16"
            height="16"
            viewBox="0 0 208 128"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="5"
              y="5"
              width="198"
              height="118"
              rx="10"
              stroke="currentColor"
              strokeWidth="10"
            />
            <path
              d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39H30zm125 0l-30-33h20V30h20v35h20L145 98z"
              fill="currentColor"
            />
          </svg>
          </a>
        </div>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-lg font-medium">{post.title}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{SITE_NAME}</span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.dateISO}>{post.date}</time>
          </div>
          {post.description && (
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">
              {post.description}
            </p>
          )}
        </header>
        <MdxContent source={post.content} />
      </article>
    </div>
  );
}
