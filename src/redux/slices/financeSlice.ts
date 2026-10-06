import { DEMO_TRANSACTIONS } from "../../static-data/demoFinance";
import { createDemoCollectionSlice } from "./createDemoCollectionSlice";

const slice = createDemoCollectionSlice("finance", DEMO_TRANSACTIONS);
export const financeActions = slice.actions;
export const financeReducer = slice.reducer;
