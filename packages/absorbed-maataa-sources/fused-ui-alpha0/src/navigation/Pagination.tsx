/**
 * @maataa/ui/navigation/Pagination
 * Page navigation component for tables and lists
 */

import React from "react";
import { Stack } from "../primitives/Stack";
import { VisuallyHidden } from "../primitives/VisuallyHidden";
import { colorTokens, spacingTokens, radiusTokens } from "../tokens";

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Current page (1-indexed)
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Callback when page changes
   */
  onChange: (page: number) => void;

  /**
   * Maximum number of page buttons to show
   * @default 5
   */
  maxPages?: number;

  /**
   * Whether pagination is disabled
   */
  disabled?: boolean;

  /**
   * Show previous/next buttons
   * @default true
   */
  showNavButtons?: boolean;

  /**
   * Aria label for pagination nav
   * @default 'Pagination'
   */
  ariaLabel?: string;
}

/**
 * Pagination
 * Page navigation component with previous/next buttons and page numbers
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onChange,
      maxPages = 5,
      disabled = false,
      showNavButtons = true,
      ariaLabel = "Pagination",
      ...props
    },
    ref
  ) => {
    // Calculate visible page range
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
      const end = Math.min(totalPages, start + maxPages - 1);

      if (end - start + 1 < maxPages) {
        start = Math.max(1, end - maxPages + 1);
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }

      return pages;
    };

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && !disabled) {
        onChange(page);
      }
    };

    const pageNumbers = getPageNumbers();

    return (
      <nav ref={ref} aria-label={ariaLabel} {...props}>
        <Stack direction="horizontal" spacing="sm" align="center" justify="center">
          {/* Previous button */}
          {showNavButtons && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || disabled}
              aria-label="Previous page"
              style={{
                padding: `${spacingTokens.sm} ${spacingTokens.md}`,
                border: `1px solid ${colorTokens.border.primary}`,
                borderRadius: radiusTokens.md,
                backgroundColor: colorTokens.background.primary,
                color: colorTokens.interactive.primary,
                cursor: currentPage === 1 || disabled ? "not-allowed" : "pointer",
                opacity: currentPage === 1 || disabled ? 0.6 : 1,
                transition: "all 0.2s ease",
              }}
            >
              ← Previous
            </button>
          )}

          {/* Page numbers */}
          <div style={{ display: "flex", gap: spacingTokens.sm, alignItems: "center" }}>
            {pageNumbers.map((page, index) => {
              const isEllipsis = page === "...";
              const isActive = page === currentPage;

              return (
                <React.Fragment key={`${page}-${index}`}>
                  {isEllipsis ? (
                    <span
                      style={{
                        color: colorTokens.text.secondary,
                        padding: `${spacingTokens.sm} ${spacingTokens.xs}`,
                      }}
                      aria-hidden="true"
                    >
                      {page}
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page as number)}
                      disabled={disabled}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={`Go to page ${page}`}
                      style={{
                        width: "36px",
                        height: "36px",
                        padding: 0,
                        border: `1px solid ${isActive ? colorTokens.interactive.primary : colorTokens.border.primary}`,
                        borderRadius: radiusTokens.md,
                        backgroundColor: isActive
                          ? colorTokens.interactive.primary
                          : colorTokens.background.primary,
                        color: isActive ? colorTokens.background.primary : colorTokens.text.primary,
                        fontWeight: isActive ? 600 : 500,
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? 0.6 : 1,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Next button */}
          {showNavButtons && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || disabled}
              aria-label="Next page"
              style={{
                padding: `${spacingTokens.sm} ${spacingTokens.md}`,
                border: `1px solid ${colorTokens.border.primary}`,
                borderRadius: radiusTokens.md,
                backgroundColor: colorTokens.background.primary,
                color: colorTokens.interactive.primary,
                cursor: currentPage === totalPages || disabled ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages || disabled ? 0.6 : 1,
                transition: "all 0.2s ease",
              }}
            >
              Next →
            </button>
          )}

          {/* Info text */}
          <VisuallyHidden>
            Page {currentPage} of {totalPages}
          </VisuallyHidden>
        </Stack>
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";
