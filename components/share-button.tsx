"use client";

import { Share } from "lucide-react";
import { useCallback } from "react";

interface ShareButtonProps {
  title: string;
  label: string;
}

export function ShareButton({ title, label }: ShareButtonProps) {
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      throw e;
    }
  }, [title]);

  return (
    <button
      onClick={handleShare}
      className="inline-flex size-8 items-center justify-center rounded-full bg-border/80 text-muted-foreground transition hover:bg-border hover:text-foreground active:scale-95"
      aria-label={label}
    >
      <Share className="size-4" />
    </button>
  );
}
