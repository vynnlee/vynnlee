"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="text-sm text-muted-foreground" aria-label="Toggle theme">
        &nbsp;
      </button>
    );
  }

  const next = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
  const label = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System";

  return (
    <button
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      aria-label="Toggle theme"
      onClick={() => setTheme(next)}
    >
      {label}
    </button>
  );
}
