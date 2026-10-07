import type { ReactNode } from "react";
import { UniversalContainer, UniversalLayout } from "../layouts/universal.tsx";

export function RuntimePageShell({ children, eyebrow, title, description }: { children: ReactNode; eyebrow?: string; title: string; description?: string }) {
  return (
    <UniversalLayout eyebrow={eyebrow} title={title} description={description} mode="document" mainClassName="py-12 sm:py-16">
      <UniversalContainer size="content">
        {children}
      </UniversalContainer>
    </UniversalLayout>
  );
}
