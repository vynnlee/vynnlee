import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL, SITE_JOB_TITLE, SITE_OG_IMAGE, SITE_TWITTER, SITE_SOCIALS } from "@/lib/constants";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { NavigationTracker } from "@/components/navigation-tracker";
import "../globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "45 920",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: `${SITE_NAME} is a design engineer building digital products with obsessive attention to detail. Writing about design, engineering, and technology.`,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      images: [
        {
          url: SITE_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${SITE_JOB_TITLE}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: SITE_TWITTER,
    },
    alternates: {
      canonical: "/",
      languages: { en: "/", ko: "/ko", "x-default": "/" },
      types: { "application/rss+xml": "/feed.xml" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ko")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={pretendard.variable}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
              author: {
                "@type": "Person",
                name: SITE_NAME,
                jobTitle: SITE_JOB_TITLE,
                url: SITE_URL,
                sameAs: SITE_SOCIALS,
              },
            }),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <NavigationTracker />
            <div className="mx-auto min-h-svh max-w-[640px] px-4 md:px-6 pt-4 md:pt-16 pb-8 flex flex-col">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
