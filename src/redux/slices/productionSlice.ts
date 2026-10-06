import { DEMO_PRODUCTION } from "../../static-data/demoProduction";
import { createDemoCollectionSlice } from "./createDemoCollectionSlice";

const records = [...DEMO_PRODUCTION.productions, ...DEMO_PRODUCTION.scenes, ...DEMO_PRODUCTION.crew];
const slice = createDemoCollectionSlice("production", records);
export const productionActions = slice.actions;
export const productionReducer = slice.reducer;
