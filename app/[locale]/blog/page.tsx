import type { Metadata } from "next";
import { Undo2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE_NAME, SITE_OG_IMAGE, SITE_JOB_TITLE } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { PostList } from "@/components/post-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const prefix = locale === "en" ? "" : `/${locale}`;
  return {
    title: t("blogTitle"),
    description: t("blogDescription"),
    alternates: {
      canonical: `${prefix}/blog`,
      languages: { en: "/blog", ko: "/ko/blog" },
    },
    openGraph: {
      title: t("blogTitle"),
      description: t("blogDescription"),
      images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — ${SITE_JOB_TITLE}` }],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const posts = getAllPosts(locale);

  return (
    <div className="stagger">
      <Link
        href="/"
        className="mb-12 inline-flex size-8 items-center justify-center rounded-full bg-border/80 text-muted-foreground transition hover:bg-border hover:text-foreground active:scale-95"
        aria-label={t("backToHome")}
      >
        <Undo2 className="size-4" />
      </Link>
      <h1 className="mb-8 font-medium text-lg">{t("title")}</h1>
      <PostList posts={posts} />
    </div>
  );
}
