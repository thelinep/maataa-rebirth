import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DemoCollectionState } from "../../types/redux";

export function createDemoCollectionSlice<T extends { id: string }>(name: string, records: readonly T[]) {
  const knownIds = new Set(records.map((record) => record.id));
  return createSlice({
    name,
    initialState: (): DemoCollectionState => ({ query: "", facet: null, selectedId: null, selectedIds: [], view: "table" }),
    reducers: {
      selectRecord: (state, action: PayloadAction<string | null>) => {
        if (action.payload === null || knownIds.has(action.payload)) state.selectedId = action.payload;
      },
      setQuery: (state, action: PayloadAction<string>) => {
        state.query = action.payload;
      },
      setFacet: (state, action: PayloadAction<string | null>) => {
        state.facet = action.payload;
      },
      toggleRecordSelection: (state, action: PayloadAction<string>) => {
        if (!knownIds.has(action.payload)) return;
        const index = state.selectedIds.indexOf(action.payload);
        if (index >= 0) state.selectedIds.splice(index, 1);
        else state.selectedIds.push(action.payload);
      },
      clearRecordSelection: (state) => {
        state.selectedIds = [];
      },
      setView: (state, action: PayloadAction<DemoCollectionState["view"]>) => {
        state.view = action.payload;
      },
    },
  });
}
