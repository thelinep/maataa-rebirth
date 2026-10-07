import { createElement } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

// Base presentational primitives consolidated from the former @maataa/ui
// package into the canonical @maataa/maataa-ui shell. These render against the
// global CSS classes (button, card, badge, page, section-header, metric)
// already provided by the app. The typography primitives that previously also
// lived in @maataa/ui (HeroHeading, GlowMetric, DharmaQuote, SectionLabel,
// RuntimeStat, CosmicCaption) are intentionally omitted here because
// maataa-ui/src/typography already owns them.

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
  variant?: "primary" | "secondary";
};

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary";
};

export function Button(props: ButtonProps | ButtonLinkProps) {
  const { className, variant = "primary", children } = props;
  const classes = cx("button", variant === "secondary" && "secondary", className);
  if ("href" in props && props.href) {
    const { href, variant: _variant, className: _className, children: _children, ...rest } = props;
    return createElement("a", { className: classes, href, ...rest }, children);
  }
  const { variant: _variant, className: _className, children: _children, ...rest } = props;
  return createElement("button", { className: classes, ...rest }, children);
}

export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return createElement("section", { className: cx("card", className), ...props });
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return createElement("span", { className: cx("badge", className), ...props });
}

export type MetricCardProps = HTMLAttributes<HTMLElement> & {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
};

export function MetricCard({ label, value, detail, className, ...props }: MetricCardProps) {
  return createElement(
    Card,
    { className: cx("stack", className), ...props },
    createElement("span", { className: "muted" }, label),
    createElement("strong", { className: "metric" }, value),
    detail ? createElement("span", { className: "muted" }, detail) : null
  );
}

export function PageShell({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return createElement("main", { className: cx("page", className), ...props });
}

export type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
};

export function SectionHeader({ title, eyebrow, description, className, ...props }: SectionHeaderProps) {
  return createElement(
    "div",
    { className: cx("section-header", className), ...props },
    eyebrow ? createElement(Badge, null, eyebrow) : null,
    createElement("h1", null, title),
    description ? createElement("p", null, description) : null
  );
}
