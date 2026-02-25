import { SITE_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Footer() {
  return (
    <footer className="mt-16 flex items-center justify-between py-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-3">
        <p>&copy; {new Date().getFullYear()} {SITE_NAME}</p>
        <a
          href="/llms.txt"
          className="transition-colors hover:text-foreground"
        >
          llms.txt
        </a>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </footer>
  );
}
