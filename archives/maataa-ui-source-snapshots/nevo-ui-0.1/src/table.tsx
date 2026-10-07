import type { ReactNode } from "react";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

/**
 * One column of a `Table`. `render` is mandatory rather than an implicit
 * `row[column.key]` lookup -- keeps the component type-safe under `strict`
 * without an `any` cast, and lets a column format, compose, or pull from a
 * nested field without a separate "accessor" concept to learn.
 */
export interface TableColumn<Row> {
  /** Stable identifier for the column -- used as the React key and as the
   * value passed to `onSortChange` when this column's header is activated. */
  key: string;
  header: ReactNode;
  render(row: Row): ReactNode;
  /** When true, the header renders as a button and reports `aria-sort`;
   * omit for columns that can't be sorted (e.g. a row-actions column). */
  sortable?: boolean;
  align?: "start" | "end";
}

export interface TableProps<Row> {
  columns: readonly TableColumn<Row>[];
  /** Already in the order the caller wants rendered -- `Table` never sorts
   * on its own. See `sortColumn`/`onSortChange` below. */
  rows: readonly Row[];
  /** Defaults to the row's index. Pass a real id (e.g. `row => row.id`)
   * whenever rows can be inserted, removed or reordered, so React can keep
   * per-row state (focus, selection) attached to the right row. */
  getRowId?(row: Row, index: number): string;
  /** The `key` of the currently-sorted column, if any. `Table` holds no
   * sort state itself -- same controlled-only contract as `Select` and
   * every other `components.tsx` primitive: the caller owns the state,
   * sorts `rows` before passing them in, and reflects the result back via
   * these two props so the right header shows `aria-sort`. */
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  /** Called with a sortable column's `key` when its header is activated
   * (click or Enter/Space, since it renders as a real `<button>`). Deciding
   * the next direction (e.g. toggling asc/desc, or clearing on a third
   * click) is left to the caller. */
  onSortChange?(column: string): void;
  caption?: ReactNode;
  emptyMessage?: ReactNode;
  className?: string;
}

/**
 * A semantic, server-safe `<table>` -- no client-side dependency, matching
 * `components.tsx`'s other stateless primitives. Sorting is fully
 * controlled: `Table` never re-orders `rows` itself, it only reflects
 * `sortColumn`/`sortDirection` as `aria-sort` on the matching header and
 * reports activation via `onSortChange`, so screen-reader users get the
 * same "sorted ascending/descending" announcement sighted users get from
 * the arrow glyph, and keyboard users can operate it without a mouse (a
 * sortable header is a real `<button>`, not a `<div onClick>`).
 */
export function Table<Row>({ columns, rows, getRowId, sortColumn, sortDirection, onSortChange, caption, emptyMessage = "No rows to show.", className }: TableProps<Row>) {
  return (
    <table className={classes("maataa-ui", "maataa-ui__table", className)}>
      {caption ? <caption>{caption}</caption> : null}
      <thead>
        <tr>
          {columns.map(column => {
            const isActive = column.sortable && sortColumn === column.key;
            const ariaSort = column.sortable ? (isActive ? (sortDirection === "desc" ? "descending" : "ascending") : "none") : undefined;
            return (
              <th key={column.key} scope="col" aria-sort={ariaSort} className={classes("maataa-ui__table-header", column.align === "end" && "maataa-ui__table-cell--end")}>
                {column.sortable ? (
                  <button type="button" className="maataa-ui__table-sort" onClick={() => onSortChange?.(column.key)}>
                    <span>{column.header}</span>
                    {/* aria-hidden: the sort state is already announced via aria-sort above -- this glyph is a sighted-user affordance only. */}
                    <span aria-hidden="true" className="maataa-ui__table-sort-icon">{isActive ? (sortDirection === "desc" ? "▼" : "▲") : "⇅"}</span>
                  </button>
                ) : column.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="maataa-ui__table-empty">{emptyMessage}</td>
          </tr>
        ) : rows.map((row, index) => (
          <tr key={getRowId ? getRowId(row, index) : index}>
            {columns.map(column => (
              <td key={column.key} className={classes(column.align === "end" && "maataa-ui__table-cell--end")}>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
