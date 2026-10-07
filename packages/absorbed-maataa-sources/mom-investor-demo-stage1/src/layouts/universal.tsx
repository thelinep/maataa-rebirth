import type { CSSProperties, ReactNode } from "react";
import { resolveThemeStack, type ThemeStackInput } from "../../themes/index.ts";

type UniversalLayoutMode = "landing" | "dashboard" | "lab" | "operator" | "document";

type UniversalLayoutProps = {
  children: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  mainClassName?: string;
  mode?: UniversalLayoutMode;
  sidebar?: ReactNode;
  style?: CSSProperties;
  themeStack?: ThemeStackInput;
  title?: ReactNode;
  topbar?: ReactNode;
};

type UniversalContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "content" | "wide" | "full";
};

type UniversalGridProps = {
  children: ReactNode;
  className?: string;
  density?: "compact" | "comfortable" | "spacious";
  minColumnWidth?: string;
};

type UniversalPanelProps = {
  children: ReactNode;
  as?: "article" | "aside" | "div" | "section";
  className?: string;
  interactive?: boolean;
};

export function UniversalLayout({
  actions,
  breadcrumbs,
  children,
  className,
  description,
  eyebrow,
  footer,
  header,
  mainClassName,
  mode = "dashboard",
  sidebar,
  style,
  themeStack,
  title,
  topbar
}: UniversalLayoutProps) {
  return (
    <div
      className={cx(
        "maataa-universal-layout min-h-screen min-w-0 overflow-x-clip bg-[color:var(--maataa-bg)] text-[color:var(--maataa-text)]",
        "selection:bg-[color:var(--maataa-accent)]/30 selection:text-[color:var(--maataa-text)]",
        className
      )}
      data-layout-mode={mode}
      style={resolveLayoutStyle(themeStack, style)}
    >
      {header}
      <div
        className={cx(
          "maataa-universal-frame mx-auto grid w-full min-w-0 max-w-[1680px] grid-cols-1 gap-4 px-4 py-6 sm:px-6 lg:px-8",
          sidebar ? "xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]" : ""
        )}
        data-has-sidebar={sidebar ? "true" : "false"}
      >
        {sidebar ? <aside className="min-w-0 xl:sticky xl:top-24 xl:self-start">{sidebar}</aside> : null}
        <main className={cx("min-w-0 overflow-x-clip", mainClassName)}>
          {topbar ? <div className="mb-4 min-w-0">{topbar}</div> : null}
          {breadcrumbs ? <div className="mb-4 min-w-0">{breadcrumbs}</div> : null}
          {title || eyebrow || description || actions ? (
            <header className="mb-8 flex min-w-0 flex-col gap-5 rounded-[var(--maataa-radius-xl)] border border-[color:var(--maataa-border)] bg-[color:var(--maataa-panel)]/78 p-5 shadow-[0_20px_70px_var(--maataa-glow)] backdrop-blur-[var(--maataa-glass-blur,18px)] sm:p-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.16em] text-[color:var(--maataa-accent)]">{eyebrow}</p> : null}
                {title ? <h1 className="mt-2 text-balance text-3xl font-black leading-tight text-[color:var(--maataa-text)] sm:text-5xl">{title}</h1> : null}
                {description ? <p className="mt-3 max-w-3xl text-pretty text-base leading-7 text-[color:var(--maataa-muted)] sm:text-lg">{description}</p> : null}
              </div>
              {actions ? <div className="flex min-w-0 flex-wrap items-center gap-3">{actions}</div> : null}
            </header>
          ) : null}
          {children}
        </main>
      </div>
      {footer}
    </div>
  );
}

export function UniversalContainer({ children, className, size = "content" }: UniversalContainerProps) {
  const sizes = {
    narrow: "max-w-4xl",
    content: "max-w-7xl",
    wide: "max-w-[1680px]",
    full: "max-w-none"
  } satisfies Record<NonNullable<UniversalContainerProps["size"]>, string>;

  return <section className={cx("mx-auto w-full min-w-0", sizes[size], className)}>{children}</section>;
}

export function UniversalGrid({ children, className, density = "comfortable", minColumnWidth = "18rem" }: UniversalGridProps) {
  const gaps = {
    compact: "gap-3",
    comfortable: "gap-4",
    spacious: "gap-6"
  } satisfies Record<NonNullable<UniversalGridProps["density"]>, string>;

  return (
    <div
      className={cx("grid min-w-0", gaps[density], className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minColumnWidth}), 1fr))`
      }}
    >
      {children}
    </div>
  );
}

export function UniversalPanel({ as: Component = "section", children, className, interactive = false }: UniversalPanelProps) {
  return (
    <Component
      className={cx(
        "min-w-0 rounded-[var(--maataa-radius-lg)] border border-[color:var(--maataa-border)] bg-[color:var(--maataa-surface)]/82 p-4 text-[color:var(--maataa-text)] shadow-[0_16px_54px_var(--maataa-glow)] backdrop-blur-[var(--maataa-glass-blur,18px)] sm:p-5",
        interactive ? "transition hover:-translate-y-0.5 hover:border-[color:var(--maataa-accent)] hover:shadow-[0_20px_68px_var(--maataa-glow)]" : "",
        className
      )}
    >
      {children}
    </Component>
  );
}

function resolveLayoutStyle(themeStack: ThemeStackInput | undefined, style: CSSProperties | undefined): CSSProperties | undefined {
  if (!themeStack) return style;
  const resolved = resolveThemeStack(themeStack);
  return { ...resolved.cssVariables, ...style } as CSSProperties;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
