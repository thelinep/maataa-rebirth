/**
 * @maataa/ui/data/DataTable
 * A sortable table — also the "table view" backing any chart's raw data
 */

import React, { useMemo, useState } from "react";
import { colorTokens, spacingTokens, typographyTokens } from "../tokens";
import { EmptyState } from "./EmptyState";

export interface DataTableColumn {
  /** The row property this column reads. */
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  /** Custom cell renderer. Receives the raw cell value and the full row. */
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  data: Record<string, unknown>[];

  /** Derives a stable React key for a row. Defaults to its index. */
  getRowKey?: (row: Record<string, unknown>, index: number) => string | number;

  /** Rendered instead of the table body when `data` is empty. */
  emptyState?: React.ReactNode;

  className?: string;
  style?: React.CSSProperties;
}

type SortDirection = "asc" | "desc";

/**
 * DataTable
 * A sortable table for tabular data — click a sortable column header to
 * sort by it, click again to reverse. Numeric-aligned columns use
 * tabular figures so values stay aligned down the column. Per the
 * data-viz guidelines, this is also the always-available "table view"
 * that should back any chart built from the same rows.
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={[
 *     { key: "name", header: "Name", sortable: true },
 *     { key: "revenue", header: "Revenue", align: "right", sortable: true },
 *   ]}
 *   data={[{ name: "Acme", revenue: 12400 }]}
 * />
 * ```
 */
export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  ({ columns, data, getRowKey, emptyState, className, style }, ref) => {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const sortedData = useMemo(() => {
      if (!sortKey) return data;
      const copy = [...data];
      copy.sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        let cmp = 0;
        if (typeof av === "number" && typeof bv === "number") cmp = av - bv;
        else cmp = String(av ?? "").localeCompare(String(bv ?? ""));
        return sortDirection === "asc" ? cmp : -cmp;
      });
      return copy;
    }, [data, sortKey, sortDirection]);

    const handleSort = (column: DataTableColumn) => {
      if (!column.sortable) return;
      if (sortKey === column.key) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(column.key);
        setSortDirection("asc");
      }
    };

    if (data.length === 0) {
      return (
        <div className={className} style={style}>
          {emptyState ?? <EmptyState title="No data" description="Nothing to show yet." />}
        </div>
      );
    }

    return (
      <div className={className} style={{ overflowX: "auto", ...style }}>
        <table
          ref={ref}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: typographyTokens.fontSize.sm,
          }}
        >
          <thead>
            <tr>
              {columns.map((column) => {
                const isActive = sortKey === column.key;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      isActive ? (sortDirection === "asc" ? "ascending" : "descending") : undefined
                    }
                    style={{
                      textAlign: column.align ?? "left",
                      padding: spacingTokens.sm,
                      borderBottom: `2px solid ${colorTokens.border.primary}`,
                      color: colorTokens.text.secondary,
                      fontWeight: typographyTokens.fontWeight.semibold,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(column)}
                        style={{
                          all: "unset",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: spacingTokens.xs,
                          color: "inherit",
                          font: "inherit",
                        }}
                      >
                        {column.header}
                        <span aria-hidden="true" style={{ fontSize: typographyTokens.fontSize.xs }}>
                          {isActive ? (sortDirection === "asc" ? "▲" : "▼") : "⇅"}
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={getRowKey ? getRowKey(row, index) : index}>
                {columns.map((column) => {
                  const value = row[column.key];
                  return (
                    <td
                      key={column.key}
                      style={{
                        textAlign: column.align ?? "left",
                        padding: spacingTokens.sm,
                        borderBottom: `1px solid ${colorTokens.border.secondary}`,
                        color: colorTokens.text.primary,
                        fontVariantNumeric: column.align === "right" ? "tabular-nums" : undefined,
                      }}
                    >
                      {column.render ? column.render(value, row) : String(value ?? "")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

DataTable.displayName = "DataTable";
