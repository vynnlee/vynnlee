"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Footer");

  function handleSwitch() {
    const nextLocale = locale === "en" ? "ko" : "en";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
      aria-label={t("switchLocaleLabel")}
    >
      {t("switchLocale")}
    </button>
  );
}
