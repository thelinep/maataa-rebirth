import { DEMO_VENDORS } from "../../static-data/demoCommerce";
import { createDemoCollectionSlice } from "./createDemoCollectionSlice";

const slice = createDemoCollectionSlice("vendor", DEMO_VENDORS);
export const vendorActions = slice.actions;
export const vendorReducer = slice.reducer;
