import { DEMO_EVENTS } from "../../static-data/demoEvents";
import { createDemoCollectionSlice } from "./createDemoCollectionSlice";

const slice = createDemoCollectionSlice("event", DEMO_EVENTS);
export const eventActions = slice.actions;
export const eventReducer = slice.reducer;
