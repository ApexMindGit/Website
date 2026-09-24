"use client";

import { usePathname } from "next/navigation";

// Route-aware theme wrapper. The homepage keeps the dark studio canvas; every
// other route renders on the light/white theme. usePathname resolves during SSR
// too, so data-theme is correct on first paint (no flash).
export default function ThemeShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const theme = pathname === "/" ? "dark" : "light";
  return (
    <div className="theme-shell" data-theme={theme}>
      {children}
    </div>
  );
}
