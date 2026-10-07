/**
 * @maataa/ui/navigation/Breadcrumb
 * Navigation breadcrumb trail component
 */

import React from "react";
import { VisuallyHidden } from "../primitives/VisuallyHidden";
import { colorTokens, spacingTokens } from "../tokens";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Separator character
   * @default '/'
   */
  separator?: string;

  /**
   * Aria label for the breadcrumb nav
   * @default 'Breadcrumb'
   */
  ariaLabel?: string;
}

/**
 * Breadcrumb
 * Navigation breadcrumb trail component
 */
export const Breadcrumb = React.forwardRef<HTMLOListElement, BreadcrumbProps>(
  ({ items, separator = "/", ariaLabel = "Breadcrumb", ...props }, ref) => {
    return (
      <nav aria-label={ariaLabel}>
        <ol
          ref={ref}
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: spacingTokens.sm,
            margin: 0,
            padding: 0,
            listStyle: "none",
            ...props.style,
          }}
          {...props}
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isActive = item.active || isLast;

            return (
              <li
                key={`${item.label}-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacingTokens.sm,
                }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      color: isActive ? colorTokens.text.primary : colorTokens.interactive.primary,
                      textDecoration: "none",
                      cursor: "pointer",
                      fontWeight: isActive ? 600 : 500,
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    onClick={item.onClick}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      color: colorTokens.text.primary,
                      fontWeight: isActive ? 600 : 500,
                      cursor: item.onClick ? "pointer" : "default",
                    }}
                  >
                    {item.label}
                  </span>
                )}

                {!isLast && (
                  <>
                    <VisuallyHidden>/</VisuallyHidden>
                    <span
                      aria-hidden="true"
                      style={{
                        color: colorTokens.text.secondary,
                        margin: `0 ${spacingTokens.xs}`,
                      }}
                    >
                      {separator}
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";
