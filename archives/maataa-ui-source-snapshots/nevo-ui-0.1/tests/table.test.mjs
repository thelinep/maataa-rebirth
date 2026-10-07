import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { render, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ui from "../dist/index.js";

const COLUMNS = [
  { key: "name", header: "Name", sortable: true, render: row => row.name },
  { key: "role", header: "Role", render: row => row.role },
];

const ROWS = [
  { id: "1", name: "Ada", role: "Engineer" },
  { id: "2", name: "Grace", role: "Engineer" },
];

test("Table: renders a caption, header row and one row per data row", () => {
  const { getByRole, getAllByRole, unmount } = render(
    React.createElement(ui.Table, { columns: COLUMNS, rows: ROWS, getRowId: row => row.id, caption: "Team" }),
  );
  const table = getByRole("table", { name: "Team" });
  assert.ok(table, "table should be reachable by its caption as an accessible name");
  const rows = within(table).getAllByRole("row");
  assert.equal(rows.length, 3, "1 header row + 2 data rows");
  const cells = getAllByRole("cell");
  assert.equal(cells.length, 4, "2 columns x 2 rows");
  unmount();
  cleanup();
});

test("Table: an unsortable column renders plain text, not a button, and carries no aria-sort", () => {
  const { getByRole, unmount } = render(React.createElement(ui.Table, { columns: COLUMNS, rows: ROWS }));
  const roleHeader = getByRole("columnheader", { name: "Role" });
  assert.equal(roleHeader.getAttribute("aria-sort"), null, "a non-sortable column must not claim a sort state");
  assert.equal(within(roleHeader).queryByRole("button"), null, "a non-sortable header has no interactive control");
  unmount();
  cleanup();
});

test("Table: a sortable header is a real button, reports aria-sort=none while unsorted, and calls onSortChange with its column key", async () => {
  let clicked;
  const { getByRole, unmount } = render(
    React.createElement(ui.Table, { columns: COLUMNS, rows: ROWS, onSortChange: column => { clicked = column; } }),
  );
  const nameHeader = getByRole("columnheader", { name: /Name/ });
  assert.equal(nameHeader.getAttribute("aria-sort"), "none", "sortable but not the active column -> aria-sort=none, not absent");
  const sortButton = within(nameHeader).getByRole("button");
  await userEvent.click(sortButton);
  assert.equal(clicked, "name", "clicking the sort control reports the column's key, not the row data");
  unmount();
  cleanup();
});

test("Table: reflects the caller's sortColumn/sortDirection as aria-sort -- it never sorts rows itself", () => {
  const { getByRole, unmount } = render(
    React.createElement(ui.Table, { columns: COLUMNS, rows: ROWS, sortColumn: "name", sortDirection: "desc" }),
  );
  const nameHeader = getByRole("columnheader", { name: /Name/ });
  assert.equal(nameHeader.getAttribute("aria-sort"), "descending");
  const cells = getByRole("table").querySelectorAll("tbody tr:first-child td");
  assert.equal(cells[0].textContent, "Ada", "Table renders `rows` in the order given -- sorting is the caller's job");
  unmount();
  cleanup();
});

test("Table: an empty row set renders the emptyMessage in a single full-width cell, not zero rows", () => {
  const { getByRole, getByText, unmount } = render(
    React.createElement(ui.Table, { columns: COLUMNS, rows: [], emptyMessage: "Nothing yet" }),
  );
  const cell = getByText("Nothing yet");
  assert.equal(cell.closest("td")?.getAttribute("colspan"), String(COLUMNS.length));
  const rows = within(getByRole("table")).getAllByRole("row");
  assert.equal(rows.length, 2, "header row + one empty-state row");
  unmount();
  cleanup();
});
