import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE_AVATAR, SITE_EMAIL } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { PostList } from "@/components/post-list";

const works = [
  { name: "Trendvisor", descKey: "work1Desc" as const },
  { name: "SK Telecom TWF", descKey: "work2Desc" as const },
  { name: "Wheres.at", descKey: "work4Desc" as const },
  { name: "Studio AASVOGEL", descKey: "work3Desc" as const },
];

const projects = [
  { name: "ZeroShot", descKey: "project1Desc" as const, url: "https://www.zeroshot.kr" },
  { name: "CatchCat", descKey: "project2Desc" as const, url: "https://www.catchcat.kr" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const recentPosts = getAllPosts(locale).slice(0, 5);

  return (
    <div className="stagger">
      <header className="mb-12 flex items-center gap-4">
        <Image
          src={SITE_AVATAR}
          alt={t("title")}
          width={48}
          height={48}
          className="size-12 rounded-full object-cover"
          sizes="48px"
          priority
        />
        <div>
          <h1 className="font-medium">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
      </header>

      <div className="text-base leading-relaxed text-foreground/80">
        <p>
          {t("bio1")}
          <br />
          {t("bio2")}
        </p>
        <p className="mt-4">{t("bio3")}</p>
      </div>

      <section className="mt-8" aria-labelledby="works-heading">
        <h2 id="works-heading" className="text-base font-normal text-foreground/80">{t("worksLabel")}</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base text-foreground/80">
          {works.map((work) => (
            <li key={work.name}>
              <span className="font-medium">{work.name}</span>
              <span className="text-muted-foreground">
                {" "}
                &ndash; {t(work.descKey)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="text-base font-normal text-foreground/80">{t("projectsLabel")}</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base text-foreground/80">
          {projects.map((project) => (
            <li key={project.name}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-muted-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground/50"
              >
                {project.name}
              </a>
              <span className="text-muted-foreground">
                {" "}
                &ndash; {t(project.descKey)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="posts-heading">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 id="posts-heading" className="font-medium">{t("posts")}</h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("allPosts")} &rarr;
          </Link>
        </div>
        <PostList posts={recentPosts} />
      </section>

      <section className="mt-12" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="font-medium">{t("contact")}</h2>
        <p className="mt-3 text-base text-foreground/80">
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="underline decoration-muted-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground/50"
          >
            {SITE_EMAIL}
          </a>
        </p>
      </section>
    </div>
  );
}
