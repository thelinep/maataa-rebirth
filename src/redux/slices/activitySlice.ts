import { DEMO_ACTIVITY } from "../../static-data/demoNotifications";
import { createDemoCollectionSlice } from "./createDemoCollectionSlice";

const slice = createDemoCollectionSlice("activity", DEMO_ACTIVITY);
export const activityActions = slice.actions;
export const activityReducer = slice.reducer;
