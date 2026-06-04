import Link from "next/link";
import { PrimaryNavigation } from "@/features/foundation/components/primary-navigation";
import { ThemeToggle } from "@/features/foundation/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-mark" href="/" aria-label="Legado de Diogenes home">
        <span aria-hidden="true">LD</span>
        <span>Legado de Diogenes</span>
      </Link>
      <PrimaryNavigation />
      <ThemeToggle />
    </header>
  );
}
