import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";
import { SITE_NAME } from "@/lib/constants";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

const CDN = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  const [regularFont, boldFont] = await Promise.all([
    fetch(`${CDN}/Pretendard-Regular.woff`).then((r) => r.arrayBuffer()),
    fetch(`${CDN}/Pretendard-Bold.woff`).then((r) => r.arrayBuffer()),
  ]);

  const title = post?.title ?? slug;
  const description = post?.description ?? "";
  const date = post?.date ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#ffffff",
          fontFamily: "Pretendard",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 26,
                fontWeight: 400,
                color: "#666666",
                lineHeight: 1.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 400,
            color: "#999999",
          }}
        >
          {SITE_NAME}{date ? ` · ${date}` : ""}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Pretendard",
          data: regularFont,
          weight: 400,
          style: "normal" as const,
        },
        {
          name: "Pretendard",
          data: boldFont,
          weight: 700,
          style: "normal" as const,
        },
      ],
    },
  );
}
