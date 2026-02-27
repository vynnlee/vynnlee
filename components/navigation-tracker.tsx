"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

const KEY = "internal-nav";

export function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const count = parseInt(sessionStorage.getItem(KEY) || "0", 10);
    sessionStorage.setItem(KEY, String(count + 1));
  }, [pathname]);

  return null;
}
