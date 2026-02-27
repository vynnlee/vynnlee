"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Undo2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_NAME, SITE_AVATAR } from "@/lib/constants";

export function BlogNavButton({ backLabel }: { backLabel: string }) {
  const [state, setState] = useState<"loading" | "internal" | "external">(
    "loading",
  );

  useEffect(() => {
    const count = parseInt(sessionStorage.getItem("internal-nav") || "0", 10);
    setState(count > 0 ? "internal" : "external");
  }, []);

  if (state === "loading") {
    return <div className="size-8" />;
  }

  if (state === "internal") {
    return (
      <Link
        href="/blog"
        className="inline-flex size-8 items-center justify-center rounded-full bg-border/80 text-muted-foreground transition hover:bg-border hover:text-foreground active:scale-95"
        aria-label={backLabel}
      >
        <Undo2 className="size-4" />
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <Image
        src={SITE_AVATAR}
        alt={SITE_NAME}
        width={32}
        height={32}
        className="size-8 rounded-full object-cover"
        sizes="32px"
      />
      <span className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        {SITE_NAME}
      </span>
    </Link>
  );
}
