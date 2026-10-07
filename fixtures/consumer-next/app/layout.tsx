import type { ReactNode } from "react";
import "@maataa/ui/styles.css";
import "./consumer.css";
import { Providers } from "./providers";

export const metadata = {
  title: "MAATAA UI · Shared React foundation",
  description: "A small Next.js App Router consumer demonstrating MAATAA UI package imports, theming, and a guided local workflow.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><Providers>{children}</Providers></body></html>;
}
